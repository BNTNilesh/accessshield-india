import { logger } from './logger';

const AI_SERVICE_URL = (process.env.AI_SERVICE_URL ?? 'http://localhost:8001').replace(/\/$/, '');
const INTERNAL_AI_KEY = process.env.INTERNAL_AI_SERVICE_KEY ?? '';

export interface AiFixRequestBody {
  rule_id: string;
  element_html: string;
  wcag_criterion: string;
  standard: string;
  page_context: string;
  violation_id: string;
}

export interface AiFixResponseBody {
  fix_html: string;
  explanation: string;
  aria_fix?: Record<string, string>;
  before_after?: { before?: string; after?: string };
  is_quick_win?: boolean;
  cached?: boolean;
}

export interface AiAltTextRequestBody {
  image_url: string;
  page_context: string;
  element_html: string;
  page_lang?: string;
  asset_id: string;
  violation_id: string;
}

export interface AiAltTextResponseBody {
  alt_text: string;
  confidence?: string;
  cached?: boolean;
}

function aiHeaders(orgId: string, planTier: string): Record<string, string> {
  return {
    'Content-Type': 'application/json',
    'X-Internal-Key': INTERNAL_AI_KEY,
    'X-Org-Id': orgId,
    'X-Org-Plan': planTier,
  };
}

export async function requestAiFix(
  body: AiFixRequestBody,
  orgId: string,
  planTier: string,
): Promise<AiFixResponseBody> {
  if (!INTERNAL_AI_KEY) {
    throw new Error('AI service is not configured (INTERNAL_AI_SERVICE_KEY missing)');
  }

  const response = await fetch(`${AI_SERVICE_URL}/ai/fix`, {
    method: 'POST',
    headers: aiHeaders(orgId, planTier),
    body: JSON.stringify(body),
    signal: AbortSignal.timeout(60_000),
  });

  if (!response.ok) {
    const detail = await response.json().catch(() => null);
    const message =
      (detail && typeof detail === 'object' && 'detail' in detail && String(detail.detail)) ||
      (detail && typeof detail === 'object' && 'title' in detail && String(detail.title)) ||
      `AI service error (${response.status})`;
    logger.error({ status: response.status, message, orgId }, 'AI fix request failed');
    throw new Error(message);
  }

  return (await response.json()) as AiFixResponseBody;
}

export async function requestAiAltText(
  body: AiAltTextRequestBody,
  orgId: string,
  planTier: string,
): Promise<AiAltTextResponseBody> {
  if (!INTERNAL_AI_KEY) {
    throw new Error('AI service is not configured (INTERNAL_AI_SERVICE_KEY missing)');
  }

  const response = await fetch(`${AI_SERVICE_URL}/ai/alt-text`, {
    method: 'POST',
    headers: aiHeaders(orgId, planTier),
    body: JSON.stringify(body),
    signal: AbortSignal.timeout(60_000),
  });

  if (!response.ok) {
    const detail = await response.text().catch(() => '');
    logger.error({ status: response.status, detail, orgId }, 'AI alt-text request failed');
    throw new Error('AI alt-text generation failed');
  }

  return (await response.json()) as AiAltTextResponseBody;
}
