import Database from 'better-sqlite3';
import { app } from 'electron';
import path from 'path';
import fs from 'fs';
import { TOOLKIT_BUILDS_DIR, TOOLKIT_APP_BUILDS_DIR } from '../constants';

export interface Project {
  id: string;
  name: string;
  conversation: string; // JSON stringified conversation
  created_at: string;
  updated_at: string;
}

let db: Database.Database | null = null;

export function initDatabase() {
  const userDataPath = app.getPath('userData');
  const dbPath = path.join(userDataPath, 'qwendean.db');
  
  db = new Database(dbPath);
  
  // Create projects table
  db.exec(`
    CREATE TABLE IF NOT EXISTS projects (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      conversation TEXT DEFAULT '[]',
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    )
  `);
  
  return db;
}

export function getDatabase() {
  if (!db) {
    throw new Error('Database not initialized. Call initDatabase() first.');
  }
  return db;
}

export function createProject(name: string): Project {
  const db = getDatabase();
  const id = Date.now().toString();
  const now = new Date().toISOString();
  
  const stmt = db.prepare(`
    INSERT INTO projects (id, name, conversation, created_at, updated_at)
    VALUES (?, ?, ?, ?, ?)
  `);
  
  stmt.run(id, name, '[]', now, now);
  
  return {
    id,
    name,
    conversation: '[]',
    created_at: now,
    updated_at: now,
  };
}

export function getAllProjects(): Project[] {
  const db = getDatabase();
  const stmt = db.prepare('SELECT * FROM projects ORDER BY updated_at DESC');
  return stmt.all() as Project[];
}

export function getProject(id: string): Project | undefined {
  const db = getDatabase();
  const stmt = db.prepare('SELECT * FROM projects WHERE id = ?');
  return stmt.get(id) as Project | undefined;
}

export function updateProjectConversation(id: string, conversation: string): void {
  const db = getDatabase();
  const now = new Date().toISOString();
  
  const stmt = db.prepare(`
    UPDATE projects 
    SET conversation = ?, updated_at = ?
    WHERE id = ?
  `);
  
  stmt.run(conversation, now, id);
}

export function resetProject(id: string): void {
  const db = getDatabase();
  const now = new Date().toISOString();
  const stmt = db.prepare(`UPDATE projects SET conversation = '[]', updated_at = ? WHERE id = ?`);
  stmt.run(now, id);

  for (const dir of [TOOLKIT_BUILDS_DIR, TOOLKIT_APP_BUILDS_DIR]) {
    const buildPath = path.join(dir, id);
    if (fs.existsSync(buildPath)) fs.rmSync(buildPath, { recursive: true, force: true });
  }
}

export function deleteProject(id: string): void {
  const db = getDatabase();
  const stmt = db.prepare('DELETE FROM projects WHERE id = ?');
  stmt.run(id);

  for (const dir of [TOOLKIT_BUILDS_DIR, TOOLKIT_APP_BUILDS_DIR]) {
    const buildPath = path.join(dir, id);
    if (fs.existsSync(buildPath)) fs.rmSync(buildPath, { recursive: true, force: true });
  }
}

export function renameProject(id: string, name: string): void {
  const db = getDatabase();
  const now = new Date().toISOString();
  const stmt = db.prepare('UPDATE projects SET name = ?, updated_at = ? WHERE id = ?');
  stmt.run(name, now, id);
}

export function closeDatabase() {
  if (db) {
    db.close();
    db = null;
  }
}
