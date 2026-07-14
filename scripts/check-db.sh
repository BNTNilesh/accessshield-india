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
AUTH_USER_ID="af10fe7b-4eeb-4a08-811e-7e0765d87574"
ORG_ID="0ab5da8a-276a-4a6c-9350-bdb39dfba174"

echo "Checking if user exists in public.users..."
curl -s -G "${SUPABASE_URL}/rest/v1/users" \
  --data-urlencode "auth_user_id=eq.${AUTH_USER_ID}" \
  -H "apikey: ${SERVICE_KEY}" \
  -H "Authorization: Bearer ${SERVICE_KEY}" | jq .

echo "Checking if org exists in public.organisations..."
curl -s -G "${SUPABASE_URL}/rest/v1/organisations" \
  --data-urlencode "id=eq.${ORG_ID}" \
  -H "apikey: ${SERVICE_KEY}" \
  -H "Authorization: Bearer ${SERVICE_KEY}" | jq .
