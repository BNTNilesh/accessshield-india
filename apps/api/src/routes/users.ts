/**
 * Team / users API — list org members and invite (stub).
 */

import type { Database } from '@accessshield/db';
import { users } from '@accessshield/db';
import type { ApiResponse } from '@accessshield/types';
import { asc, eq } from 'drizzle-orm';
import type { NextFunction, Request, Response, Router as ExpressRouter } from 'express';
import { Router } from 'express';
import { z } from 'zod';
import { sendProblem } from '../lib/problem-details';
import { requireRoles } from '../middleware/rbac';

const inviteUserSchema = z.object({
  email: z.string().email(),
  role: z.enum(['customer_admin', 'accessibility_officer', 'developer', 'auditor']),
  fullName: z.string().min(1).max(255).optional(),
});

export function createUsersRouter(db: Database): ExpressRouter {
  const router = Router();

  router.get(
    '/',
    requireRoles('auditor', 'developer', 'accessibility_officer', 'customer_admin'),
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      try {
        const orgId = req.user!.org_id;

        const rows = await db
          .select({
            id: users.id,
            organisationId: users.organisationId,
            authUserId: users.authUserId,
            email: users.email,
            fullName: users.fullName,
            role: users.role,
            isActive: users.isActive,
            mfaEnabled: users.mfaEnabled,
            lastLoginAt: users.lastLoginAt,
            createdAt: users.createdAt,
            updatedAt: users.updatedAt,
          })
          .from(users)
          .where(eq(users.organisationId, orgId))
          .orderBy(asc(users.createdAt));

        const response: ApiResponse<typeof rows> = {
          data: rows,
          timestamp: new Date().toISOString(),
        };

        res.json(response);
      } catch (err) {
        next(err);
      }
    },
  );

  router.post(
    '/invite',
    requireRoles('customer_admin'),
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      try {
        const parseResult = inviteUserSchema.safeParse(req.body);
        if (!parseResult.success) {
          sendProblem(res, 400, 'validation-error', 'Invalid request body', undefined, {
            errors: parseResult.error.flatten().fieldErrors,
          });
          return;
        }

        // Email invite flow (Supabase + Resend) not wired in local dev yet.
        sendProblem(
          res,
          501,
          'not-implemented',
          'User invites are not available yet',
          'Email invitation service will be enabled in a future release',
        );
      } catch (err) {
        next(err);
      }
    },
  );

  return router;
}
