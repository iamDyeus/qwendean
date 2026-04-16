"""LangGraph state definitions and Pydantic models."""

from __future__ import annotations

import operator
from typing import Annotated, TypedDict

from pydantic import BaseModel, Field


class SectionPromptMapping(BaseModel):
    section_name: str = Field(description="Human-readable section name")
    category: str = Field(description="Category key")
    prompt: str = Field(description="Full generation prompt")
    component_name: str = Field(description="PascalCase React component name")
    file_name: str = Field(description="kebab-case file name")


class SectionPlan(BaseModel):
    sections: list[SectionPromptMapping] = Field(description="Ordered list of sections")


class GeneratedComponent(BaseModel):
    section_name: str
    component_name: str
    file_name: str
    code: str


class Option(BaseModel):
    id: str
    label: str


class ChatMessage(TypedDict):
    role: str
    content: str


class GraphState(TypedDict, total=False):
    project_id: str
    user_request: str
    messages: Annotated[list[ChatMessage], operator.add]
    options: list[Option]
    industry: str
    questionnaire_complete: bool
    section_plan: SectionPlan | None
    generated_components: Annotated[list[GeneratedComponent], operator.add]
    preview_components: Annotated[list[GeneratedComponent], operator.add]
    generation_complete: bool
    final_page_path: str
    error: str
