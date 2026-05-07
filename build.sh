#!/usr/bin/env bash
# build.sh — Full pipeline: React build → Android APK → output/
#
# Prerequisites:
#   - Node.js 18+
#   - JDK 17+  (JAVA_HOME must be set, or java must be on PATH)
#   - Android SDK with ANDROID_HOME set
#       sdkmanager "platforms;android-35" "build-tools;35.0.0"
#   - First time only: from android/, run:
#       gradle wrapper --gradle-version=8.9
#     or open the android/ folder in Android Studio once to auto-generate gradlew.
#
# Usage:
#   chmod +x build.sh
#   ./build.sh

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")" && pwd)"
ANDROID_DIR="$ROOT_DIR/android"
ASSETS_DIR="$ANDROID_DIR/app/src/main/assets/www"
OUTPUT_DIR="$ROOT_DIR/output"
TELEGRAM_SENDER_SCRIPT="$ROOT_DIR/scripts/send-artifacts-to-telegram.sh"

# ── Preflight checks ──────────────────────────────────────────────────────────

if [ ! -f "$ANDROID_DIR/gradle/wrapper/gradle-wrapper.jar" ]; then
    echo ""
    echo "ERROR: gradle-wrapper.jar is missing."
    echo ""
    echo "Fix: from the android/ directory, run one of:"
    echo "  gradle wrapper --gradle-version=8.9"
    echo "  (or open android/ in Android Studio once to auto-generate it)"
    echo ""
    exit 1
fi

if ! command -v java &> /dev/null; then
    echo "ERROR: java not found. Install JDK 17+ and set JAVA_HOME."
    exit 1
fi

if [ -z "${ANDROID_HOME:-}" ]; then
    echo "ERROR: ANDROID_HOME is not set. Point it to your Android SDK directory."
    exit 1
fi

# ── Step 1: Build React app ───────────────────────────────────────────────────

echo ">>> Installing Node dependencies..."
npm ci --prefix "$ROOT_DIR"

echo ">>> Building React app..."
npm run build --prefix "$ROOT_DIR"

# ── Step 2: Copy web assets into Android project ──────────────────────────────

echo ">>> Copying web assets to Android..."
rm -rf "$ASSETS_DIR"
mkdir -p "$ASSETS_DIR"
cp -r "$ROOT_DIR/dist/." "$ASSETS_DIR/"

# ── Step 3: Build Android APK ─────────────────────────────────────────────────

echo ">>> Building Android APK..."
cd "$ANDROID_DIR"
./gradlew assembleDebug --no-daemon

# ── Step 4: Copy APK to output/ ───────────────────────────────────────────────

echo ">>> Copying APK to output/..."
mkdir -p "$OUTPUT_DIR"
cp "$ANDROID_DIR/app/build/outputs/apk/debug/app-debug.apk" "$OUTPUT_DIR/back-squad-app.apk"
cp "$ROOT_DIR/dist/index.html" "$OUTPUT_DIR/back-squad-standalone.html"

# ── Step 5: Send artifacts to Telegram ─────────────────────────────────────────

echo ">>> Sending build artifacts to Telegram..."
"$TELEGRAM_SENDER_SCRIPT" "$OUTPUT_DIR/back-squad-app.apk" "$OUTPUT_DIR/back-squad-standalone.html"

echo ""
echo "Done! APK is at: output/back-squad-app.apk"
