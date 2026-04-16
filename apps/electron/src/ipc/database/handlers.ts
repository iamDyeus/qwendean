import { ipcMain } from 'electron';
import {
  createProject,
  getAllProjects,
  getProject,
  updateProjectConversation,
  deleteProject,
  type Project,
} from '../../database/db';

export function registerDatabaseHandlers() {
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

  ipcMain.handle('db:delete-project', async (_event, id: string): Promise<void> => {
    return deleteProject(id);
  });
}
