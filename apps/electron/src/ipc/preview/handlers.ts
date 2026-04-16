import { ipcMain, BrowserWindow } from 'electron';

let previewWindow: BrowserWindow | null = null;

export function registerPreviewHandlers() {
  ipcMain.handle('preview:create-window', async (_event, projectId: string) => {
    // Close existing preview window if any
    if (previewWindow && !previewWindow.isDestroyed()) {
      previewWindow.close();
    }

    // Create new preview window
    previewWindow = new BrowserWindow({
      width: 1200,
      height: 800,
      title: `Preview - ${projectId}`,
      webPreferences: {
        nodeIntegration: false,
        contextIsolation: true,
      },
    });

    // Load the toolkit dev server with the specific project
    const toolkitUrl = `http://localhost:3000/builds/${projectId}`;
    
    try {
      await previewWindow.loadURL(toolkitUrl);
    } catch (error) {
      console.error('Failed to load preview:', error);
      // Show error page
      previewWindow.loadURL(`data:text/html,
        <html>
          <body style="display:flex;align-items:center;justify-content:center;height:100vh;font-family:sans-serif;background:#1a1a1a;color:#fff;">
            <div style="text-align:center;">
              <h1>Preview Not Available</h1>
              <p>Make sure the toolkit dev server is running on port 3000</p>
              <p style="color:#888;font-size:14px;">Project: ${projectId}</p>
              <p style="color:#888;font-size:14px;">URL: ${toolkitUrl}</p>
            </div>
          </body>
        </html>
      `);
    }

    previewWindow.on('closed', () => {
      previewWindow = null;
    });

    return { success: true };
  });

  ipcMain.handle('preview:close-window', async () => {
    if (previewWindow && !previewWindow.isDestroyed()) {
      previewWindow.close();
      previewWindow = null;
    }
    return { success: true };
  });

  ipcMain.handle('preview:reload', async () => {
    if (previewWindow && !previewWindow.isDestroyed()) {
      previewWindow.reload();
    }
    return { success: true };
  });
}
