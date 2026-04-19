"""Code generator node."""

import asyncio

import httpx
from langchain_core.messages import HumanMessage, SystemMessage

from config import load_config
from llm_client import build_chat_model
from prompts import CODE_GENERATION_SYSTEM
from state import GeneratedComponent, GraphState

MAX_CONCURRENT = 3  # matches OLLAMA_NUM_PARALLEL env var — set that in Ollama to enable true GPU parallelism


import re


def _extract_code(text: str) -> str:
    """Extract pure TSX code from LLM output, stripping any prose prefix/suffix."""
    text = text.strip()

    # Try to extract from markdown fences first
    fence_match = re.search(r"```(?:tsx?|jsx?)?\s*\n([\s\S]*?)```", text, re.IGNORECASE)
    if fence_match:
        return fence_match.group(1).strip()

    # Find where actual code starts (first import, 'use client', or JSX comment)
    code_start = re.search(r'^(?:"use client"|\'use client\'|import |//|/\*)', text, re.MULTILINE)
    if code_start:
        text = text[code_start.start():]

    # Strip any trailing prose after the last export statement
    lines = text.splitlines()
    last_export = -1
    for i, line in enumerate(lines):
        if line.strip().startswith("export"):
            last_export = i
    if last_export != -1:
        text = "\n".join(lines[:last_export + 1])

    return text.strip()


async def _generate_one_ollama(
    base_url: str,
    model: str,
    section_prompt: str,
    component_name: str,
    section_name: str,
    file_name: str,
    temperature: float,
    top_p: float | None,
    top_k: int | None,
    min_p: float | None,
    max_tokens: int,
    semaphore: asyncio.Semaphore,
) -> GeneratedComponent:
    async with semaphore:
        options: dict[str, object] = {
            "temperature": temperature,
            "num_predict": max_tokens,
            "repeat_penalty": 1.05,
        }
        if top_p is not None:
            options["top_p"] = top_p
        if top_k is not None:
            options["top_k"] = top_k
        if min_p is not None:
            options["min_p"] = min_p

        payload = {
            "model": model,
            "prompt": section_prompt,
            "stream": False,
            "think": False,
            "options": options,
        }
        async with httpx.AsyncClient(timeout=300.0) as client:
            response = await client.post(f"{base_url}/api/generate", json=payload)
            response.raise_for_status()
            code = _extract_code(response.json()["response"])

    return GeneratedComponent(
        section_name=section_name,
        component_name=component_name,
        file_name=file_name,
        code=code,
    )


async def _generate_one_hf(
    section_prompt: str,
    component_name: str,
    section_name: str,
    file_name: str,
    semaphore: asyncio.Semaphore,
) -> GeneratedComponent:
    config = load_config()
    llm = build_chat_model(config.generator_llm)

    async with semaphore:
        response = await llm.ainvoke([
            SystemMessage(content=CODE_GENERATION_SYSTEM),
            HumanMessage(content=section_prompt),
        ])
        code = _extract_code(response.content)

    return GeneratedComponent(
        section_name=section_name,
        component_name=component_name,
        file_name=file_name,
        code=code,
    )


async def _generate_all(state: GraphState) -> list[GeneratedComponent]:
    config = load_config()
    plan = state.get("section_plan")
    if not plan:
        raise ValueError("No section_plan in state")

    semaphore = asyncio.Semaphore(MAX_CONCURRENT)

    if config.generator_provider == "ollama":
        tasks = [
            _generate_one_ollama(
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
            for section in plan.sections
        ]
    else:
        tasks = [
            _generate_one_hf(
                section_prompt=section.prompt,
                component_name=section.component_name,
                section_name=section.section_name,
                file_name=section.file_name,
                semaphore=semaphore,
            )
            for section in plan.sections
        ]

    return await asyncio.gather(*tasks)


def code_generator_node(state: GraphState) -> dict:
    try:
        loop = asyncio.get_running_loop()
    except RuntimeError:
        loop = None

    if loop and loop.is_running():
        import concurrent.futures
        with concurrent.futures.ThreadPoolExecutor(max_workers=1) as pool:
            components = pool.submit(asyncio.run, _generate_all(state)).result()
    else:
        components = asyncio.run(_generate_all(state))

    return {
        "generated_components": list(components),
        "preview_components": list(components),
        "generation_complete": True,
    }
