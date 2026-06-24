/** Single source of truth for marketing /services pricing (INR, excl. GST). */

export type BillingPeriod = 'monthly' | 'annual';

export interface SubscriptionPlan {
  id: string;
  name: string;
  description: string;
  monthlyPriceInr: number;
  annualPriceInr: number;
  badge?: string;
  popular?: boolean;
  remediationRequired?: boolean;
  auditRequired?: boolean;
  features: string[];
  cta: { text: string; href: string };
}

export interface OneTimeSku {
  id: string;
  name: string;
  subtitle: string;
  priceInr: number;
  priceNote?: string;
  features: string[];
  popular?: boolean;
  highlighted?: boolean;
  cta: { text: string; href: string };
}

export const PRICING_CATALOG = {
  subscriptions: {
    widget: {
      id: 'widget',
      name: 'Widget Only',
      description: 'Standalone — works on any website. No audit or remediation required.',
      monthlyPriceInr: 2499,
      annualPriceInr: 24990,
      badge: 'No audit required',
      features: [
        '1 website',
        '14-day free trial — cancel anytime',
        'Accessibility widget SDK on your site',
        'Font size, contrast & dyslexia tools',
        'Hindi + English widget UI',
        'Keyboard navigation enhancements',
        'Widget updates & uptime monitoring',
      ],
      cta: { text: 'Get started', href: '/signup?plan=widget' },
    },
    complianceShield: {
      id: 'compliance_shield',
      name: 'Compliance Shield',
      description: 'Ongoing monitoring after remediation — stay compliant on one website.',
      monthlyPriceInr: 12499,
      annualPriceInr: 124990,
      remediationRequired: true,
      auditRequired: true,
      features: [
        '1 website',
        'Everything in Widget Only',
        'Unlimited WCAG 2.2 + IS 17802 scans',
        'Annual compliance assessment report',
        'Manual accessibility spot-check',
        'Same-week fix implementation',
        'Priority support & badge renewal',
        'GST-compliant invoicing',
      ],
      cta: { text: 'Get started', href: '/contact?plan=compliance-shield' },
    },
    regulatoryDefense: {
      id: 'regulatory_defense',
      name: 'Regulatory Defense',
      description: 'For listed companies, BFSI, and government-facing organisations.',
      monthlyPriceInr: 16999,
      annualPriceInr: 169990,
      badge: 'Recommended',
      popular: true,
      remediationRequired: true,
      auditRequired: true,
      features: [
        '1 website',
        'Everything in Compliance Shield',
        'SEBI report (1/year included)',
        'RPwD legal evidence package',
        '72-hour triage support',
        'Technical evidence for regulatory queries',
        'Claim-by-claim response assistance',
        'Legal referral network',
      ],
      cta: { text: 'Get started', href: '/contact?plan=regulatory-defense' },
    },
  },
  oneTime: {
    audit: {
      id: 'audit',
      name: 'Compliance Website Audit & Scan',
      subtitle: 'Add-on · standalone or bundled with monitoring',
      priceInr: 49999,
      highlighted: true,
      features: [
        'WCAG 2.2 AA + IS 17802 automated scan',
        'Hands-on manual review by accessibility specialists',
        'Keyboard and screen-reader testing',
        'Severity-ranked findings report',
        'Prioritized remediation roadmap',
        'Required for Compliance Shield & Regulatory Defense',
        'Also available as a standalone purchase',
      ],
      cta: { text: 'Buy audit', href: '/contact?service=audit' },
    },
    remediation: [
      {
        id: 'remediation-starter',
        name: 'Brochure site',
        subtitle: '1–5 pages',
        priceInr: 75000,
        priceNote: 'Additional pages beyond 5 billed at ₹8,000/page',
        popular: true,
        features: [
          'Alt text and colour contrast fixes',
          'Heading structure and keyboard navigation',
          'Accessibility statement page',
          'Hand-off to ongoing monitoring',
        ],
        cta: { text: 'Buy now', href: '/contact?service=remediation-starter' },
      },
      {
        id: 'remediation-standard',
        name: 'Standard site',
        subtitle: '6–15 pages',
        priceInr: 150000,
        priceNote: 'Additional pages beyond 15 billed at ₹8,000/page',
        features: [
          'Form labelling and error handling',
          'Link descriptions and mobile accessibility',
          'ARIA landmark roles',
          'Template-level improvements',
        ],
        cta: { text: 'Buy now', href: '/contact?service=remediation-standard' },
      },
      {
        id: 'remediation-large',
        name: 'Larger site',
        subtitle: '16–30 pages',
        priceInr: 275000,
        priceNote: 'Additional pages beyond 30 billed at ₹8,000/page',
        features: [
          'Site-wide template remediation',
          'Video captions and focus management',
          'Full WCAG 2.2 AA remediation',
          'Re-scan and certification support',
        ],
        cta: { text: 'Buy now', href: '/contact?service=remediation-large' },
      },
      {
        id: 'remediation-ecom',
        name: 'E-commerce / booking',
        subtitle: 'Transaction sites · up to 55 pages',
        priceInr: 475000,
        priceNote: 'Additional pages beyond 55 billed at ₹8,000/page',
        features: [
          'Checkout flow accessibility',
          'Payment form compliance',
          'Highest-liability area focus',
          'Error prevention and recovery',
          'Accessibility statement page',
        ],
        cta: { text: 'Buy now', href: '/contact?service=remediation-ecom' },
      },
    ],
    regulatoryAddons: [
      {
        id: 'sebi',
        name: 'SEBI accessibility assessment',
        subtitle: 'For listed companies',
        priceInr: 79999,
        features: [
          'SEBI circular (2024) aligned assessment',
          'IAAP-certified professional sign-off',
          'Investor-facing accessibility documentation',
          'Included once per year on Regulatory Defense',
        ],
        cta: { text: 'Request SEBI assessment', href: '/contact?service=sebi' },
      },
      {
        id: 'rpwd',
        name: 'RPwD legal compliance report',
        subtitle: 'For BFSI and government-facing sites',
        priceInr: 59999,
        features: [
          'RPwD Act 2016 alignment report',
          'IS 17802 + WCAG 2.2 AA coverage',
          'Accessibility statement draft',
          'Regulatory evidence package',
        ],
        cta: { text: 'Request RPwD report', href: '/contact?service=rpwd' },
      },
    ],
  },
  rules: {
    maxWebsitesSelfServe: 1,
    auditRequiredFor: ['compliance_shield', 'regulatory_defense'] as const,
    auditPriceInr: 49999,
    gstRate: 0.18,
  },
} as const;

export const SUBSCRIPTION_PLANS = Object.values(PRICING_CATALOG.subscriptions);

/** Format INR for display (rupees, not paise). */
export function formatInr(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}

/** Format subscription price with billing period suffix. */
export function formatSubscriptionPrice(
  monthlyPriceInr: number,
  annualPriceInr: number,
  period: BillingPeriod,
): string {
  const amount = period === 'monthly' ? monthlyPriceInr : annualPriceInr;
  const formatted = formatInr(amount);
  const suffix = period === 'annual' ? '/year' : '/month';
  return `${formatted}${suffix}`;
}

/** Audit subline for monitoring plans (checkout copy — marketing only for now). */
export function auditCheckoutSubline(): string {
  return `Compliance Website Audit & Scan (${formatInr(PRICING_CATALOG.rules.auditPriceInr)}) is automatically added to your price at checkout.`;
}
