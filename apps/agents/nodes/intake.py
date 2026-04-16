"""Intake node: captures the initial user request."""

from state import GraphState


def intake_node(state: GraphState) -> dict:
    user_request = state["user_request"]
    return {
        "messages": [{"role": "user", "content": user_request}],
        "questionnaire_complete": False,
    }
