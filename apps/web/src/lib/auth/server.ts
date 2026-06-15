import type { User } from '@supabase/supabase-js';
import type { AccessShieldJwtClaims } from '@accessshield/types';
import { createClient } from '@/lib/supabase/server';
import { parseAccessShieldClaims, toAccessShieldClaims } from './claims';
import { lookupClaimsFromDatabase } from './db-claims';

export interface ServerAuthContext {
  user: User;
  claims: Partial<AccessShieldJwtClaims>;
  hasRequiredClaims: boolean;
  /** Where tenant claims were resolved from */
  claimsSource: 'jwt' | 'database' | 'none';
}

/**
 * Load the authenticated user and AccessShield tenant claims for Server Components.
 */
export async function getServerAuthContext(): Promise<ServerAuthContext | null> {
  const supabase = createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return null;
  }

  const {
    data: { session },
  } = await supabase.auth.getSession();

  let parsed = parseAccessShieldClaims(
    session?.access_token,
    user.app_metadata as Record<string, unknown>,
  );

  let claimsSource: ServerAuthContext['claimsSource'] =
    parsed.user_role && parsed.org_id ? 'jwt' : 'none';

  if (!parsed.user_role || !parsed.org_id) {
    const fromDb = await lookupClaimsFromDatabase(user.id);
    if (fromDb) {
      parsed = {
        user_role: parsed.user_role ?? fromDb.user_role,
        org_id: parsed.org_id ?? fromDb.org_id,
      };
      if (parsed.user_role && parsed.org_id) {
        claimsSource = 'database';
      }
    }
  }

  const claims = toAccessShieldClaims(parsed, user.id, user.email ?? '');

  return {
    user,
    claims,
    hasRequiredClaims: Boolean(claims.user_role && claims.org_id),
    claimsSource,
  };
}
