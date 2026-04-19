import { ipcMain } from 'electron';
import {
  createProject,
  getAllProjects,
  getProject,
  updateProjectConversation,
  updateProjectSectionPlan,
  deleteProject,
  resetProject,
  renameProject,
  type Project,
} from '../../database/db';

const DB_CHANNELS = [
  'db:create-project',
  'db:get-all-projects',
  'db:get-project',
  'db:update-conversation',
  'db:update-section-plan',
  'db:delete-project',
  'db:reset-project',
  'db:rename-project',
] as const;

export function registerDatabaseHandlers() {
  // Remove existing handlers to prevent duplicate registration errors on HMR
  for (const channel of DB_CHANNELS) {
    ipcMain.removeHandler(channel);
  }

  ipcMain.handle('db:create-project', async (_event, name: string): Promise<Project> => {
    return createProject(name);
  });

  ipcMain.handle('db:get-all-projects', async (): Promise<Project[]> => {
    return getAllProjects();
  });

  ipcMain.handle('db:get-project', async (_event, id: string): Promise<Project | undefined> => {
    return getProject(id);
  });

  ipcMain.handle('db:update-conversation', async (_event, id: string, conversation: string): Promise<void> => {
    return updateProjectConversation(id, conversation);
  });

  ipcMain.handle('db:update-section-plan', async (_event, id: string, sectionPlan: string): Promise<void> => {
    return updateProjectSectionPlan(id, sectionPlan);
  });

  ipcMain.handle('db:delete-project', async (_event, id: string): Promise<void> => {
    return deleteProject(id);
  });

  ipcMain.handle('db:reset-project', async (_event, id: string): Promise<void> => {
    return resetProject(id);
  });

  ipcMain.handle('db:rename-project', async (_event, id: string, name: string): Promise<void> => {
    return renameProject(id, name);
  });
}
