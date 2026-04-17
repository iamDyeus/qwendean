"""Application configuration loaded from environment variables."""

from __future__ import annotations

import os
from dataclasses import dataclass, field
from pathlib import Path

from dotenv import load_dotenv

load_dotenv()

PROJECT_ROOT = Path(__file__).resolve().parents[2]
OUTPUT_DIR = PROJECT_ROOT / "apps" / "toolkit" / "app" / "builds" / "[buildId]"


@dataclass(frozen=True)
class LLMConfig:
    model: str
    api_key: str
    temperature: float = 0.7
    top_p: float | None = None
    top_k: int | None = None
    min_p: float | None = None
    max_tokens: int = 4096


@dataclass(frozen=True)
class AppConfig:
    planner_llm: LLMConfig = field(default_factory=lambda: LLMConfig(
        model=os.getenv("PLANNER_MODEL", "meta-llama/Llama-3.1-8B-Instruct"),
        api_key=os.getenv("HUGGINGFACE_API_KEY", ""),
        temperature=float(os.getenv("PLANNER_TEMPERATURE", "1.0")),
        top_p=float(os.getenv("PLANNER_TOP_P", "0.95")),
        top_k=int(os.getenv("PLANNER_TOP_K", "64")),
        max_tokens=int(os.getenv("PLANNER_MAX_TOKENS", "4096")),
    ))

    generator_llm: LLMConfig = field(default_factory=lambda: LLMConfig(
        model=os.getenv("GENERATOR_MODEL", "Qwen/Qwen2.5-Coder-7B-Instruct"),
        api_key=os.getenv("HUGGINGFACE_API_KEY", ""),
        temperature=float(os.getenv("GENERATOR_TEMPERATURE", "0.7")),
        top_p=float(os.getenv("GENERATOR_TOP_P", "0.8")),
        top_k=int(os.getenv("GENERATOR_TOP_K", "20")),
        min_p=float(os.getenv("GENERATOR_MIN_P", "0.0")),
        max_tokens=int(os.getenv("GENERATOR_MAX_TOKENS", "8192")),
    ))

    planner_provider: str = field(default_factory=lambda: os.getenv("PLANNER_PROVIDER", "huggingface"))
    generator_provider: str = field(default_factory=lambda: os.getenv("GENERATOR_PROVIDER", "ollama"))
    colab_generator_url: str = field(default_factory=lambda: os.getenv("COLAB_GENERATOR_URL", ""))
    ollama_base_url: str = field(default_factory=lambda: os.getenv("OLLAMA_BASE_URL", "http://localhost:11434"))
    ollama_planner_model: str = field(default_factory=lambda: os.getenv("OLLAMA_PLANNER_MODEL", "llama3.1:8b"))
    ollama_model: str = field(default_factory=lambda: os.getenv("OLLAMA_MODEL", "qwendean"))

    output_dir: Path = field(default_factory=lambda: Path(
        os.getenv("OUTPUT_DIR", str(OUTPUT_DIR))
    ))


def load_config() -> AppConfig:
    return AppConfig()
