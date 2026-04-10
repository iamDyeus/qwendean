"""Page assembler node."""

import re

from langgraph_app.config import load_config
from langgraph_app.state import GraphState


def _extract_component_name(code: str) -> str | None:
    match = re.search(r'export\s*\{\s*(\w+)\s*\}', code)
    if match:
        return match.group(1)
    match = re.search(r'export\s+default\s+function\s+(\w+)', code)
    if match:
        return match.group(1)
    match = re.search(r'export\s+default\s+(\w+)', code)
    if match:
        return match.group(1)
    return None


def page_assembler_node(state: GraphState) -> dict:
    config = load_config()
    output_dir = config.output_dir
    components_dir = output_dir / "components"
    components_dir.mkdir(parents=True, exist_ok=True)

    plan = state.get("section_plan")
    generated = state.get("generated_components", [])

    if not plan or not generated:
        return {"error": "Missing section_plan or generated_components"}

    component_lookup = {c.file_name: c for c in generated}

    import_lines: list[str] = []
    jsx_lines: list[str] = []

    for section in plan.sections:
        component = component_lookup.get(section.file_name)
        if not component:
            continue

        actual_component_name = _extract_component_name(component.code)
        if not actual_component_name:
            actual_component_name = component.component_name

        file_path = components_dir / f"{component.file_name}.tsx"
        file_path.write_text(component.code, encoding="utf-8")

        import_lines.append(
            f'import {{ {actual_component_name} }} from "./components/{component.file_name}";'
        )
        jsx_lines.append(f"        <{actual_component_name} />")

    page_content = _build_page_tsx(import_lines, jsx_lines)
    page_path = output_dir / "page.tsx"
    page_path.write_text(page_content, encoding="utf-8")

    return {"final_page_path": str(page_path)}


def _build_page_tsx(import_lines: list[str], jsx_lines: list[str]) -> str:
    imports = "\n".join(import_lines)
    components = "\n".join(jsx_lines)

    return f"""{imports}

const LandingPage = () => {{
    return (
        <div className="min-h-screen mx-auto my-auto max-w-9/12">
{components}
        </div>
    );
}};

export default LandingPage;
"""
