"""FastAPI backend for Qwendean landing page generator."""

from contextlib import asynccontextmanager

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from langgraph.types import Command

from graph import build_graph
from state import GraphState


@asynccontextmanager
async def lifespan(app: FastAPI):
    import httpx
    import logging
    from config import load_config
    cfg = load_config()
    try:
        async with httpx.AsyncClient(timeout=3.0) as c:
            await c.get(f"{cfg.ollama_base_url}/api/tags")
            logging.info(f"Ollama reachable at {cfg.ollama_base_url}")
    except Exception as e:
        logging.warning(f"⚠️  Ollama NOT reachable at {cfg.ollama_base_url} — start Ollama before using the API. ({e})")
    yield


app = FastAPI(title="Qwendean API", version="0.1.0", lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

graph, checkpointer = build_graph()


class StartRequest(BaseModel):
    user_request: str
    session_id: str
    project_id: str


class ResumeRequest(BaseModel):
    user_input: str
    session_id: str


class UpdatePlanRequest(BaseModel):
    session_id: str
    section_plan: dict


class ResetRequest(BaseModel):
    session_id: str


class OptionResponse(BaseModel):
    id: str
    label: str


class SessionResponse(BaseModel):
    session_id: str
    messages: list[dict]
    options: list[OptionResponse] = []
    waiting_for_input: bool
    interrupt_prompt: str | None = None
    section_plan: dict | None = None
    preview_components: list[dict] = []
    final_page_path: str | None = None
    error: str | None = None


def _get_state(session_id: str) -> dict:
    """Read the full accumulated state from the graph checkpointer."""
    config = {"configurable": {"thread_id": session_id}}
    snapshot = graph.get_state(config)
    return dict(snapshot.values) if snapshot else {}


def _build_response(session_id: str, interrupt_prompt: str | None) -> SessionResponse:
    state = _get_state(session_id)
    waiting_for_input = interrupt_prompt is not None
    section_plan = state.get("section_plan")
    preview_components = state.get("preview_components", [])

    return SessionResponse(
        session_id=session_id,
        messages=state.get("messages", []),
        options=[OptionResponse(id=opt["id"], label=opt["label"]) for opt in state.get("options", [])],
        waiting_for_input=waiting_for_input,
        interrupt_prompt=interrupt_prompt,
        section_plan=section_plan.model_dump() if section_plan else None,
        preview_components=[c.model_dump() for c in preview_components],
        final_page_path=state.get("final_page_path"),
        error=state.get("error"),
    )


def _stream_until_interrupt(cmd, config: dict) -> str | None:
    """Stream graph events, return interrupt prompt if hit, else None."""
    interrupt_prompt = None
    for event in graph.stream(cmd, config=config, stream_mode="updates"):
        if "__interrupt__" in event:
            interrupts = event["__interrupt__"]
            if interrupts:
                interrupt_prompt = interrupts[0].value if hasattr(interrupts[0], "value") else str(interrupts[0])
            break
    return interrupt_prompt


@app.post("/api/reset")
async def reset_session(request: ResetRequest):
    session_id = request.session_id
    # InMemorySaver stores checkpoints keyed by thread_id — wipe them directly
    checkpointer.storage.pop(session_id, None)
    checkpointer.writes.pop(session_id, None)
    return {"session_id": session_id, "reset": True}


@app.post("/api/start", response_model=SessionResponse)
async def start_session(request: StartRequest):
    session_id = request.session_id
    config = {"configurable": {"thread_id": session_id}}

    initial_state: GraphState = {
        "user_request": request.user_request,
        "project_id": request.project_id,
    }

    interrupt_prompt = _stream_until_interrupt(initial_state, config)
    return _build_response(session_id, interrupt_prompt)


@app.post("/api/resume", response_model=SessionResponse)
async def resume_session(request: ResumeRequest):
    session_id = request.session_id
    config = {"configurable": {"thread_id": session_id}}

    if not graph.get_state(config).values:
        raise HTTPException(status_code=404, detail="Session not found")

    interrupt_prompt = _stream_until_interrupt(Command(resume=request.user_input), config)
    return _build_response(session_id, interrupt_prompt)


@app.post("/api/update-plan", response_model=SessionResponse)
async def update_plan(request: UpdatePlanRequest):
    session_id = request.session_id
    config = {"configurable": {"thread_id": session_id}}

    snapshot = graph.get_state(config)
    if not snapshot.values:
        raise HTTPException(status_code=404, detail="Session not found")

    from state import SectionPlan
    graph.update_state(config, {"section_plan": SectionPlan.model_validate(request.section_plan)})

    return _build_response(session_id, "Plan updated. Click approve to generate code.")


@app.post("/api/approve-plan", response_model=SessionResponse)
async def approve_plan(request: ResumeRequest):
    session_id = request.session_id
    config = {"configurable": {"thread_id": session_id}}

    if not graph.get_state(config).values:
        raise HTTPException(status_code=404, detail="Session not found")

    interrupt_prompt = _stream_until_interrupt(Command(resume="approve"), config)
    return _build_response(session_id, interrupt_prompt)


class RegenerateSectionRequest(BaseModel):
    session_id: str
    project_id: str
    section: dict


@app.post("/api/regenerate-section")
async def regenerate_section(request: RegenerateSectionRequest):
    from state import SectionPlan, SectionPromptMapping, GeneratedComponent
    from nodes.code_generator import _generate_one_hf, _generate_one_ollama
    from nodes.page_assembler import (
        _strip_fences, _extract_component_name, _normalize_exports,
        _strip_trailing_prose, _remove_hallucinated_imports,
        _normalize_react_icons, _fix_next_image,
        _ensure_use_client,
    )
    from config import load_config
    from pathlib import Path
    import asyncio

    section = SectionPromptMapping.model_validate(request.section)
    config = load_config()

    semaphore = asyncio.Semaphore(1)
    if config.generator_provider == "ollama":
        comp = await _generate_one_ollama(
            base_url=config.ollama_base_url,
            model=config.ollama_model,
            section_prompt=section.prompt,
            component_name=section.component_name,
            section_name=section.section_name,
            file_name=section.file_name,
            temperature=config.generator_llm.temperature,
            top_p=config.generator_llm.top_p,
            top_k=config.generator_llm.top_k,
            min_p=config.generator_llm.min_p,
            max_tokens=config.generator_llm.max_tokens,
            semaphore=semaphore,
        )
    else:
        comp = await _generate_one_hf(
            section_prompt=section.prompt,
            component_name=section.component_name,
            section_name=section.section_name,
            file_name=section.file_name,
            semaphore=semaphore,
        )

    # Write the single component file
    output_dir = config.output_dir / request.project_id
    components_dir = output_dir / "components"
    components_dir.mkdir(parents=True, exist_ok=True)

    code = _strip_fences(comp.code)
    name = _extract_component_name(code) or section.component_name
    code = _normalize_exports(code, name)
    code = _strip_trailing_prose(code)
    code = _remove_hallucinated_imports(code)
    code = _normalize_react_icons(code)
    code = _fix_next_image(code)
    code = _ensure_use_client(code)
    (components_dir / f"{section.file_name}.tsx").write_text(code, encoding="utf-8")

    return {"file_name": section.file_name, "component_name": name, "code": code}


async def health():
    import httpx
    from config import load_config
    cfg = load_config()
    ollama_ok = False
    try:
        async with httpx.AsyncClient(timeout=3.0) as c:
            r = await c.get(f"{cfg.ollama_base_url}/api/tags")
            ollama_ok = r.status_code == 200
    except Exception:
        pass
    return {"status": "ok", "ollama": "reachable" if ollama_ok else "unreachable"}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
