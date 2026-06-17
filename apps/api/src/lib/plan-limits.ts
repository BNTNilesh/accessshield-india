/** Plan-based resource limits for billing / usage endpoints */

export const PLAN_ASSET_LIMITS: Record<string, number | null> = {
  starter: 1,
  professional: 10,
  enterprise: null,
  government: null,
};

export const PLAN_SCAN_LIMITS: Record<string, number | null> = {
  starter: 3,
  professional: null,
  enterprise: null,
  government: null,
};

export function isScanLimitDisabled(): boolean {
  if (process.env.SCAN_LIMIT_DISABLED === 'true') {
    return true;
  }
  return process.env.NODE_ENV !== 'production';
}
