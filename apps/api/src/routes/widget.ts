/**
 * Accessibility widget settings API.
 */

import { createHash, randomBytes } from 'node:crypto';
import type { Database } from '@accessshield/db';
import { widgetPreferences } from '@accessshield/db';
import type { ApiResponse } from '@accessshield/types';
import { and, eq, isNull } from 'drizzle-orm';
import type { NextFunction, Request, Response, Router as ExpressRouter } from 'express';
import { Router } from 'express';
import type { Redis } from 'ioredis';
import { z } from 'zod';
import { sendProblem } from '../lib/problem-details';
import { requireRoles } from '../middleware/rbac';

const POSITIONS = ['bottom-right', 'bottom-left', 'top-right', 'top-left'] as const;
const LANGUAGES = ['en', 'hi'] as const;

interface WidgetSettingsResponse {
  id: string;
  organisationId: string;
  token: string;
  allowedDomains: string[];
  position: (typeof POSITIONS)[number];
  defaultLanguage: (typeof LANGUAGES)[number];
  primaryColor: string;
  isEnabled: boolean;
  createdAt: string;
  updatedAt: string;
}

function tokenKey(orgId: string): string {
  return `widget:token:${orgId}`;
}

function domainsKey(orgId: string): string {
  return `widget:domains:${orgId}`;
}

function deriveDefaultToken(orgId: string): string {
  const secret = process.env.JWT_SECRET ?? 'dev-widget-secret';
  return createHash('sha256').update(`${orgId}:${secret}`).digest('hex').slice(0, 32);
}

async function getOrCreateToken(redis: Redis, orgId: string): Promise<string> {
  const existing = await redis.get(tokenKey(orgId));
  if (existing) return existing;

  const token = deriveDefaultToken(orgId);
  await redis.set(tokenKey(orgId), token);
  return token;
}

async function getAllowedDomains(redis: Redis, orgId: string): Promise<string[]> {
  const raw = await redis.get(domainsKey(orgId));
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw) as unknown;
    return Array.isArray(parsed) ? (parsed as string[]) : [];
  } catch {
    return [];
  }
}

async function getOrCreatePrefs(db: Database, orgId: string) {
  const [existing] = await db
    .select()
    .from(widgetPreferences)
    .where(and(eq(widgetPreferences.organisationId, orgId), isNull(widgetPreferences.assetId)))
    .limit(1);

  if (existing) return existing;

  const [created] = await db
    .insert(widgetPreferences)
    .values({
      organisationId: orgId,
      assetId: null,
    })
    .returning();

  if (!created) {
    throw new Error('Failed to create widget preferences');
  }

  return created;
}

function toResponse(
  prefs: typeof widgetPreferences.$inferSelect,
  token: string,
  allowedDomains: string[],
): WidgetSettingsResponse {
  const position = POSITIONS.includes(prefs.position as (typeof POSITIONS)[number])
    ? (prefs.position as (typeof POSITIONS)[number])
    : 'bottom-right';

  const defaultLanguage = LANGUAGES.includes(prefs.language as (typeof LANGUAGES)[number])
    ? (prefs.language as (typeof LANGUAGES)[number])
    : 'en';

  return {
    id: prefs.id,
    organisationId: prefs.organisationId,
    token,
    allowedDomains,
    position,
    defaultLanguage,
    primaryColor: prefs.primaryColor,
    isEnabled: prefs.isEnabled,
    createdAt: prefs.createdAt,
    updatedAt: prefs.updatedAt,
  };
}

const updateWidgetSchema = z.object({
  allowedDomains: z.array(z.string().min(1).max(253)).optional(),
  position: z.enum(POSITIONS).optional(),
  defaultLanguage: z.enum(LANGUAGES).optional(),
  primaryColor: z
    .string()
    .regex(/^#[0-9A-Fa-f]{6}$/)
    .optional(),
  isEnabled: z.boolean().optional(),
});

export function createWidgetRouter(db: Database, redis: Redis): ExpressRouter {
  const router = Router();

  router.get(
    '/settings',
    requireRoles('auditor', 'developer', 'accessibility_officer', 'customer_admin'),
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      try {
        const orgId = req.user!.org_id;
        const [prefs, token, allowedDomains] = await Promise.all([
          getOrCreatePrefs(db, orgId),
          getOrCreateToken(redis, orgId),
          getAllowedDomains(redis, orgId),
        ]);

        const response: ApiResponse<WidgetSettingsResponse> = {
          data: toResponse(prefs, token, allowedDomains),
          timestamp: new Date().toISOString(),
        };

        res.json(response);
      } catch (err) {
        next(err);
      }
    },
  );

  router.patch(
    '/settings',
    requireRoles('customer_admin', 'accessibility_officer'),
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      try {
        const parseResult = updateWidgetSchema.safeParse(req.body);
        if (!parseResult.success) {
          sendProblem(res, 400, 'validation-error', 'Invalid request body', undefined, {
            errors: parseResult.error.flatten().fieldErrors,
          });
          return;
        }

        const orgId = req.user!.org_id;
        const { allowedDomains, position, defaultLanguage, primaryColor, isEnabled } =
          parseResult.data;

        if (allowedDomains !== undefined) {
          await redis.set(domainsKey(orgId), JSON.stringify(allowedDomains));
        }

        const prefs = await getOrCreatePrefs(db, orgId);

        const dbUpdates: Partial<typeof widgetPreferences.$inferInsert> = {
          updatedAt: new Date().toISOString(),
        };
        if (position !== undefined) dbUpdates.position = position;
        if (defaultLanguage !== undefined) dbUpdates.language = defaultLanguage;
        if (primaryColor !== undefined) dbUpdates.primaryColor = primaryColor;
        if (isEnabled !== undefined) dbUpdates.isEnabled = isEnabled;

        const [updated] = await db
          .update(widgetPreferences)
          .set(dbUpdates)
          .where(eq(widgetPreferences.id, prefs.id))
          .returning();

        const token = await getOrCreateToken(redis, orgId);
        const domains = await getAllowedDomains(redis, orgId);

        const response: ApiResponse<WidgetSettingsResponse> = {
          data: toResponse(updated ?? prefs, token, domains),
          timestamp: new Date().toISOString(),
        };

        res.json(response);
      } catch (err) {
        next(err);
      }
    },
  );

  router.post(
    '/regenerate-token',
    requireRoles('customer_admin'),
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      try {
        const orgId = req.user!.org_id;
        const newToken = randomBytes(16).toString('hex');
        await redis.set(tokenKey(orgId), newToken);

        const [prefs, allowedDomains] = await Promise.all([
          getOrCreatePrefs(db, orgId),
          getAllowedDomains(redis, orgId),
        ]);

        const response: ApiResponse<WidgetSettingsResponse> = {
          data: toResponse(prefs, newToken, allowedDomains),
          timestamp: new Date().toISOString(),
        };

        res.json(response);
      } catch (err) {
        next(err);
      }
    },
  );

  return router;
}
