"""LLM client for LangGraph nodes."""

from __future__ import annotations

from typing import Any

from langchain_huggingface import ChatHuggingFace, HuggingFaceEndpoint
from langchain_ollama import ChatOllama

from config import LLMConfig, load_config


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
        repeat_penalty = overrides.get("repeat_penalty", config.repeat_penalty if hasattr(config, "repeat_penalty") else None)
        if repeat_penalty is not None:
            kwargs["repeat_penalty"] = repeat_penalty
        frequency_penalty = overrides.get("frequency_penalty", None)
        if frequency_penalty is not None:
            kwargs["frequency_penalty"] = frequency_penalty

        base_url = overrides.get("base_url") or load_config().ollama_base_url

        return ChatOllama(
            base_url=base_url,
            model=overrides.get("model", config.model),
            temperature=temperature,
            think=False,
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
