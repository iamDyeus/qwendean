"""Code generator node."""

import asyncio

import httpx
from langchain_core.messages import HumanMessage, SystemMessage

from langgraph_app.config import load_config
from langgraph_app.llm_client import build_chat_model
from langgraph_app.prompts.templates import CODE_GENERATION_SYSTEM
from langgraph_app.state import GeneratedComponent, GraphState

MAX_CONCURRENT = 3


def _strip_markdown_fences(text: str) -> str:
    text = text.strip()
    if text.startswith("```"):
        first_newline = text.index("\n")
        text = text[first_newline + 1:]
    if text.endswith("```"):
        text = text[:text.rfind("```")]
    return text.strip()


async def _generate_one_ollama(
    base_url: str,
    model: str,
    section_prompt: str,
    component_name: str,
    section_name: str,
    file_name: str,
    temperature: float,
    max_tokens: int,
    semaphore: asyncio.Semaphore,
) -> GeneratedComponent:
    async with semaphore:
        payload = {
            "model": model,
            "prompt": section_prompt,
            "stream": False,
            "options": {
                "temperature": temperature,
                "num_predict": max_tokens,
                "top_p": 0.95,
                "top_k": 20,
                "min_p": 0.1,
                "repeat_penalty": 1.0,
            }
        }
        async with httpx.AsyncClient(timeout=300.0) as client:
            response = await client.post(f"{base_url}/api/generate", json=payload)
            response.raise_for_status()
            code = _strip_markdown_fences(response.json()["response"])

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
        code = _strip_markdown_fences(response.content)

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
