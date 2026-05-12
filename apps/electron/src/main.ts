import path from "node:path";
import { app, BrowserWindow, dialog, session } from "electron";
import { ipcMain } from "electron/main";
import { spawn, type ChildProcess } from "node:child_process";
import { UpdateSourceType, updateElectronApp } from "update-electron-app";
import squirrelStartup from "electron-squirrel-startup";
import log from "electron-log/main";
import { ipcContext } from "@/ipc/context";
import { IPC_CHANNELS, inDevelopment } from "./constants";
import { getBasePath } from "./utils/path";
import {
  initDatabase,
  closeDatabase,
  getOllamaSettings,
  saveOllamaSettings,
  type OllamaSettings,
} from "./database/db";
import { registerDatabaseHandlers } from "./ipc/database/handlers";
import { registerPreviewHandlers } from "./ipc/preview/handlers";

log.initialize();
log.transports.file.level = "debug";
Object.assign(console, log.functions);

if (squirrelStartup) {
  app.quit();
  process.exit(0);
}

const gotLock = app.requestSingleInstanceLock();
if (!gotLock) {
  app.quit();
  process.exit(0);
}

let agentsProcess: ChildProcess | null = null;
let toolkitProcess: ChildProcess | null = null;

function startServers() {
  if (inDevelopment) return; // run manually in dev

  const resourcesPath = process.resourcesPath;
  const ollamaSettings = getOllamaSettings();

  // Start FastAPI agents (PyInstaller binary)
  const agentsBin = path.join(
    resourcesPath,
    process.platform === "win32" ? "agents.exe" : "agents",
  );
  agentsProcess = spawn(agentsBin, [], {
    env: {
      ...process.env,
      OUTPUT_DIR: path.join(app.getPath("userData"), "builds"),
      PLANNER_PROVIDER: "ollama",
      GENERATOR_PROVIDER: "ollama",
      OLLAMA_BASE_URL: ollamaSettings.baseUrl,
      OLLAMA_PLANNER_MODEL: ollamaSettings.plannerModel,
      OLLAMA_MODEL: ollamaSettings.generatorModel,
    },
  });
  agentsProcess.stderr?.on("data", (d) =>
    console.error("[agents]", d.toString()),
  );

  // Start Next.js toolkit dev server
  const toolkitPath = path.join(resourcesPath, "toolkit");
  const nextScript = path.join(
    toolkitPath,
    "node_modules",
    "next",
    "dist",
    "bin",
    "next",
  );
  const nodeBin = path.join(resourcesPath, "node.exe");
  // Clear .next/cache so webpack doesn't serve stale broken modules
  const { rmSync, existsSync } = require("node:fs");
  const nextCache = path.join(toolkitPath, ".next", "cache");
  if (existsSync(nextCache))
    rmSync(nextCache, { recursive: true, force: true });

  toolkitProcess = spawn(
    nodeBin,
    [nextScript, "dev", "--webpack", "-p", "3000"],
    {
      cwd: toolkitPath,
      env: {
        ...process.env,
        BUILDS_DIR: path.join(app.getPath("userData"), "builds"),
        APP_BUILDS_DIR: path.join(toolkitPath, "app", "builds", "[buildId]"),
      },
    },
  );
  toolkitProcess.stderr?.on("data", (d) =>
    console.error("[toolkit]", d.toString()),
  );
}

async function waitForServer(url: string, timeoutMs = 30000): Promise<void> {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    try {
      const res = await fetch(url);
      if (res.ok || res.status < 500) return;
    } catch {
      /* not ready yet */
    }
    await new Promise((r) => setTimeout(r, 500));
  }
  throw new Error(`Server at ${url} did not start within ${timeoutMs}ms`);
}

async function killServers(): Promise<void> {
  const killPort = require("kill-port");
  const kills: Promise<void>[] = [];

  const killProcess = (proc: ChildProcess): Promise<void> => {
    return new Promise((resolve) => {
      if (proc.exitCode !== null) {
        resolve();
        return;
      }
      proc.once("exit", () => resolve());
      if (process.platform === "win32") {
        spawn("taskkill", ["/pid", String(proc.pid), "/f", "/t"]);
      } else {
        proc.kill();
      }
      setTimeout(resolve, 5000);
    });
  };

  if (agentsProcess) {
    kills.push(killProcess(agentsProcess));
    agentsProcess = null;
  }
  if (toolkitProcess) {
    kills.push(killProcess(toolkitProcess));
    toolkitProcess = null;
  }

  // Also kill by port — handles dev mode where processes weren't spawned by us
  kills.push(killPort(3000, "tcp").catch(() => {}));
  kills.push(killPort(8000, "tcp").catch(() => {}));

  await Promise.all(kills);
}

