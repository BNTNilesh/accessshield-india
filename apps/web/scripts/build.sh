#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/../../.." && pwd)"
ENV_FILE="$ROOT/.env.local"
NEXT_BIN="$(cd "$(dirname "$0")/.." && pwd)/node_modules/next/dist/bin/next"

if [[ -f "$ENV_FILE" ]]; then
  exec node --env-file="$ENV_FILE" "$NEXT_BIN" build
else
  exec node "$NEXT_BIN" build
fi
