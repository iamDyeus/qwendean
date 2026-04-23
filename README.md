# Qwendean

AI-powered landing page generator. Describe your idea in plain English, get production-ready React/Next.js code.

## Features

- **Conversational UI** — chat-based workflow guides you through requirements gathering
- **Editable plans** — review and modify the section breakdown before generation
- **Live preview** — see your landing page render in real-time
- **Per-section regeneration** — fix individual sections without rebuilding everything
- **Error recovery** — replace broken components with fallbacks and iterate

## Tech Stack

- **Electron** — desktop app with custom frameless UI
- **FastAPI + LangGraph** — agentic workflow for requirements → plan → code
- **Next.js** — dynamic compilation of generated components
- **Ollama** — local LLM inference (Qwen 3 4B for code, Gemma 4 E2B for planning)

## Prerequisites

- **Node.js 20+** and **npm**
- **Python 3.11+** and **uv**
- **Ollama** with models:
  - `hf.co/iamdyeus/qwendean-4b-GGUF:latest` (code generation)
  - `gemma4:e2b` (planning)

## Development

Run all three servers in separate terminals:

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

## Building for Distribution

```bash
# 1. Build agents binary
cd apps/agents
# Don't forget to activate your virtual environment if you have one
uv run pyinstaller agents.spec --distpath dist --workpath build/pyinstaller --clean

# 2. Install toolkit deps
cd ../toolkit
npm install

# 3. Package electron app
cd ../electron
npm run make
```

Output: `apps/electron/out/make/squirrel.windows/x64/` (Windows) or platform-specific installer.

## GitHub Actions

Push a release tag to trigger automated builds for Windows, macOS, and Linux:

```bash
git tag v0.1.0
git push origin v0.1.0
```