-- Run in Supabase Dashboard → SQL Editor if app DB is Supabase Postgres (not local Docker).
-- Same data as dev.sql — links test@accessshield.in auth user to org + demo asset.

INSERT INTO organisations (id, name, slug, plan_tier, billing_email, is_active)
VALUES (
  '11111111-1111-1111-1111-111111111111',
  'AccessShield Test Org',
  'test-org',
  'professional',
  'test@accessshield.in',
  true
)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  plan_tier = EXCLUDED.plan_tier,
  billing_email = EXCLUDED.billing_email,
  updated_at = now();

INSERT INTO users (
  id,
  organisation_id,
  auth_user_id,
  email,
  full_name,
  role,
  is_active
)
VALUES (
  '22222222-2222-2222-2222-222222222222',
  '11111111-1111-1111-1111-111111111111',
  'f378b2fc-5b9c-4103-8fde-b35c91aa518c',
  'test@accessshield.in',
  'Test User',
  'customer_admin',
  true
)
ON CONFLICT (auth_user_id) DO UPDATE SET
  organisation_id = EXCLUDED.organisation_id,
  email = EXCLUDED.email,
  full_name = EXCLUDED.full_name,
  role = EXCLUDED.role,
  is_active = EXCLUDED.is_active,
  updated_at = now();

INSERT INTO assets (
  id,
  organisation_id,
  name,
  url,
  type,
  description,
  is_active
)
VALUES (
  '33333333-3333-3333-3333-333333333333',
  '11111111-1111-1111-1111-111111111111',
  'Deque Mars Demo',
  'https://dequeuniversity.com/demo/mars/',
  'website',
  'Known accessibility issues — good for scanner smoke tests',
  true
)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  url = EXCLUDED.url,
  description = EXCLUDED.description,
  is_active = EXCLUDED.is_active,
  updated_at = now();
