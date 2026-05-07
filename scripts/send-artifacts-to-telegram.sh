#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
OUTPUT_DIR="$ROOT_DIR/output"
APK_PATH="${1:-$OUTPUT_DIR/back-squad-app.apk}"
HTML_PATH="${2:-$OUTPUT_DIR/back-squad-standalone.html}"
ENV_FILE="$ROOT_DIR/.env"

if [ -f "$ENV_FILE" ]; then
    set -a
    # shellcheck source=/dev/null
    . "$ENV_FILE"
    set +a
fi

if [ -z "${BOT_TOKEN:-}" ]; then
    echo "ERROR: BOT_TOKEN is required."
    exit 1
fi

if [ -z "${TELEGRAM_CHAT_ID:-}" ]; then
    echo "ERROR: TELEGRAM_CHAT_ID is required (example: @channel_name or numeric chat id)."
    exit 1
fi

if [ ! -f "$APK_PATH" ]; then
    echo "ERROR: APK file not found at $APK_PATH"
    exit 1
fi

if [ ! -f "$HTML_PATH" ]; then
    echo "ERROR: HTML file not found at $HTML_PATH"
    exit 1
fi

APP_VERSION="$(node -p "require('${ROOT_DIR}/package.json').version" 2>/dev/null || true)"
if [ -z "$APP_VERSION" ]; then
    APP_VERSION="unknown"
fi

BUILD_TIME="$(date +"%Y-%m-%d %H:%M:%S %Z")"
BRANCH_NAME="$(git -C "$ROOT_DIR" rev-parse --abbrev-ref HEAD 2>/dev/null || echo "unknown")"
SHORT_COMMIT="$(git -C "$ROOT_DIR" rev-parse --short HEAD 2>/dev/null || echo "unknown")"

CAPTION=$(
    cat <<EOF
Back Squad build artifacts
Version: ${APP_VERSION}
Branch: ${BRANCH_NAME}
Commit: ${SHORT_COMMIT}
Built at: ${BUILD_TIME}
EOF
)

echo ">>> Sending APK to Telegram..."
curl --fail --silent --show-error \
    -X POST "https://api.telegram.org/bot${BOT_TOKEN}/sendDocument" \
    -F "chat_id=${TELEGRAM_CHAT_ID}" \
    -F "caption=${CAPTION}" \
    -F "document=@${APK_PATH}"

echo ">>> Sending HTML to Telegram..."
curl --fail --silent --show-error \
    -X POST "https://api.telegram.org/bot${BOT_TOKEN}/sendDocument" \
    -F "chat_id=${TELEGRAM_CHAT_ID}" \
    -F "caption=Standalone HTML for version ${APP_VERSION}" \
    -F "document=@${HTML_PATH}"

echo ""
echo "Done! Sent APK and HTML to Telegram chat ${TELEGRAM_CHAT_ID}."
