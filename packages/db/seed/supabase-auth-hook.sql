-- Run in Supabase Dashboard → SQL Editor (hosted project)
-- Injects user_role + org_id into JWT from public.users on every login.
-- Requires matching seed row in public.users (see dev.sql or supabase-seed.sql).

CREATE OR REPLACE FUNCTION public.custom_access_token_hook(event jsonb)
RETURNS jsonb
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  claims jsonb;
  user_role text;
  org_id text;
BEGIN
  SELECT u.role::text, u.organisation_id::text
  INTO user_role, org_id
  FROM public.users u
  WHERE u.auth_user_id = (event->>'user_id')::uuid
    AND u.is_active = true
  LIMIT 1;

  claims := event->'claims';

  IF user_role IS NOT NULL AND org_id IS NOT NULL THEN
    claims := jsonb_set(claims, '{app_metadata,user_role}', to_jsonb(user_role));
    claims := jsonb_set(claims, '{app_metadata,org_id}', to_jsonb(org_id));
  END IF;

  event := jsonb_set(event, '{claims}', claims);
  RETURN event;
END;
$$;

-- Grant hook execution to Supabase Auth (required for custom access token hook)
GRANT USAGE ON SCHEMA public TO supabase_auth_admin;
GRANT EXECUTE ON FUNCTION public.custom_access_token_hook TO supabase_auth_admin;
REVOKE EXECUTE ON FUNCTION public.custom_access_token_hook FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.custom_access_token_hook TO postgres;

-- Enable in Dashboard: Authentication → Hooks → Custom Access Token → custom_access_token_hook
