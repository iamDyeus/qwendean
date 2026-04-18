# Toolkit Build Pipeline

## Flow

```
User prompt
    │
    ▼
[agents] code_generator_node
    │  LLM generates raw TSX for each section concurrently
    │  Output: list of GeneratedComponent { section_name, component_name, file_name, code }
    │
    ▼
[agents] page_assembler_node
    │  For each component:
    │    1. Strip markdown fences
    │    2. Normalize to named exports
    │    3. Strip trailing LLM prose
    │    4. Write → toolkit/builds/<projectId>/components/<file>.tsx
    │  Writes entry → toolkit/builds/<projectId>/page.tsx
    │
    ▼
[electron] Opens webview → http://localhost:3000/builds/<projectId>
    │
    ▼
[toolkit] app/builds/[buildId]/page.tsx  (Next.js dynamic route)
    │  1. Checks toolkit/builds/<buildId>/ exists — 404 if not
    │  2. Copies toolkit/builds/<buildId>/ → app/builds/[buildId]/<buildId>/
    │  3. Dynamic import(./<buildId>/page)
    │       • First request on a brand-new build: webpack hasn't registered the
    │         newly copied files yet → MODULE_NOT_FOUND → wait 500ms → retry
    │         (transparent to the user, no error page)
    │       • All subsequent requests: import resolves immediately
    │  4. Renders the component
    │  On error → error.tsx boundary shows inline message (isolated to this build)
```

## Key Directories

| Path | Purpose |
|------|---------|
| `apps/agents/` | FastAPI + LangGraph pipeline |
| `apps/toolkit/builds/<projectId>/` | Primary build output (source of truth, written by agents) |
| `apps/toolkit/app/builds/[buildId]/<projectId>/` | Copy created on first request so Next.js can compile it |
| `apps/toolkit/app/builds/[buildId]/page.tsx` | Next.js route — handles copy + retry import + rendering |
| `apps/toolkit/app/builds/[buildId]/error.tsx` | Per-build error boundary |

## Isolation Design

- Builds are stored in `toolkit/builds/` (outside `app/`) so Next.js never auto-discovers them
- A build is only copied into `app/` when its route is first requested — broken old builds don't pollute the dev server
- First-request cold-start race (webpack file watcher lag) is handled by a 500ms retry — transparent to the user
- Each build gets its own error boundary via `error.tsx` — a broken build shows an inline error without affecting others
