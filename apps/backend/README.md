# Qwendean Backend

FastAPI backend with LangGraph landing page generator.

## Setup

```bash
# Install dependencies
pip install -e .

# Copy environment file
cp .env.example .env
# Edit .env with your API keys
```

## Run

```bash
# Development mode (auto-reload)
uvicorn main:app --reload --port 8000

# Production mode
uvicorn main:app --host 0.0.0.0 --port 8000
```

## API Endpoints

### POST /api/start
Start a new landing page generation session.

**Request:**
```json
{
  "user_request": "I want a landing page for my AI fitness app",
  "session_id": "unique-session-id"
}
```

**Response:**
```json
{
  "session_id": "unique-session-id",
  "messages": [{"role": "assistant", "content": "..."}],
  "waiting_for_input": true,
  "interrupt_prompt": "What is your target audience?",
  "section_plan": null,
  "preview_components": [],
  "final_page_path": null,
  "error": null
}
```

### POST /api/resume
Resume session with user input.

**Request:**
```json
{
  "session_id": "unique-session-id",
  "user_input": "Fitness enthusiasts aged 25-40"
}
```

**Response:** Same as /api/start

### GET /api/health
Health check endpoint.

## Environment Variables

```env
HUGGINGFACE_API_KEY=your_key_here
GENERATOR_PROVIDER=ollama
OLLAMA_BASE_URL=http://localhost:11434
OLLAMA_MODEL=qwendean
```

## Architecture

- **FastAPI** - REST API framework
- **LangGraph** - Workflow orchestration
- **LangChain** - LLM integration
- **Ollama/HuggingFace** - Code generation
