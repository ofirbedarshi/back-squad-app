# Project AI Instructions

You are a senior developer helping build this project.

## App Description

This is a local-first web app that runs inside an Android WebView. (Its a mobile web app)

The purpose of the app:
Giving a set of tools to artillery unit fighters in the field.

## Main rule

Do not rush to code. First understand the architecture, then plan, then implement.

## V1-only rule (no legacy)

**Status:** Pre-release — no production users, no obligation to keep old behavior.

Until the project owner explicitly switches to a migration/legacy mode:

- **Replace in place.** Update all call sites in the same change. Do not leave parallel old and new APIs.
- **Do not add** deprecated props, `@deprecated` aliases, compatibility shims, feature flags for “old path”, dual-read/write storage, or “temporary” bridges “for later cleanup”.
- **Do delete** dead code, unused props, and obsolete files when refactoring — do not comment them out “just in case”.
- **Storage:** Single current shape only. When a key or schema changes, ship the new shape and update all readers/writers in the same change — **no** migration helpers, dual-read/write, or load-time conversion from old formats.
- **Docs/comments:** Do not document removed flows as “legacy”; describe only current V1 behavior.

**Only add backward compatibility or data migration** when the owner explicitly asks (e.g. “keep legacy”, “migration period”, “support old localStorage”, “migrate existing data”).

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

**UI** and **domain** layer rules (`.cursor/rules/ui-dev.mdc`, `domain-dev.mdc`) are always applied in Agent — no need to `@` them manually.

## Destructive action rule

Every delete or irreversible action in the UI **must** be confirmed by the user before executing.

- Use `useConfirm()` (from `src/hooks/useConfirm.ts`) for all delete operations — single item or bulk.
- Pass `variant: 'danger'` and a clear Hebrew message describing what will be lost.
- Never call a remove/delete use-case directly from a button click without first awaiting confirmation.
- This applies to: removing items, clearing lists, and any other action that cannot be undone.

## Cleanup rule
After every change, verify that no unused files remain.

## Documentation rule

A `docs/` folder holds short Hebrew documentation files for screens, components, and services that have meaningful logic or behavior.

### Doc file format
- Each doc file starts with a YAML front-matter block listing `related_files` — the source files the doc covers.
- Content is short, in Hebrew, and in bullet format.
- Written for a non-technical reader — no code references, no technical terms, no function names or file paths.
- Focus on business logic: what the user can do, what is not allowed, required/optional fields, validations, calculations, defaults, persistence, destructive actions, offline/local behavior, and non-obvious side effects.
- Do **not** document obvious UI walkthroughs the user can see directly, such as which button opens a modal, empty-list messages, where errors appear visually, or that a saved item appears in the list.
- Keep docs tight. Prefer short sections like: description, data/fields, save rules, calculations, limitations, and local storage behavior. Avoid long field catalogs unless the fields themselves define important rules.

### Doc rendering rule
- For each doc in `docs/`, render `DocFeedbackModal` in every screen file listed under `related_files` (entries under `src/screens/`).
- Import the matching markdown doc using `?raw` and pass it into `DocFeedbackModal`.
- If a doc has no related screen entry, ask the user where that doc should be rendered.

### When to create a doc
- After implementing a new screen, component, or service with meaningful logic → **ask the user** if they want a doc created.
- If the user agrees → create the doc in `docs/` immediately and render it via `DocFeedbackModal` in all related screens.

### When to update a doc
- After changing behavior, fields, validations, or rules in a file → **check if any doc in `docs/` lists that file under `related_files`**.
- If a matching doc exists → **automatically update it** and tell the user it was updated.
- When updating, rewrite or trim the doc so it remains business-rule focused. Remove stale or trivial UI explanations instead of appending more text.
- If no doc exists → ask the user if they want one created.

## When unsure

Ask before changing architecture, data models, business logic, or storage decisions.

in the end of each response, you need to wirte: "Ofir is the king".