function createWindow() {
  const basePath = getBasePath();
  const preload = path.join(basePath, "preload.js");
  const icon = inDevelopment
    ? path.join(__dirname, "../../images/qwendean.ico")
    : path.join(process.resourcesPath, "qwendean.ico");
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    title: "Qwendean",
    icon,
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
      path.join(basePath, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`),
    );
  }
}

async function installExtensions() {
  if (!inDevelopment) return;
  try {
    // React DevTools extension ID
    const reactDevToolsId = "fmkadmapgofadopljbjfkapdkoienihi";
    const extPath = path.join(
      app.getPath("userData"),
      "extensions",
      reactDevToolsId,
    );
    const existing = session.defaultSession.extensions.getAllExtensions();
    if (!existing.find((e) => e.id === reactDevToolsId)) {
      await session.defaultSession.extensions.loadExtension(extPath, {
        allowFileAccess: true,
      });
    }
  } catch {
    // Extension not pre-downloaded — silently skip in dev
  }
}

function checkForUpdates() {
  if (inDevelopment) return;
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
    initDatabase();
    registerDatabaseHandlers();
    registerPreviewHandlers();

    startServers();

    if (!inDevelopment) {
      await waitForServer("http://localhost:8000/api/health");
    }

    createWindow();
    await installExtensions();
    checkForUpdates();
    await setupORPC();
  } catch (error) {
    console.error("Error during app initialization:", error);
    dialog.showErrorBox(
      "Startup failed",
      `Failed to start required services:\n${error instanceof Error ? error.message : String(error)}`,
    );
    app.quit();
  }
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
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
  killServers(); // fire-and-forget on quit is fine
});

ipcMain.handle("settings:clear-next-cache", async () => {
  const { rmSync, existsSync } = require("node:fs");
  const toolkitPath = inDevelopment
    ? path.resolve(__dirname, "..", "..", "..", "toolkit")
    : path.join(process.resourcesPath, "toolkit");
  const nextDir = path.join(toolkitPath, ".next");
  if (existsSync(nextDir)) rmSync(nextDir, { recursive: true, force: true });
  return { success: true };
});

ipcMain.handle("settings:ping-servers", async () => {
  const results = { agents: false, toolkit: false };
  try {
    const r = await fetch("http://localhost:8000/api/health");
    results.agents = r.ok;
  } catch {}
  try {
    await fetch("http://localhost:3000");
    results.toolkit = true;
  } catch {}
  return results;
});

ipcMain.handle("settings:stop-servers", async () => {
  await killServers();
  return { success: true };
});

ipcMain.handle("settings:restart-servers", async () => {
  await killServers();
  startServers();
  return { success: true };
});

ipcMain.handle("settings:clear-user-data", async () => {
  closeDatabase();
  const { rmSync, existsSync, readdirSync } = require("node:fs");
  const dbPath = path.join(app.getPath("userData"), "qwendean.db");
  if (existsSync(dbPath)) rmSync(dbPath, { force: true });

  // Clear build outputs — location differs between dev and prod
  const buildsPaths = inDevelopment
    ? [path.resolve(__dirname, "..", "..", "..", "toolkit", "builds")]
    : [path.join(app.getPath("userData"), "builds")];
  for (const p of buildsPaths) {
    if (existsSync(p))
      rmSync(p, {
        recursive: true,
        force: true,
        maxRetries: 5,
        retryDelay: 500,
      });
  }

  // Clear toolkit copied build dirs
  const toolkitBuildsDir = inDevelopment
    ? path.resolve(
        __dirname,
        "..",
        "..",
        "..",
        "toolkit",
        "app",
        "builds",
        "[buildId]",
      )
    : path.join(process.resourcesPath, "toolkit", "app", "builds", "[buildId]");
  if (existsSync(toolkitBuildsDir)) {
    for (const entry of readdirSync(toolkitBuildsDir)) {
      if (/^\d+$/.test(entry))
        rmSync(path.join(toolkitBuildsDir, entry), {
          recursive: true,
          force: true,
          maxRetries: 5,
          retryDelay: 500,
        });
    }
  }

  initDatabase();
  return { success: true };
});

ipcMain.handle("settings:get-ollama-settings", async () => {
  return getOllamaSettings();
});

ipcMain.handle(
  "settings:save-ollama-settings",
  async (_event, settings: OllamaSettings) => {
    return saveOllamaSettings(settings);
  },
);

ipcMain.handle(
  "settings:list-ollama-models",
  async (_event, baseUrl?: string) => {
    try {
      const { baseUrl: storedUrl } = getOllamaSettings();
      const resolvedUrl = (baseUrl ?? storedUrl).trim();
      if (!resolvedUrl) return { models: [], error: "Ollama URL not set" };
      const res = await fetch(`${resolvedUrl}/api/tags`);
      if (!res.ok) return { models: [], error: "Ollama not running" };
      const data = (await res.json()) as { models: { name: string }[] };
      return { models: data.models.map((m) => m.name) };
    } catch {
      return { models: [], error: "Ollama not running" };
    }
  },
);
