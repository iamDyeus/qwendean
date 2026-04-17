"""Questionnaire node: LLM-driven interview."""

import re
from langchain_core.messages import HumanMessage, SystemMessage, AIMessage

from config import load_config
from llm_client import build_chat_model
from prompts.templates import QUESTIONNAIRE_SYSTEM
from state import GraphState, Option

COMPLETION_MARKER = "[QUESTIONNAIRE_COMPLETE]"


def _parse_options(text: str) -> tuple[str, list[Option]]:
    options = []
    question_text = text

    question_match = re.search(r'QUESTION:\s*(.+?)(?=OPTIONS:|$)', text, re.DOTALL)
    if question_match:
        question_text = question_match.group(1).strip()

    options_match = re.search(r'OPTIONS:\s*(.+?)(?=\n\n|$)', text, re.DOTALL)
    if options_match:
        for idx, line in enumerate(options_match.group(1).strip().split('\n')):
            label = re.sub(r'^[-•*\d.]\s*', '', line.strip()).strip()
            if label:
                options.append({"id": str(idx + 1), "label": label})

    return question_text, options


def questionnaire_node(state: GraphState) -> dict:
    config = load_config()
    llm = build_chat_model(
        config.planner_llm,
        provider=config.planner_provider,
        base_url=config.ollama_base_url,
        model=config.ollama_planner_model,
    )

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

    question_text, options = _parse_options(clean_text)

    # Never mark complete if the model is still asking something
    if is_complete and (question_text or options):
        is_complete = False

    return {
        "messages": [{"role": "assistant", "content": question_text or clean_text}],
        "options": options,
        "questionnaire_complete": is_complete,
    }
