"""Page assembler node."""

import re
from pathlib import Path

from config import load_config
from state import GraphState

# Toolkit builds directory (absolute path)
TOOLKIT_BUILDS_DIR = Path(__file__).resolve().parents[3] / "toolkit" / "app" / "builds"


def _extract_component_name(code: str) -> str | None:
    # Try named export
    match = re.search(r'export\s*\{\s*(\w+)\s*\}', code)
    if match:
        return match.group(1)
    
    # Try export function
    match = re.search(r'export\s+function\s+(\w+)', code)
    if match:
        return match.group(1)
    
    # Try export const with arrow function
    match = re.search(r'export\s+const\s+(\w+)\s*=', code)
    if match:
        return match.group(1)
    
    # Try default export function
    match = re.search(r'export\s+default\s+function\s+(\w+)', code)
    if match:
        return match.group(1)
    
    # Try default export identifier
    match = re.search(r'export\s+default\s+(\w+)', code)
    if match:
        return match.group(1)
    
    return None


def page_assembler_node(state: GraphState) -> dict:
    # Get project_id from state (should be passed from API)
    project_id = state.get("project_id")
    if not project_id:
        return {"error": "Missing project_id in state"}

    # Save to toolkit/app/builds/{project_id}
    output_dir = TOOLKIT_BUILDS_DIR / project_id
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

        # Ensure the component exports the expected name
        code = component.code
        if not re.search(rf'export\s+(const|function)\s+{re.escape(actual_component_name)}', code):
            # If component uses default export, convert to named export
            if 'export default' in code:
                code = re.sub(
                    r'export\s+default\s+',
                    f'export const {actual_component_name} = ',
                    code,
                    count=1
                )

        file_path = components_dir / f"{component.file_name}.tsx"
        file_path.write_text(code, encoding="utf-8")

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
