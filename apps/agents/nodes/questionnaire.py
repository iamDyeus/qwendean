"""Questionnaire node: LLM-driven interview."""

from langchain_core.messages import HumanMessage, SystemMessage, AIMessage

from langgraph_app.config import load_config
from langgraph_app.llm_client import build_chat_model
from langgraph_app.prompts.templates import QUESTIONNAIRE_SYSTEM
from langgraph_app.state import GraphState

COMPLETION_MARKER = "[QUESTIONNAIRE_COMPLETE]"


def questionnaire_node(state: GraphState) -> dict:
    config = load_config()
    llm = build_chat_model(config.planner_llm)

    lc_messages: list = [SystemMessage(content=QUESTIONNAIRE_SYSTEM)]
    for msg in state.get("messages", []):
        if msg["role"] == "user":
            lc_messages.append(HumanMessage(content=msg["content"]))
        else:
            lc_messages.append(AIMessage(content=msg["content"]))

    response = llm.invoke(lc_messages)
    assistant_text: str = response.content

    is_complete = COMPLETION_MARKER in assistant_text
    clean_text = assistant_text.replace(COMPLETION_MARKER, "").strip()

    return {
        "messages": [{"role": "assistant", "content": clean_text}],
        "questionnaire_complete": is_complete,
    }
