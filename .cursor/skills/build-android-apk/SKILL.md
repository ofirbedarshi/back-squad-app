---
name: build-android-apk
description: Build the Android debug APK for this back-squad-app repository using the existing npm build:apk pipeline and verify the output artifact. Use when the user asks to build an APK, generate Android output, or troubleshoot APK build failures in this project.
disable-model-invocation: true
---

# Build Android APK

## When to use

Use this skill when working in this repository and the user asks to:
- build an APK
- regenerate Android output after code changes
- diagnose APK build failures

## Repository-specific command

Run from the repo root:

```bash
npm run build:apk
```

This command runs `build.sh`, which performs:
1. Node dependency install (`npm ci`)
2. React production build (`npm run build`)
3. Copy `dist/` into Android assets
4. Gradle debug APK build (`./gradlew assembleDebug`)
5. Copy final APK to `output/back-squad-app.apk`

## Preflight checks

Before building, verify:
- Project root exists and contains `build.sh`, `android/`, and `package.json`
- Android Gradle wrapper exists at `android/gradle/wrapper/gradle-wrapper.jar`
- Java is available (`java` on PATH)
- `ANDROID_HOME` is set

If a preflight check fails, report the exact missing prerequisite and stop.

## Build workflow

1. Run `npm run build:apk` at repo root.
2. If build fails in TypeScript stage, fix TypeScript errors first, then rerun.
3. If Gradle fails, report the failing task and keep the actionable error lines.
4. On success, verify artifact exists:

```bash
ls -l output
```

Expected file:
- `output/back-squad-app.apk`

## Response format

After running, report:
- Success/failure
- Artifact path (`output/back-squad-app.apk`) on success
- File size if available
- Blocking errors and next fix step on failure

## Guardrails

- Do not use remote services; keep build fully local/offline.
- Do not use destructive git commands.
- Do not create commits unless explicitly requested.
