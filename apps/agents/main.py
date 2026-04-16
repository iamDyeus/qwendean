"""FastAPI backend for Qwendean landing page generator."""

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from langgraph.types import Command

from graph import build_graph
from state import GraphState

app = FastAPI(title="Qwendean API", version="0.1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

graph = build_graph()
sessions = {}


class StartRequest(BaseModel):
    user_request: str
    session_id: str


class ResumeRequest(BaseModel):
    user_input: str
    session_id: str


class SessionResponse(BaseModel):
    session_id: str
    messages: list[dict]
    waiting_for_input: bool
    interrupt_prompt: str | None = None
    section_plan: dict | None = None
    preview_components: list[dict] = []
    final_page_path: str | None = None
    error: str | None = None


@app.post("/api/start", response_model=SessionResponse)
async def start_session(request: StartRequest):
    session_id = request.session_id
    config = {"configurable": {"thread_id": session_id}}
    
    initial_state: GraphState = {"user_request": request.user_request}
    
    current_state = {}
    interrupt_prompt = None
    
    for event in graph.stream(initial_state, config=config, stream_mode="updates"):
        if "__interrupt__" in event:
            interrupts = event["__interrupt__"]
            if interrupts:
                interrupt_prompt = interrupts[0].value if hasattr(interrupts[0], "value") else str(interrupts[0])
            break
        
        for node_name, node_output in event.items():
            if node_name == "__interrupt__" or not isinstance(node_output, dict):
                continue
            current_state.update(node_output)
    
    sessions[session_id] = current_state
    
    return SessionResponse(
        session_id=session_id,
        messages=current_state.get("messages", []),
        waiting_for_input=interrupt_prompt is not None,
        interrupt_prompt=interrupt_prompt,
        section_plan=current_state.get("section_plan").dict() if current_state.get("section_plan") else None,
        preview_components=[c.dict() for c in current_state.get("preview_components", [])],
        final_page_path=current_state.get("final_page_path"),
        error=current_state.get("error"),
    )


@app.post("/api/resume", response_model=SessionResponse)
async def resume_session(request: ResumeRequest):
    session_id = request.session_id
    config = {"configurable": {"thread_id": session_id}}
    
    if session_id not in sessions:
        raise HTTPException(status_code=404, detail="Session not found")
    
    current_state = sessions[session_id]
    interrupt_prompt = None
    
    for event in graph.stream(Command(resume=request.user_input), config=config, stream_mode="updates"):
        if "__interrupt__" in event:
            interrupts = event["__interrupt__"]
            if interrupts:
                interrupt_prompt = interrupts[0].value if hasattr(interrupts[0], "value") else str(interrupts[0])
            break
        
        for node_name, node_output in event.items():
            if node_name == "__interrupt__" or not isinstance(node_output, dict):
                continue
            current_state.update(node_output)
    
    sessions[session_id] = current_state
    
    return SessionResponse(
        session_id=session_id,
        messages=current_state.get("messages", []),
        waiting_for_input=interrupt_prompt is not None,
        interrupt_prompt=interrupt_prompt,
        section_plan=current_state.get("section_plan").dict() if current_state.get("section_plan") else None,
        preview_components=[c.dict() for c in current_state.get("preview_components", [])],
        final_page_path=current_state.get("final_page_path"),
        error=current_state.get("error"),
    )


@app.get("/api/health")
async def health():
    return {"status": "ok"}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
