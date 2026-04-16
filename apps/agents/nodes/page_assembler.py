"""Page assembler node."""

import re

from config import load_config
from state import GraphState

# Toolkit builds directory (absolute path)
CONFIG = load_config()


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


def _extract_fenced_tsx(code: str) -> str:
    code = code.strip()
    if not code:
        return code

    fenced_langs = ["tsx", "ts", "jsx", "js"]
    for lang in fenced_langs:
        match = re.search(rf"```{lang}\s+([\s\S]*?)```", code, re.IGNORECASE)
        if match:
            return match.group(1).strip()

    # Fallback: first fenced block of any language
    match = re.search(r"```[a-zA-Z0-9_-]*\s+([\s\S]*?)```", code)
    if match:
        return match.group(1).strip()

    return code


def _ensure_named_export(code: str, component_name: str) -> str:
    named_export_pattern = rf"export\s+(const|function|class)\s+{re.escape(component_name)}\b"
    export_list_pattern = rf"export\s*\{{[^}}]*\b{re.escape(component_name)}\b[^}}]*\}}"

    if re.search(named_export_pattern, code) or re.search(export_list_pattern, code):
        return code

    if "export default" in code:
        code = re.sub(r"export\s+default\s+", f"const {component_name} = ", code, count=1)

    if re.search(rf"(const|function|class)\s+{re.escape(component_name)}\b", code):
        return code.rstrip() + f"\n\nexport {{ {component_name} }};\n"

    return code


def page_assembler_node(state: GraphState) -> dict:
    # Get project_id from state (should be passed from API)
    project_id = state.get("project_id")
    if not project_id:
        return {"error": "Missing project_id in state"}

    # Save to configured builds directory (defaults to apps/toolkit/app/builds/{project_id})
    output_dir = CONFIG.output_dir / project_id
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

        raw_code = _extract_fenced_tsx(component.code)

        actual_component_name = _extract_component_name(raw_code)
        if not actual_component_name:
            actual_component_name = component.component_name

        # Ensure the component exports the expected name
        code = _ensure_named_export(raw_code, actual_component_name)

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
