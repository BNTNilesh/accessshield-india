#!/usr/bin/env bash
# Apply migrations + dev seed to Docker Postgres (port 5433).
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/../../.." && pwd)"
CONTAINER="${POSTGRES_CONTAINER:-accessshield-postgres}"
DB_USER="${POSTGRES_USER:-postgres}"
DB_NAME="${POSTGRES_NAME:-accessshield}"

if ! docker ps --format '{{.Names}}' | grep -qx "$CONTAINER"; then
  echo "Starting Postgres via docker compose..."
  docker compose -f "$ROOT/docker-compose.yml" up -d postgres
  sleep 2
fi

echo "Applying schema migration..."
docker exec -i "$CONTAINER" psql -U "$DB_USER" -d "$DB_NAME" \
  < "$ROOT/packages/db/migrations/0000_graceful_trish_tilby.sql"

echo "Seeding dev data..."
docker exec -i "$CONTAINER" psql -U "$DB_USER" -d "$DB_NAME" \
  < "$ROOT/packages/db/seed/dev.sql"

echo ""
echo "Done. Test data:"
docker exec "$CONTAINER" psql -U "$DB_USER" -d "$DB_NAME" -c "
  SELECT 'org' AS type, id::text, name FROM organisations WHERE slug = 'test-org'
  UNION ALL
  SELECT 'user', id::text, email FROM users WHERE email = 'test@accessshield.in'
  UNION ALL
  SELECT 'asset', id::text, name FROM assets WHERE id = '33333333-3333-3333-3333-333333333333';
"

echo ""
echo "JWT claims (set in Supabase Auth → Users → test@accessshield.in → App Metadata):"
echo '  { "user_role": "customer_admin", "org_id": "11111111-1111-1111-1111-111111111111" }'
echo ""
echo "Or run packages/db/seed/supabase-auth-hook.sql + supabase-seed.sql in Supabase SQL Editor."
