#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
ENV_FILE="$ROOT/.env.local"

get_env() {
  local key="$1"
  grep -E "^${key}=" "$ENV_FILE" 2>/dev/null | tail -n1 | sed 's/\r$//' | cut -d= -f2-
}

SUPABASE_URL="$(get_env SUPABASE_URL)"
SERVICE_KEY="$(get_env SUPABASE_SERVICE_ROLE_KEY)"
EMAIL="pravinbntsoft@gmail.com"

echo "Looking up Supabase user for $EMAIL..."
curl -s -G "${SUPABASE_URL}/auth/v1/admin/users" \
  --data-urlencode "email=${EMAIL}" \
  -H "apikey: ${SERVICE_KEY}" \
  -H "Authorization: Bearer ${SERVICE_KEY}" | jq .
