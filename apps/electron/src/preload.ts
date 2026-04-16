import { ipcRenderer, contextBridge } from "electron";
import { IPC_CHANNELS } from "./constants";

window.addEventListener("message", (event) => {
  if (event.data === IPC_CHANNELS.START_ORPC_SERVER) {
    const [serverPort] = event.ports;

    ipcRenderer.postMessage(IPC_CHANNELS.START_ORPC_SERVER, null, [serverPort]);
  }
});

// Expose database API to renderer
contextBridge.exposeInMainWorld('database', {
  createProject: (name: string) => ipcRenderer.invoke('db:create-project', name),
  getAllProjects: () => ipcRenderer.invoke('db:get-all-projects'),
  getProject: (id: string) => ipcRenderer.invoke('db:get-project', id),
  updateConversation: (id: string, conversation: string) => 
    ipcRenderer.invoke('db:update-conversation', id, conversation),
  deleteProject: (id: string) => ipcRenderer.invoke('db:delete-project', id),
});

// Expose preview window API to renderer
contextBridge.exposeInMainWorld('electron', {
  createPreviewWindow: (projectId: string) => ipcRenderer.invoke('preview:create-window', projectId),
  closePreviewWindow: () => ipcRenderer.invoke('preview:close-window'),
  reloadPreview: () => ipcRenderer.invoke('preview:reload'),
});
