# Apps

This folder contains the main runtime apps for Qwendean. Use the instructions below to run the full dev stack or build for distribution.

## Apps

- agents: FastAPI + LangGraph backend (requirements -> plan -> code)
- toolkit: Next.js UI for previewing and editing generated pages
- electron: Desktop shell around the toolkit and agents

## Development (3 terminals)

```bash
# Terminal 1: FastAPI agents
cd apps/agents
uv sync
uv run uvicorn main:app --reload --port 8000

# Terminal 2: Next.js toolkit
cd apps/toolkit
npm install
npm run dev

# Terminal 3: Electron app
cd apps/electron
npm install
npm start
```

## Build

```bash
# 1. Build agents binary
cd apps/agents
uv run pyinstaller agents.spec --distpath dist --workpath build/pyinstaller --clean

# 2. Install toolkit deps
cd ../toolkit
npm install

# 3. Package electron app
cd ../electron
npm run make
```

Build output (Windows): apps/electron/out/make/squirrel.windows/x64/

## Per-app docs

- agents: apps/agents/README.md
- toolkit: apps/toolkit/README.md
- electron: apps/electron/README.md
