import { headers } from 'next/headers';
import type { UserRole } from '@accessshield/types';

/** Role forwarded by middleware — avoids a second Supabase getSession in dashboard RSC. */
export function getDashboardRole(): UserRole | undefined {
  const role = headers().get('x-user-role');
  if (!role) return undefined;
  return role as UserRole;
}

export function getDashboardOrgId(): string | undefined {
  return headers().get('x-org-id') ?? undefined;
}
