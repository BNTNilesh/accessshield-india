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
      description: 'Always free — one microsite and basic scanning',
      monthlyPrice: 0,
      annualPrice: 0,
      features: [
        { text: '1 website', included: true },
        { text: '3 scans per month', included: true },
        { text: 'WCAG 2.2 AA + IS 17802', included: true },
        { text: 'Basic violation reporting', included: true },
        { text: 'Email support', included: true },
        { text: 'Accessibility widget SDK', included: false },
        { text: 'AI fix suggestions', included: false },
        { text: 'SEBI compliance report', included: false },
      ],
      cta: {
        text: 'Get started free',
        href: '/signup',
      },
    },
    {
      name: 'Professional',
      description: 'Scanning, AI fixes, and accessibility widget for growing teams',
      monthlyPrice: 3999,
      annualPrice: 39990,
      popular: true,
      features: [
        { text: 'Up to 10 websites', included: true },
        { text: 'Unlimited compliance scans', included: true },
        { text: 'WCAG 2.2 AA + IS 17802 + GIGW', included: true },
        { text: 'Accessibility widget SDK included', included: true },
        { text: 'Hindi + English widget UI', included: true },
        { text: 'Font size, contrast & dyslexia tools', included: true },
        { text: 'AI fix suggestions', included: true },
        { text: 'Priority email + chat support', included: true },
        { text: 'SEBI compliance report', included: false },
      ],
      cta: {
        text: 'Start 14-day trial',
        href: '/signup',
      },
    },
    {
      name: 'Enterprise',
      description: 'Listed companies, BFSI, and large organisations',
      monthlyPrice: 12999,
      annualPrice: 129990,
      features: [
        { text: 'Unlimited websites', included: true },
        { text: 'Unlimited scans', included: true },
        { text: 'All standards + custom rules', included: true },
        { text: 'Widget SDK + custom branding', included: true },
        { text: 'White-label reports', included: true },
        { text: 'Dedicated account manager', included: true },
        { text: 'AI fix suggestions', included: true },
        { text: 'SEBI report (1/year included)', included: true },
        { text: 'GIGW 3.0 + RPwD legal reporting', included: true },
      ],
      cta: {
        text: 'Contact sales',
        href: process.env.NEXT_PUBLIC_CALENDLY_URL || '/contact?plan=enterprise',
      },
    },
  ];

  const formatPrice = (rupees: number, period: BillingPeriod) => {
    if (rupees === 0) return 'Free';
    const formatted = new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(rupees);

    const suffix = period === 'annual' ? '/year' : '/month';
    return `${formatted}${suffix}`;
  };

  const salesHref = (href: string) => href.startsWith('http');

  return (
    <div className="mt-12">
      <div className="text-center">
        <p className="text-sm font-semibold uppercase tracking-wide text-primary-600">Step 01</p>
        <h2 className="mt-2 text-2xl font-bold text-text-primary sm:text-3xl">
          Pick your monthly plan
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-base leading-normal text-text-secondary">
          All subscription prices exclude 18% GST. Annual billing saves ~17% (pay for 10 months, get
          12).
        </p>
      </div>

      <div className="mt-8 flex justify-center">
        <div
          role="group"
          aria-label="Billing period"
          className="inline-flex rounded-lg border border-gray-300 bg-white p-1 shadow-sm"
        >
          <button
            type="button"
            onClick={() => setBillingPeriod('monthly')}
            aria-pressed={billingPeriod === 'monthly'}
            className={`rounded-md px-6 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1A56A0] focus-visible:ring-offset-2 ${
              billingPeriod === 'monthly'
                ? 'border-2 border-[#1A3A5C] bg-[#1A56A0] text-white shadow-sm'
                : 'border-2 border-transparent bg-white text-text-secondary hover:bg-gray-100'
            }`}
          >
            Monthly
          </button>
          <button
            type="button"
            onClick={() => setBillingPeriod('annual')}
            aria-pressed={billingPeriod === 'annual'}
            className={`rounded-md px-6 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1A56A0] focus-visible:ring-offset-2 ${
              billingPeriod === 'annual'
                ? 'border-2 border-[#1A3A5C] bg-[#1A56A0] text-white shadow-sm'
                : 'border-2 border-transparent bg-white text-text-secondary hover:bg-gray-100'
            }`}
          >
            Annual
            <span className="ml-1.5 text-xs">(Save 17%)</span>
          </button>
        </div>
      </div>

      <div className="mt-12 grid grid-cols-1 items-stretch gap-6 lg:grid-cols-3 lg:gap-8">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`relative flex flex-col rounded-lg border bg-white p-6 shadow-sm lg:p-8 ${
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
                {plan.monthlyPrice > 0 && (
                  <p className="mt-1 text-xs text-text-tertiary">+ 18% GST</p>
                )}
              </div>

              {salesHref(plan.cta.href) ? (
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

            <ul className="mt-8 flex-1 space-y-3" role="list">
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
