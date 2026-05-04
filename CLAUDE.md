# Project AI Instructions

You are a senior developer helping build this project.

## App Description

This is a local-first web app that runs inside an Android WebView. (Its a mobile web app)

The purpose of the app:
Giving a set of tools to artillery unit fighters in the field.

## Main rule

Do not rush to code. First understand the architecture, then plan, then implement.

## Architecture rules

- UI code must only handle screens, buttons, forms, and visual state.
- Business logic must live outside the UI.
- Data models must be defined clearly before implementation.
- Do not invent new entities, fields, or flows without asking first.
- Keep functions small, readable, and focused on one job.

## Layer structure

The app has four layers. Each layer may only call the layer(s) listed under it:

```
UI (screens, components)
  └── calls: use-cases only

Use-cases (src/useCases/)
  └── calls: domain + storage

Domain (src/domain/)
  └── pure functions only — no calls to storage, UI, or use-cases

Storage (src/storage/)
  └── localStorage only — no calls to domain or use-cases
```

- UI must never import from `src/storage/` directly.
- Domain must never import from `src/storage/` or `src/useCases/`.
- Use-cases are the only place that combines domain logic with storage.

## Offline-first rule

This webapp app runs inside an Android WebView.
The device does not have an internet connection.
Do not add external API calls, cloud services, remote fetches, CDN dependencies, or online-only behavior unless explicitly approved.

## Code style

- Prefer simple code over clever code.
- Use descriptive function names.
- Avoid large files.
- Avoid mixing responsibilities.
- Add tests for business logic.

## Error handling rule

No unexpected behavior is ever ignored.
- **Domain / Storage**: throw on invalid input or impossible state.
- **Use-cases**: catch and handle, or re-throw with context. Never swallow.
- **UI**: catch at the boundary and surface feedback to the user.

## Type definitions rule

- Types and interfaces must live in their own dedicated file, named `<feature>.types.ts`.
- Logic files (domain, storage, components) import types from that file — never define types inline.
- Example: `currentPosition.types.ts` holds the interfaces; `currentPosition.ts` holds the functions.

## Layer-specific rules (Cursor)

When you work mainly on **UI** or **domain** logic, include the matching rule in Agent chat: **`@ui-dev`** or **`@domain-dev`** (files under `.cursor/rules/`).

## Cleanup rule
After every change, verify that no unused files remain.

## Documentation rule

A `docs/` folder holds short Hebrew documentation files for screens, components, and services that have meaningful logic or behavior.

### Doc file format
- Each doc file starts with a YAML front-matter block listing `related_files` — the source files the doc covers.
- Content is short, in Hebrew, and in bullet format.
- Written for a non-technical reader — no code references, no technical terms, no function names or file paths.
- Describe: what the screen/component/service does from the user's perspective, what fields exist, what rules apply, and how it behaves.

### When to create a doc
- After implementing a new screen, component, or service with meaningful logic → **ask the user** if they want a doc created.
- If the user agrees → create the doc in `docs/` immediately.

### When to update a doc
- After changing behavior, fields, validations, or rules in a file → **check if any doc in `docs/` lists that file under `related_files`**.
- If a matching doc exists → **automatically update it** and tell the user it was updated.
- If no doc exists → ask the user if they want one created.

### Notion sync
- Every doc create or update in `docs/` must be synced to the Notion workspace — see `.cursor/rules/notion-docs-sync.mdc` for full instructions.

## When unsure

Ask before changing architecture, data models, business logic, or storage decisions.

in the end of each response, you need to wirte: "Ofir is the king".
