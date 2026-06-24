'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ButtonAnchor, ButtonLink } from '@/components/marketing/ButtonLink';
import {
  auditCheckoutSubline,
  formatSubscriptionPrice,
  PRICING_CATALOG,
  SUBSCRIPTION_PLANS,
  type BillingPeriod,
  type SubscriptionPlan,
} from '@/lib/pricing/catalog';

function PlanBadges({ plan }: { plan: SubscriptionPlan }) {
  return (
    <div className="mb-3 flex flex-wrap justify-center gap-2">
      {plan.badge && (
        <span className="inline-flex rounded-full bg-primary-100 px-3 py-0.5 text-xs font-semibold text-primary-700">
          {plan.badge}
        </span>
      )}
      {plan.remediationRequired && (
        <span className="inline-flex rounded-full bg-accent-100 px-3 py-0.5 text-xs font-semibold text-accent-700">
          Remediation required
        </span>
      )}
    </div>
  );
}

export function PricingToggleSection() {
  const [billingPeriod, setBillingPeriod] = useState<BillingPeriod>('monthly');

  const salesHref = (href: string) => href.startsWith('http');

  return (
    <div className="mt-12">
      <div className="text-center">
        <p className="text-sm font-semibold uppercase tracking-wide text-primary-600">Step 01</p>
        <h2 className="mt-2 text-2xl font-bold text-text-primary sm:text-3xl">
          Pick your monthly plan
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-base leading-normal text-text-secondary">
          Stay protected after remediation with continuous monitoring — or add the accessibility
          widget on its own. All plans cover <strong>one website</strong>. Prices exclude 18% GST.
          Annual billing saves ~17% (pay for 10 months, get 12).
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
        {SUBSCRIPTION_PLANS.map((plan) => (
          <div
            key={plan.id}
            className={`relative flex flex-col rounded-lg border bg-white p-6 shadow-sm lg:p-8 ${
              plan.popular ? 'border-primary-600 border-2 shadow-lg' : 'border-gray-200'
            }`}
          >
            {plan.popular && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                <span className="inline-flex rounded-full bg-primary-600 px-4 py-1 text-sm font-semibold text-white">
                  Recommended
                </span>
              </div>
            )}

            <div className="text-center">
              <PlanBadges plan={plan} />
              <h3 className="text-2xl font-bold text-text-primary">{plan.name}</h3>
              <p className="mt-2 text-sm leading-normal text-text-secondary">{plan.description}</p>

              <div className="mt-6">
                <div className="text-4xl font-bold text-text-primary">
                  {formatSubscriptionPrice(
                    plan.monthlyPriceInr,
                    plan.annualPriceInr,
                    billingPeriod,
                  )}
                </div>
                {billingPeriod === 'annual' && (
                  <div className="mt-1 text-sm text-text-tertiary">
                    {formatSubscriptionPrice(
                      plan.annualPriceInr / 12,
                      plan.annualPriceInr,
                      'monthly',
                    )}{' '}
                    billed annually
                  </div>
                )}
                <p className="mt-1 text-xs text-text-tertiary">+ 18% GST</p>
              </div>

              {plan.auditRequired && (
                <p className="mt-4 text-xs leading-normal text-text-secondary">
                  {auditCheckoutSubline()}
                </p>
              )}

              {salesHref(plan.cta.href) ? (
                <ButtonAnchor
                  href={plan.cta.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  size="lg"
                  variant={plan.popular ? 'primary' : 'secondary'}
                  className="mt-6 w-full"
                >
                  {plan.cta.text}
                </ButtonAnchor>
              ) : (
                <ButtonLink
                  href={plan.cta.href}
                  size="lg"
                  variant={plan.popular ? 'primary' : 'secondary'}
                  className="mt-6 w-full"
                >
                  {plan.cta.text}
                </ButtonLink>
              )}
            </div>

            <ul className="mt-8 flex-1 space-y-3" role="list">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-start gap-3">
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
                  <span className="text-sm leading-normal text-text-primary">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <aside
        className="mx-auto mt-10 max-w-3xl rounded-lg border border-gray-200 bg-bg-secondary p-6 text-sm leading-normal text-text-secondary"
        aria-label="Which plan fits you"
      >
        <h3 className="text-base font-semibold text-text-primary">Which plan fits you?</h3>
        <p className="mt-2">
          The <strong>Widget Only</strong> plan (₹
          {PRICING_CATALOG.subscriptions.widget.monthlyPriceInr.toLocaleString('en-IN')}/mo) is a
          standalone product — install it on any website to add accessibility controls instantly, no
          audit or remediation required.
        </p>
        <p className="mt-2">
          <strong>Compliance Shield</strong> and <strong>Regulatory Defense</strong> are reserved
          for clients who have completed a full audit and remediation through us, since ongoing
          monitoring and badge renewal require a remediated, certified site as a baseline.
        </p>
      </aside>

      <p className="mt-8 text-center text-sm text-text-secondary">
        Need multiple websites or a government deployment?{' '}
        <Link
          href="/contact?plan=enterprise"
          className="font-medium text-primary-600 underline hover:text-primary-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 focus-visible:ring-offset-2"
        >
          Contact sales for Enterprise
        </Link>
      </p>
    </div>
  );
}
