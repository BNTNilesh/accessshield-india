#!/usr/bin/env bash
# Create or update sysadmin@accessshield.in in Supabase Auth with super_admin claims.
# Requires SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, SYSADMIN_INITIAL_PASSWORD in .env.local
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
if [[ -f "$ROOT/.env.local" ]]; then
  set -a
  # shellcheck disable=SC1091
  source <(grep -E '^(SUPABASE_URL|SUPABASE_SERVICE_ROLE_KEY|SYSADMIN_INITIAL_PASSWORD|DATABASE_URL)=' "$ROOT/.env.local" | sed 's/\r$//')
  set +a
fi

SUPABASE_URL="${SUPABASE_URL:-}"
SERVICE_KEY="${SUPABASE_SERVICE_ROLE_KEY:-}"
PASSWORD="${SYSADMIN_INITIAL_PASSWORD:-}"
EMAIL="sysadmin@accessshield.in"
PLATFORM_ORG_ID="44444444-4444-4444-4444-444444444444"
APP_USER_ID="55555555-5555-5555-5555-555555555555"

if [[ -z "$SUPABASE_URL" || -z "$SERVICE_KEY" ]]; then
  echo "Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local"
  exit 1
fi

if [[ -z "$PASSWORD" ]]; then
  echo "Missing SYSADMIN_INITIAL_PASSWORD in .env.local"
  echo "Example: SYSADMIN_INITIAL_PASSWORD=your-secure-password"
  exit 1
fi

echo "Looking up existing Supabase user for $EMAIL..."
EXISTING=$(curl -s -G "${SUPABASE_URL}/auth/v1/admin/users" \
  --data-urlencode "email=${EMAIL}" \
  -H "apikey: ${SERVICE_KEY}" \
  -H "Authorization: Bearer ${SERVICE_KEY}")

AUTH_USER_ID=$(echo "$EXISTING" | jq -r '.users[0].id // empty')

if [[ -n "$AUTH_USER_ID" ]]; then
  echo "Updating existing user $AUTH_USER_ID..."
  curl -s -X PUT "${SUPABASE_URL}/auth/v1/admin/users/${AUTH_USER_ID}" \
    -H "apikey: ${SERVICE_KEY}" \
    -H "Authorization: Bearer ${SERVICE_KEY}" \
    -H "Content-Type: application/json" \
    -d "$(jq -n \
      --arg password "$PASSWORD" \
      --arg role "super_admin" \
      --arg org "$PLATFORM_ORG_ID" \
      '{password: $password, email_confirm: true, app_metadata: {user_role: $role, org_id: $org}}')" \
    | jq .
else
  echo "Creating new sysadmin user..."
  CREATE_RESP=$(curl -s -X POST "${SUPABASE_URL}/auth/v1/admin/users" \
    -H "apikey: ${SERVICE_KEY}" \
    -H "Authorization: Bearer ${SERVICE_KEY}" \
    -H "Content-Type: application/json" \
    -d "$(jq -n \
      --arg email "$EMAIL" \
      --arg password "$PASSWORD" \
      --arg role "super_admin" \
      --arg org "$PLATFORM_ORG_ID" \
      '{email: $email, password: $password, email_confirm: true, app_metadata: {user_role: $role, org_id: $org}}')")

  AUTH_USER_ID=$(echo "$CREATE_RESP" | jq -r '.id // empty')
  if [[ -z "$AUTH_USER_ID" ]]; then
    echo "Failed to create Supabase user:"
    echo "$CREATE_RESP" | jq .
    exit 1
  fi
  echo "$CREATE_RESP" | jq .
fi

if [[ -n "${DATABASE_URL:-}" ]]; then
  echo "Syncing auth_user_id in Postgres..."
  psql "$DATABASE_URL" -c "
    UPDATE users
    SET auth_user_id = '${AUTH_USER_ID}'::uuid, updated_at = now()
    WHERE id = '${APP_USER_ID}'::uuid;
  " 2>/dev/null || docker exec -i accessshield-postgres psql -U postgres -d accessshield -c "
    UPDATE users
    SET auth_user_id = '${AUTH_USER_ID}'::uuid, updated_at = now()
    WHERE id = '${APP_USER_ID}'::uuid;
  "
fi

echo ""
echo "Done. Sign in at /login with:"
echo "  Email:    $EMAIL"
echo "  Password: (value of SYSADMIN_INITIAL_PASSWORD in .env.local)"
echo "  Role:     super_admin"
echo "  Admin UI: /dashboard/admin"
