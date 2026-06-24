import { headers } from 'next/headers';
import type { UserRole } from '@accessshield/types';
import { parseAccessShieldClaims } from '@/lib/auth/claims';
import { createClient } from '@/lib/supabase/server';

/** Role forwarded by middleware — fast path for dashboard RSC. */
export function getDashboardRole(): UserRole | undefined {
  const role = headers().get('x-user-role');
  if (!role) return undefined;
  return role as UserRole;
}

export function getDashboardOrgId(): string | undefined {
  return headers().get('x-org-id') ?? undefined;
}

/**
 * Authoritative role for gated routes (e.g. platform admin).
 * Uses getUser() so app_metadata updates apply before JWT refresh.
 */
export async function getServerDashboardRole(): Promise<UserRole | undefined> {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return undefined;
  }

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const { user_role } = parseAccessShieldClaims(
    session?.access_token,
    user.app_metadata as Record<string, unknown>,
  );

  return user_role;
}
