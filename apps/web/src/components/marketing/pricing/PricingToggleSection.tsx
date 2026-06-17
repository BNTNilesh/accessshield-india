'use client';

import { useState } from 'react';
import { ButtonAnchor, ButtonLink } from '@/components/marketing/ButtonLink';

type BillingPeriod = 'monthly' | 'annual';

interface PlanFeature {
  text: string;
  included: boolean;
}

interface Plan {
  name: string;
  description: string;
  monthlyPrice: number;
  annualPrice: number;
  popular?: boolean;
  features: PlanFeature[];
  cta: {
    text: string;
    href: string;
  };
}

export function PricingToggleSection() {
  const [billingPeriod, setBillingPeriod] = useState<BillingPeriod>('monthly');

  const plans: Plan[] = [
    {
      name: 'Starter',
      description: 'Perfect for small projects and personal websites',
      monthlyPrice: 0,
      annualPrice: 0,
      features: [
        { text: '1 website', included: true },
        { text: '3 scans per month', included: true },
        { text: 'WCAG 2.2 AA + IS 17802', included: true },
        { text: 'Basic violation reporting', included: true },
        { text: 'Email support', included: true },
        { text: 'AI fix suggestions', included: false },
        { text: 'Widget SDK', included: false },
        { text: 'SEBI compliance report', included: false },
      ],
      cta: {
        text: 'Start free trial',
        href: '/waitlist',
      },
    },
    {
      name: 'Professional',
      description: 'For growing teams and mid-market companies',
      monthlyPrice: 3999,
      annualPrice: 39990,
      popular: true,
      features: [
        { text: 'Up to 10 websites', included: true },
        { text: 'Unlimited scans', included: true },
        { text: 'WCAG 2.2 AA + IS 17802 + GIGW', included: true },
        { text: 'Detailed violation reports', included: true },
        { text: 'Priority email + chat support', included: true },
        { text: 'AI fix suggestions', included: true },
        { text: 'Widget SDK', included: true },
        { text: 'SEBI compliance report', included: false },
      ],
      cta: {
        text: 'Start free trial',
        href: '/waitlist',
      },
    },
    {
      name: 'Enterprise',
      description: 'For large organizations and listed companies',
      monthlyPrice: 14999,
      annualPrice: 149990,
      features: [
        { text: 'Unlimited websites', included: true },
        { text: 'Unlimited scans', included: true },
        { text: 'All standards + custom rules', included: true },
        { text: 'White-label reports', included: true },
        { text: 'Dedicated account manager', included: true },
        { text: 'AI fix suggestions', included: true },
        { text: 'Widget SDK + custom branding', included: true },
        { text: 'SEBI compliance report', included: true },
      ],
      cta: {
        text: 'Contact sales',
        href: process.env.NEXT_PUBLIC_CALENDLY_URL || '#',
      },
    },
  ];

  const formatPrice = (paise: number, period: BillingPeriod) => {
    if (paise === 0) return 'Free';
    const amount = paise / 100;
    const formatted = new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);

    const suffix = period === 'annual' ? '/year' : '/month';
    return `${formatted}${suffix}`;
  };

  return (
    <div className="mt-16">
      <div className="flex justify-center">
        <div
          role="group"
          aria-label="Billing period"
          className="inline-flex rounded-lg border border-gray-300 bg-white p-1 shadow-sm"
        >
          <button
            type="button"
            onClick={() => setBillingPeriod('monthly')}
            aria-pressed={billingPeriod === 'monthly'}
            className={`rounded-md px-6 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 focus-visible:ring-offset-2 ${
              billingPeriod === 'monthly'
                ? 'bg-primary-600 text-white'
                : 'text-text-secondary hover:bg-gray-100'
            }`}
          >
            Monthly
          </button>
          <button
            type="button"
            onClick={() => setBillingPeriod('annual')}
            aria-pressed={billingPeriod === 'annual'}
            className={`rounded-md px-6 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 focus-visible:ring-offset-2 ${
              billingPeriod === 'annual'
                ? 'bg-primary-600 text-white'
                : 'text-text-secondary hover:bg-gray-100'
            }`}
          >
            Annual
            <span className="ml-1.5 text-xs">(Save 17%)</span>
          </button>
        </div>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-3">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`relative rounded-lg border bg-white p-8 shadow-sm ${
              plan.popular ? 'border-primary-600 border-2 shadow-lg' : 'border-gray-200'
            }`}
          >
            {plan.popular && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                <span className="inline-flex rounded-full bg-primary-600 px-4 py-1 text-sm font-semibold text-white">
                  Most popular
                </span>
              </div>
            )}

            <div className="text-center">
              <h3 className="text-2xl font-bold text-text-primary">{plan.name}</h3>
              <p className="mt-2 text-sm leading-normal text-text-secondary">{plan.description}</p>

              <div className="mt-6">
                <div className="text-4xl font-bold text-text-primary">
                  {formatPrice(
                    billingPeriod === 'monthly' ? plan.monthlyPrice : plan.annualPrice,
                    billingPeriod,
                  )}
                </div>
                {plan.monthlyPrice > 0 && billingPeriod === 'annual' && (
                  <div className="mt-1 text-sm text-text-tertiary">
                    {formatPrice(plan.annualPrice / 12, 'monthly')} billed annually
                  </div>
                )}
              </div>

              {plan.cta.href.startsWith('http') ? (
                <ButtonAnchor
                  href={plan.cta.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  size="lg"
                  variant={plan.popular ? 'primary' : 'secondary'}
                  className="mt-8 w-full"
                >
                  {plan.cta.text}
                </ButtonAnchor>
              ) : (
                <ButtonLink
                  href={plan.cta.href}
                  size="lg"
                  variant={plan.popular ? 'primary' : 'secondary'}
                  className="mt-8 w-full"
                >
                  {plan.cta.text}
                </ButtonLink>
              )}
            </div>

            <ul className="mt-8 space-y-3" role="list">
              {plan.features.map((feature, i) => (
                <li key={i} className="flex items-start gap-3">
                  {feature.included ? (
                    <svg
                      className="mt-0.5 h-5 w-5 shrink-0 text-green-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="mt-0.5 h-5 w-5 shrink-0 text-gray-300"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  )}
                  <span
                    className={`text-sm leading-normal ${
                      feature.included ? 'text-text-primary' : 'text-text-tertiary'
                    }`}
                  >
                    {feature.text}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
