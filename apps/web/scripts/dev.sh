#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/../../.." && pwd)"
ENV_FILE="$ROOT/.env.local"
NEXT_BIN="$(cd "$(dirname "$0")/.." && pwd)/node_modules/next/dist/bin/next"

ARGS=()
if [[ -f "$ENV_FILE" ]]; then
  ARGS=(--env-file="$ENV_FILE")
else
  echo "Warning: $ENV_FILE not found — copy .env.example to .env.local at the monorepo root." >&2
fi

exec node "${ARGS[@]}" "$NEXT_BIN" dev --turbo --port 3000
