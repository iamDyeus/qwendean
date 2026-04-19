import path from "node:path";
import { app, BrowserWindow, session } from "electron";
import { ipcMain } from "electron/main";
import { UpdateSourceType, updateElectronApp } from "update-electron-app";
import { ipcContext } from "@/ipc/context";
import { IPC_CHANNELS, inDevelopment } from "./constants";
import { getBasePath } from "./utils/path";
import { initDatabase, closeDatabase } from "./database/db";
import { registerDatabaseHandlers } from "./ipc/database/handlers";
import { registerPreviewHandlers } from "./ipc/preview/handlers";

function createWindow() {
  const basePath = getBasePath();
  const preload = path.join(basePath, "preload.js");
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    icon: path.join(__dirname, "../../images/qwendean.png"),
    webPreferences: {
      devTools: inDevelopment,
      contextIsolation: true,
      nodeIntegration: false,
      nodeIntegrationInSubFrames: false,
      webviewTag: true,
      preload,
    },
    titleBarStyle: process.platform === "darwin" ? "hiddenInset" : "hidden",
    trafficLightPosition:
      process.platform === "darwin" ? { x: 5, y: 5 } : undefined,
  });
  ipcContext.setMainWindow(mainWindow);

  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
  } else {
    mainWindow.loadFile(
      path.join(basePath, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`)
    );
  }
}

async function installExtensions() {
  if (!inDevelopment) return;
  try {
    // React DevTools extension ID
    const reactDevToolsId = "fmkadmapgofadopljbjfkapdkoienihi";
    const extPath = path.join(app.getPath("userData"), "extensions", reactDevToolsId);
    const existing = session.defaultSession.extensions.getAllExtensions();
    if (!existing.find((e) => e.id === reactDevToolsId)) {
      await session.defaultSession.extensions.loadExtension(extPath, { allowFileAccess: true });
    }
  } catch {
    // Extension not pre-downloaded — silently skip in dev
  }
}

function checkForUpdates() {
  updateElectronApp({
    updateSource: {
      type: UpdateSourceType.ElectronPublicUpdateService,
      repo: "iamdyeus/qwendean",
    },
  });
}

async function setupORPC() {
  const { rpcHandler } = await import("./ipc/handler");

  ipcMain.on(IPC_CHANNELS.START_ORPC_SERVER, (event) => {
    const [serverPort] = event.ports;

    serverPort.start();
    rpcHandler.upgrade(serverPort);
  });
}

app.whenReady().then(async () => {
  try {
    // Initialize database
    initDatabase();
    registerDatabaseHandlers();
    registerPreviewHandlers();
    
    createWindow();
    await installExtensions();
    checkForUpdates();
    await setupORPC();
  } catch (error) {
    console.error("Error during app initialization:", error);
  }
});

//osX only
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    closeDatabase();
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

app.on("before-quit", () => {
  closeDatabase();
});
//osX only ends
