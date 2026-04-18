"""Page assembler node."""

import re
from pathlib import Path

from config import load_config
from state import GraphState


def _strip_fences(code: str) -> str:
    code = code.strip()
    match = re.search(r"```(?:tsx?|jsx?)?\s*\n([\s\S]*?)```", code, re.IGNORECASE)
    if match:
        return match.group(1).strip()
    # Remove any remaining fence lines
    lines = [l for l in code.splitlines() if not re.match(r"^```", l.strip())]
    return "\n".join(lines).strip()


def _extract_component_name(code: str) -> str | None:
    """Return the exported component name, preferring named exports."""
    # export { Name } or export { Name as default }
    m = re.search(r'export\s*\{\s*(\w+)', code)
    if m:
        return m.group(1)
    # export function Name / export const Name
    m = re.search(r'export\s+(?:function|const|class)\s+(\w+)', code)
    if m:
        return m.group(1)
    # export default function Name
    m = re.search(r'export\s+default\s+function\s+(\w+)', code)
    if m:
        return m.group(1)
    # const/function Name (not exported yet)
    m = re.search(r'(?:const|function|class)\s+([A-Z]\w+)', code)
    if m:
        return m.group(1)
    return None


def _normalize_exports(code: str, expected_name: str) -> str:
    """
    Ensure the component:
    1. Has no `export default` (replace with named export)
    2. Ends with `export { ComponentName };`
    """
    # Replace `export default function Foo` → `function Foo`
    code = re.sub(r'export\s+default\s+function\s+', 'function ', code)
    # Replace `export default Foo` at end of file → remove it (we'll add named export)
    code = re.sub(r'\nexport\s+default\s+\w+\s*;?\s*$', '', code.rstrip())

    # If already has correct named export, done
    if re.search(rf'export\s*\{{\s*{re.escape(expected_name)}\s*\}}', code):
        return code.rstrip() + "\n"

    # Remove any other export { ... } lines to avoid duplicates
    code = re.sub(r'\nexport\s*\{[^}]*\}\s*;?', '', code)

    return code.rstrip() + f"\n\nexport {{ {expected_name} }};\n"


def _strip_trailing_prose(code: str) -> str:
    """Truncate anything after the last export statement (LLM often appends prose)."""
    lines = code.splitlines()
    last_export_idx = -1
    for i, line in enumerate(lines):
        stripped = line.strip()
        if stripped.startswith("export ") or stripped.startswith("export{"):
            last_export_idx = i
    if last_export_idx == -1:
        return code
    return "\n".join(lines[: last_export_idx + 1]) + "\n"


_CLIENT_HOOKS = re.compile(
    r'\b(useState|useEffect|useRef|useCallback|useMemo|useContext|useReducer|'
    r'useLayoutEffect|useTransition|useDeferredValue|'
    r'onClick|onChange|onSubmit|onKeyDown|onKeyPress|onMouseEnter|onMouseLeave)\b'
)


def _ensure_use_client(code: str) -> str:
    """Prepend 'use client' if the code uses hooks or event handlers but is missing the directive."""
    if '"use client"' in code or "'use client'" in code:
        return code
    if _CLIENT_HOOKS.search(code):
        return '"use client";\n\n' + code
    return code


def page_assembler_node(state: GraphState) -> dict:
    project_id = state.get("project_id")
    if not project_id:
        return {"error": "Missing project_id in state"}

    config = load_config()
    # Output: <toolkit>/app/builds/<project_id>/
    output_dir: Path = config.output_dir / project_id
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
        comp = component_lookup.get(section.file_name)
        if not comp:
            continue

        code = _strip_fences(comp.code)
        if not code:
            continue

        name = _extract_component_name(code) or section.component_name
        code = _normalize_exports(code, name)
        code = _strip_trailing_prose(code)
        code = _ensure_use_client(code)

        (components_dir / f"{section.file_name}.tsx").write_text(code, encoding="utf-8")
        import_lines.append(f'import {{ {name} as {section.component_name} }} from "./components/{section.file_name}";')
        jsx_lines.append(f"      <{section.component_name} />")

    if not import_lines:
        return {"error": "No components were assembled"}

    page = (
        "\n".join(import_lines)
        + '\n\nconst LandingPage = () => (\n  <div className="min-h-screen flex flex-col items-center">\n'
        + "\n".join(jsx_lines)
        + "\n  </div>\n);\n\nexport default LandingPage;\n"
    )

    page_path = output_dir / "page.tsx"
    page_path.write_text(page, encoding="utf-8")

    return {"final_page_path": str(page_path)}
