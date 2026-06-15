#!/usr/bin/env bash
# Set Supabase app_metadata so JWT includes user_role + org_id for test@accessshield.in
# Requires SUPABASE_SERVICE_ROLE_KEY in .env.local (Dashboard → Settings → API → service_role)
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
if [[ -f "$ROOT/.env.local" ]]; then
  set -a
  # shellcheck disable=SC1091
  source <(grep -E '^(SUPABASE_URL|SUPABASE_SERVICE_ROLE_KEY)=' "$ROOT/.env.local" | sed 's/\r$//')
  set +a
fi

SUPABASE_URL="${SUPABASE_URL:-}"
SERVICE_KEY="${SUPABASE_SERVICE_ROLE_KEY:-}"
AUTH_USER_ID="f378b2fc-5b9c-4103-8fde-b35c91aa518c"
ORG_ID="11111111-1111-1111-1111-111111111111"

if [[ -z "$SUPABASE_URL" || -z "$SERVICE_KEY" ]]; then
  echo "Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local"
  echo ""
  echo "Manual fix — Supabase Dashboard → Authentication → Users → test@accessshield.in"
  echo "App Metadata:"
  echo '  { "user_role": "customer_admin", "org_id": "11111111-1111-1111-1111-111111111111" }'
  exit 1
fi

curl -s -X PUT "${SUPABASE_URL}/auth/v1/admin/users/${AUTH_USER_ID}" \
  -H "apikey: ${SERVICE_KEY}" \
  -H "Authorization: Bearer ${SERVICE_KEY}" \
  -H "Content-Type: application/json" \
  -d "{\"app_metadata\":{\"user_role\":\"customer_admin\",\"org_id\":\"${ORG_ID}\"}}" \
  | jq .

echo "Done. Sign out and sign in again to refresh JWT."
