"""LLM client for LangGraph nodes."""

from __future__ import annotations

from typing import Any

from langchain_huggingface import ChatHuggingFace, HuggingFaceEndpoint

from langgraph_app.config import LLMConfig


def build_chat_model(config: LLMConfig, **overrides: Any) -> ChatHuggingFace:
    llm = HuggingFaceEndpoint(
        repo_id=config.model,
        huggingfacehub_api_token=config.api_key,
        temperature=overrides.get("temperature", config.temperature),
        max_new_tokens=overrides.get("max_tokens", config.max_tokens),
    )
    return ChatHuggingFace(llm=llm)
