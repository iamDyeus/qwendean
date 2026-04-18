export interface Project {
  id: string;
  name: string;
  conversation: string;
  created_at: string;
  updated_at: string;
}

export interface DatabaseAPI {
  createProject: (name: string) => Promise<Project>;
  getAllProjects: () => Promise<Project[]>;
  getProject: (id: string) => Promise<Project | undefined>;
  updateConversation: (id: string, conversation: string) => Promise<void>;
  deleteProject: (id: string) => Promise<void>;
  resetProject: (id: string) => Promise<void>;
}

export interface ElectronAPI {
  createPreviewWindow: (projectId: string) => Promise<{ success: boolean }>;
  closePreviewWindow: () => Promise<{ success: boolean }>;
  reloadPreview: () => Promise<{ success: boolean }>;
}

declare global {
  interface Window {
    database: DatabaseAPI;
    electron?: ElectronAPI;
  }
}

export {};
