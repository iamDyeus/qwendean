# Bundling Plan

## Overview
Bundle FastAPI server and Next.js toolkit dev server with Electron application for distribution.

## Architecture

### Development
- Terminal 1: `python apps/agents/main.py` (FastAPI on :8000)
- Terminal 2: `npm run dev` in toolkit (Next.js on :3000)
- Terminal 3: `npm start` (Electron app)

### Production
- Electron spawns both FastAPI and Next.js as child processes
- FastAPI: Bundled as executable via PyInstaller
- Next.js: Bundled with full dev server for dynamic compilation
- Electron window loads `http://localhost:3000`

---

## FastAPI Bundling

### Location
`/mnt/d/projects/qwendean/apps/agents`

### Build Process
```bash
cd apps/agents
pip install pyinstaller fastapi uvicorn
pyinstaller --onefile main.py
```

### Electron Integration
```javascript
const isDev = process.env.NODE_ENV === 'development';
let serverProcess;

function startFastAPIServer() {
  if (isDev) {
    console.log('Dev: Run FastAPI manually');
    return;
  }
  
  const serverPath = path.join(
    process.resourcesPath,
    'agents',
    process.platform === 'win32' ? 'main.exe' : 'main'
  );
  
  serverProcess = spawn(serverPath);
  serverProcess.on('error', (err) => console.error('FastAPI error:', err));
}

app.on('ready', () => {
  startFastAPIServer();
  // ... rest of startup
});

app.on('quit', () => {
  if (serverProcess) serverProcess.kill();
});
```

### electron-builder Config
```json
{
  "build": {
    "extraResources": [
      {
        "from": "apps/agents/dist/main",
        "to": "agents/main"
      }
    ]
  }
}
```

---

## Next.js Toolkit Bundling

### Purpose
Dynamic compilation of AI-generated React/Next.js components at runtime.

### Why Dev Server?
- AI generates `.tsx` files (hero.tsx, about.tsx, etc.)
- Files written to disk by Electron
- Next.js dev server compiles and hot-reloads automatically
- Production build can't compile new files at runtime

### Electron Integration
```javascript
const isDev = process.env.NODE_ENV === 'development';
let nextProcess;

function startNextServer() {
  const toolkitPath = isDev
    ? path.join(__dirname, '../toolkit')
    : path.join(process.resourcesPath, 'toolkit');

  const nextBin = path.join(
    toolkitPath,
    'node_modules',
    '.bin',
    process.platform === 'win32' ? 'next.cmd' : 'next'
  );

  nextProcess = spawn(nextBin, ['dev', '-p', '3000'], {
    cwd: toolkitPath,
    shell: true
  });

  nextProcess.stdout.on('data', (data) => console.log(`Next.js: ${data}`));
}

function createWindow() {
  const win = new BrowserWindow({ width: 1200, height: 800 });
  win.loadURL('http://localhost:3000');
}

app.on('ready', () => {
  startFastAPIServer();
  startNextServer();
  setTimeout(createWindow, 5000); // Wait for servers to start
});

app.on('quit', () => {
  if (nextProcess) nextProcess.kill();
  if (serverProcess) serverProcess.kill();
});
```

### electron-builder Config
```json
{
  "build": {
    "extraResources": [
      {
        "from": "apps/agents/dist/main",
        "to": "agents/main"
      },
      {
        "from": "toolkit",
        "to": "toolkit",
        "filter": ["**/*", "!.next"]
      }
    ]
  }
}
```

### Writing Generated Components
```javascript
// IPC handler in main process
const { ipcMain } = require('electron');
const fs = require('fs');

ipcMain.handle('write-component', async (event, { filename, code }) => {
  const componentsDir = path.join(
    isDev ? './toolkit' : process.resourcesPath + '/toolkit',
    'components/generated'
  );
  
  fs.mkdirSync(componentsDir, { recursive: true });
  fs.writeFileSync(path.join(componentsDir, filename), code);
  
  return { success: true };
});
```

---

## GitHub Actions Workflow

### `.github/workflows/release.yml`
```yaml
name: Build and Release

on:
  push:
    tags:
      - 'v*'

jobs:
  build:
    runs-on: ${{ matrix.os }}
    strategy:
      matrix:
        os: [ubuntu-latest, windows-latest, macos-latest]

    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Python
        uses: actions/setup-python@v4
        with:
          python-version: '3.11'
      
      - name: Setup Node
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      # Build FastAPI
      - name: Build FastAPI executable
        run: |
          cd apps/agents
          pip install pyinstaller fastapi uvicorn
          pyinstaller --onefile main.py
          
      - name: Copy FastAPI to resources
        run: |
          mkdir -p resources/agents
          cp apps/agents/dist/main* resources/agents/
      
      # Prepare Next.js toolkit
      - name: Install toolkit dependencies
        run: |
          cd toolkit
          npm install
      
      - name: Copy toolkit to resources
        run: |
          mkdir -p resources/toolkit
          cp -r toolkit/* resources/toolkit/
      
      # Build Electron
      - name: Install Electron dependencies
        run: npm install
      
      - name: Build Electron app
        run: npm run build
      
      - name: Upload artifacts
        uses: actions/upload-artifact@v3
        with:
          name: ${{ matrix.os }}-build
          path: dist/*
      
      - name: Release
        uses: softprops/action-gh-release@v1
        with:
          files: dist/*
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

---

## Build Commands

### Local Build
```bash
# 1. Build FastAPI
cd apps/agents
pyinstaller --onefile main.py
cd ../..

# 2. Install toolkit deps
cd toolkit
npm install
cd ..

# 3. Build Electron
npm install
npm run build
```

### Trigger Release
```bash
git tag v1.0.0
git push --tags
```

---

## Notes

- **Bundle Size**: ~200-300MB (includes full Next.js dev environment + node_modules)
- **Startup Time**: ~5 seconds (wait for both servers to initialize)
- **Ports**: FastAPI on 8000, Next.js on 3000 (localhost only)
- **Security**: Both servers bind to 127.0.0.1 (not accessible externally)
