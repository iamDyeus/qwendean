"""LLM client for LangGraph nodes."""

from __future__ import annotations

from typing import Any

from langchain_huggingface import ChatHuggingFace, HuggingFaceEndpoint
from langchain_ollama import ChatOllama

from config import LLMConfig


def build_chat_model(config: LLMConfig, provider: str = "huggingface", **overrides: Any) -> Any:
    if provider == "ollama":
        return ChatOllama(
            base_url=overrides.get("base_url", "http://localhost:11434"),
            model=overrides.get("model", config.model),
            temperature=overrides.get("temperature", config.temperature),
        )
    
    llm = HuggingFaceEndpoint(
        repo_id=config.model,
        huggingfacehub_api_token=config.api_key,
        temperature=overrides.get("temperature", config.temperature),
        max_new_tokens=overrides.get("max_tokens", config.max_tokens),
    )
    return ChatHuggingFace(llm=llm)
