"""LLM client for LangGraph nodes."""

from __future__ import annotations

from typing import Any

from langchain_huggingface import ChatHuggingFace, HuggingFaceEndpoint
from langchain_ollama import ChatOllama

from config import LLMConfig


def build_chat_model(config: LLMConfig, provider: str = "huggingface", **overrides: Any) -> Any:
    temperature = overrides.get("temperature", config.temperature)
    top_p = overrides.get("top_p", config.top_p)
    top_k = overrides.get("top_k", config.top_k)
    min_p = overrides.get("min_p", config.min_p)

    if provider == "ollama":
        kwargs: dict[str, Any] = {}
        if top_p is not None:
            kwargs["top_p"] = top_p
        if top_k is not None:
            kwargs["top_k"] = top_k
        if min_p is not None:
            kwargs["min_p"] = min_p

        return ChatOllama(
            base_url=overrides.get("base_url", "http://localhost:11434"),
            model=overrides.get("model", config.model),
            temperature=temperature,
            **kwargs,
        )
    
    hf_kwargs: dict[str, Any] = {}
    if top_p is not None:
        hf_kwargs["top_p"] = top_p
    if top_k is not None:
        hf_kwargs["top_k"] = top_k

    llm = HuggingFaceEndpoint(
        repo_id=config.model,
        huggingfacehub_api_token=config.api_key,
        temperature=temperature,
        max_new_tokens=overrides.get("max_tokens", config.max_tokens),
        **hf_kwargs,
    )
    return ChatHuggingFace(llm=llm)
