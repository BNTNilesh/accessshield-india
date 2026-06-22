/** Plan-based resource limits for billing / usage endpoints */

/** Monthly subscription prices in paise — wire to Razorpay plan IDs when SKUs go live */
export const SUBSCRIPTION_PLAN_PRICES_PAISE: Record<string, { monthly: number; annual: number }> = {
  widget: { monthly: 249900, annual: 2499000 },
  professional: { monthly: 399900, annual: 3999000 },
  enterprise: { monthly: 1299900, annual: 12999000 },
};

export const PLAN_ASSET_LIMITS: Record<string, number | null> = {
  trial: 1,
  starter: 1,
  widget: 1,
  professional: 10,
  enterprise: null,
  government: null,
};

export const PLAN_SCAN_LIMITS: Record<string, number | null> = {
  trial: 5,
  starter: 3,
  widget: 0,
  professional: null,
  enterprise: null,
  government: null,
};

/** Feature flags by plan — enforced in middleware / UI where applicable */
export const PLAN_FEATURES: Record<
  string,
  { aiRemediation: boolean; sebiReport: boolean; widgetSdk: boolean }
> = {
  trial: { aiRemediation: true, sebiReport: false, widgetSdk: true },
  starter: { aiRemediation: false, sebiReport: false, widgetSdk: false },
  widget: { aiRemediation: false, sebiReport: false, widgetSdk: true },
  professional: { aiRemediation: true, sebiReport: false, widgetSdk: true },
  enterprise: { aiRemediation: true, sebiReport: true, widgetSdk: true },
  government: { aiRemediation: true, sebiReport: true, widgetSdk: true },
};

export function isScanLimitDisabled(): boolean {
  if (process.env.SCAN_LIMIT_DISABLED === 'true') {
    return true;
  }
  return process.env.NODE_ENV !== 'production';
}

export function getAssetLimit(planTier: string): number | null {
  return PLAN_ASSET_LIMITS[planTier] ?? PLAN_ASSET_LIMITS.starter ?? 1;
}

export function getScanLimit(planTier: string): number | null {
  return PLAN_SCAN_LIMITS[planTier] ?? PLAN_SCAN_LIMITS.starter ?? 3;
}

export function getPlanFeatures(planTier: string) {
  return PLAN_FEATURES[planTier] ?? PLAN_FEATURES.starter;
}
