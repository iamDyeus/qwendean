interface Window {
  database: {
    createProject: (name: string) => Promise<any>;
    getAllProjects: () => Promise<any[]>;
    getProject: (id: string) => Promise<any>;
    updateConversation: (id: string, conversation: string) => Promise<void>;
    deleteProject: (id: string) => Promise<void>;
  };
  electron: {
    createPreviewWindow: (projectId: string) => Promise<any>;
    closePreviewWindow: () => Promise<any>;
    reloadPreview: () => Promise<any>;
  };
}
