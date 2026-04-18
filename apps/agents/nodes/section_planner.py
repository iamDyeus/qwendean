"""Section planner node."""

import json
import re

from langchain_core.messages import HumanMessage, SystemMessage

from config import load_config
from llm_client import build_chat_model
from prompts import SECTION_PLANNER_SYSTEM
from state import GraphState, SectionPlan


def _build_conversation_summary(state: GraphState) -> str:
    lines: list[str] = []
    for msg in state.get("messages", []):
        role = "User" if msg["role"] == "user" else "Consultant"
        lines.append(f"{role}: {msg['content']}")
    return "\n\n".join(lines)


def section_planner_node(state: GraphState) -> dict:
    config = load_config()
    llm = build_chat_model(
        config.planner_llm,
        provider=config.planner_provider,
        base_url=config.ollama_base_url,
        model=config.ollama_planner_model,
    )

    conversation = _build_conversation_summary(state)
    user_prompt = (
        f"Here is the full conversation with the user:\n\n"
        f"{conversation}\n\n"
        f"Based on this conversation, produce the section-prompt plan as JSON."
    )

    response = llm.invoke([
        SystemMessage(content=SECTION_PLANNER_SYSTEM),
        HumanMessage(content=user_prompt),
    ])

    raw_text: str = response.content.strip()

    if not raw_text:
        return {"error": "Section planner returned empty response"}

    json_match = re.search(r'\{[\s\S]*"sections"[\s\S]*\}', raw_text)
    if json_match:
        raw_text = json_match.group(0)

    if raw_text.startswith("```"):
        raw_text = raw_text.split("\n", 1)[1]
        if raw_text.endswith("```"):
            raw_text = raw_text[:raw_text.rfind("```")]
        raw_text = raw_text.strip()

    raw_text = re.sub(r'[\x00-\x1f\x7f-\x9f]', ' ', raw_text)

    try:
        parsed = json.loads(raw_text)
        plan = SectionPlan.model_validate(parsed)
    except Exception as exc:
        return {"error": f"Section planner parse error: {exc}"}

    return {"section_plan": plan}
