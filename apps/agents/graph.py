"""LangGraph pipeline definition."""

from langgraph.checkpoint.memory import InMemorySaver
from langgraph.graph import END, StateGraph
from langgraph.types import interrupt

from nodes.intake import intake_node
from nodes.questionnaire import questionnaire_node
from nodes.section_planner import section_planner_node
from nodes.code_generator import code_generator_node
from nodes.page_assembler import page_assembler_node
from state import GraphState


def human_input_node(state: GraphState) -> dict:
    user_response = interrupt("Please answer the consultant's questions above.")
    return {"messages": [{"role": "user", "content": user_response}]}


def review_plan_node(state: GraphState) -> dict:
    plan = state.get("section_plan")
    if not plan:
        return {"error": "No section plan to review"}

    plan_summary_lines = []
    for i, section in enumerate(plan.sections, 1):
        plan_summary_lines.append(
            f"  {i}. [{section.category}] {section.section_name} → {section.component_name}"
        )
    plan_summary = "\n".join(plan_summary_lines)

    user_decision = interrupt(
        f"Here is the proposed landing page plan:\n\n"
        f"{plan_summary}\n\n"
        f"Type 'approve' to proceed with code generation, or describe changes you'd like."
    )

    if user_decision.strip().lower() == "approve":
        return {}

    return {
        "messages": [
            {"role": "user", "content": f"Please revise the plan: {user_decision}"}
        ],
    }


def _should_continue_questionnaire(state: GraphState) -> str:
    if state.get("questionnaire_complete"):
        return "plan"
    return "ask_user"


def _after_review(state: GraphState) -> str:
    if state.get("error"):
        return END
    messages = state.get("messages", [])
    if messages and "revise the plan" in messages[-1].get("content", "").lower():
        return "replan"
    return "generate"


def build_graph():
    builder = StateGraph(GraphState)

    builder.add_node("intake", intake_node)
    builder.add_node("questionnaire", questionnaire_node)
    builder.add_node("human_input", human_input_node)
    builder.add_node("section_planner", section_planner_node)
    builder.add_node("review_plan", review_plan_node)
    builder.add_node("code_generator", code_generator_node)
    builder.add_node("page_assembler", page_assembler_node)

    builder.set_entry_point("intake")

    builder.add_edge("intake", "questionnaire")
    builder.add_conditional_edges(
        "questionnaire",
        _should_continue_questionnaire,
        {"ask_user": "human_input", "plan": "section_planner"},
    )
    builder.add_edge("human_input", "questionnaire")
    builder.add_edge("section_planner", "review_plan")
    builder.add_conditional_edges(
        "review_plan",
        _after_review,
        {"replan": "section_planner", "generate": "code_generator", END: END},
    )
    builder.add_edge("code_generator", "page_assembler")
    builder.add_edge("page_assembler", END)

    from langgraph.checkpoint.serde.jsonplus import JsonPlusSerializer
    checkpointer = InMemorySaver(serde=JsonPlusSerializer(
        allowed_msgpack_modules=[("state", "SectionPlan"), ("state", "GeneratedComponent")]
    ))
    return builder.compile(checkpointer=checkpointer), checkpointer
