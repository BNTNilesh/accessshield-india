import type { AccessShieldJwtClaims } from '@accessshield/types';
import { createRemoteJWKSet, jwtVerify } from 'jose';
import type { NextFunction, Request, Response } from 'express';
import { sendProblem } from '../lib/problem-details';

declare global {
  namespace Express {
    interface Request {
      user?: AccessShieldJwtClaims;
    }
  }
}

export function createAuthMiddleware(supabaseUrl: string) {
  const jwks = createRemoteJWKSet(new URL(`${supabaseUrl}/auth/v1/.well-known/jwks.json`));

  return async function authMiddleware(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith('Bearer ')) {
      sendProblem(res, 401, 'unauthorized', 'Authentication required', 'Missing Bearer token');
      return;
    }

    const token = authHeader.slice(7);

    try {
      const { payload } = await jwtVerify(token, jwks, {
        issuer: `${supabaseUrl}/auth/v1`,
      });

      const appMetadata = (payload.app_metadata ?? {}) as Record<string, unknown>;
      const userRole = appMetadata['user_role'] as AccessShieldJwtClaims['user_role'] | undefined;
      const orgId = appMetadata['org_id'] as string | undefined;

      if (!userRole || !orgId) {
        sendProblem(
          res,
          403,
          'forbidden',
          'Missing required claims',
          'JWT must include user_role and org_id in app_metadata',
        );
        return;
      }

      req.user = {
        sub: payload.sub!,
        email: payload.email as string,
        user_role: userRole,
        org_id: orgId,
        iat: payload.iat,
        exp: payload.exp,
      };

      next();
    } catch {
      sendProblem(res, 401, 'unauthorized', 'Invalid token', 'JWT verification failed');
    }
  };
}
