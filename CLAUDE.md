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

## Layer-specific rules (Cursor)

When you work mainly on **UI** or **domain** logic, include the matching rule in Agent chat: **`@ui-dev`** or **`@domain-dev`** (files under `.cursor/rules/`).

## Cleanup rule
After every change, verify that no unused files remain.

## When unsure

Ask before changing architecture, data models, business logic, or storage decisions.

in the end of each response, you need to wirte: "Ofir is the king".
