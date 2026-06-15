import type { Database } from '@accessshield/db';
import { lookupUserClaimsByAuthId } from '@accessshield/db';
import type { AccessShieldJwtClaims } from '@accessshield/types';
import type { JWTPayload } from 'jose';

function isDbClaimsFallbackEnabled(): boolean {
  if (process.env.AUTH_DB_CLAIMS_FALLBACK === 'false') {
    return false;
  }
  return process.env.NODE_ENV !== 'production';
}

/**
 * Resolve AccessShield tenant claims from JWT app_metadata, with optional DB fallback in dev.
 */
export async function resolveAccessShieldClaims(
  payload: JWTPayload,
  db: Database,
): Promise<Pick<AccessShieldJwtClaims, 'user_role' | 'org_id'> | null> {
  const appMetadata = (payload.app_metadata ?? {}) as Record<string, unknown>;
  let userRole = appMetadata['user_role'] as AccessShieldJwtClaims['user_role'] | undefined;
  let orgId = appMetadata['org_id'] as string | undefined;

  if ((!userRole || !orgId) && isDbClaimsFallbackEnabled() && payload.sub) {
    const fromDb = await lookupUserClaimsByAuthId(db, payload.sub);
    if (fromDb) {
      userRole = userRole ?? fromDb.user_role;
      orgId = orgId ?? fromDb.org_id;
    }
  }

  if (!userRole || !orgId) {
    return null;
  }

  return { user_role: userRole, org_id: orgId };
}
