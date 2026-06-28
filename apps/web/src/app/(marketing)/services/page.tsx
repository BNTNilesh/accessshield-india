import { PricingToggleSection } from '@/components/marketing/pricing/PricingToggleSection';
import {
  PricingAuditAddonSection,
  PricingRegulatoryAddonsSection,
  PricingRemediationSection,
} from '@/components/marketing/pricing/PricingServicesSection';
import { WidgetComplianceDisclaimer } from '@/components/marketing/pricing/WidgetComplianceDisclaimer';
import { FAQSection } from '@/components/marketing/pricing/FAQSection';
import { MarketingVisual, ServicesIllustration } from '@/components/marketing/visuals';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Services & Pricing',
  description:
    'AccessShield India services — audit, remediation, and ongoing monitoring for one website. GST invoice on every payment.',
  openGraph: {
    title: 'Services & Pricing | AccessShield India',
    description: 'INR pricing for accessibility compliance — RPwD, SEBI, GIGW, and IS 17802.',
    type: 'website',
  },
  alternates: {
    canonical: 'https://accessshield.in/services',
  },
};

const servicesFaqs = [
  {
    question: 'Why is pricing based on one website?',
    answer:
      'Our self-serve plans (Widget Only, Compliance Shield, Regulatory Defense) each cover one website so we can deliver a full audit, remediation, and monitoring cycle with clear scope. Organisations with multiple sites or government deployments should contact sales for Enterprise pricing.',
  },
  {
    question: 'Why is the audit mandatory for monitoring plans?',
    answer:
      'Ongoing monitoring and badge renewal require a remediated, certified baseline. The Compliance Website Audit & Scan (₹49,999 one-time) establishes that baseline and is automatically added at checkout for Compliance Shield and Regulatory Defense. You can also purchase the audit standalone without a subscription.',
  },
  {
    question: 'Is the accessibility widget enough for compliance?',
    answer:
      'No. The widget improves user experience (font size, contrast, dyslexia-friendly fonts) but does not, by itself, certify RPwD, SEBI, or GIGW compliance. Full compliance requires a professional audit, code-level remediation, and documented evidence. Widget Only is for standalone UX enhancement on any site.',
  },
  {
    question: 'What is the SEBI accessibility deadline and who is affected?',
    answer:
      'SEBI issued a circular in 2024 requiring all listed companies to make their websites, mobile apps, and investor documents accessible by April 2026. Our SEBI assessment (₹79,999 one-time) is included once per year on Regulatory Defense, or available as a standalone add-on.',
  },
  {
    question: 'Does my startup need to comply with the RPwD Act 2016?',
    answer:
      'The RPwD Act 2016 applies to all government websites and services. Private companies are not universally mandated, but compliance is strongly recommended — especially for BFSI, healthcare, and government vendors. Our RPwD legal report (₹59,999) documents alignment for regulatory evidence.',
  },
  {
    question: 'Do you provide a GST invoice?',
    answer:
      'Yes. All prices on this page exclude 18% GST. We provide GST-compliant invoices (CGST 9% + SGST 9% intra-state, IGST 18% inter-state). Registered businesses may claim GST input tax credit on qualifying purchases.',
  },
  {
    question: 'Can I cancel anytime?',
    answer:
      'Yes. Cancel your subscription anytime from account settings with no cancellation fees. You retain access until the end of your billing period. One-time audit and remediation packages are non-refundable once work has started.',
  },
  {
    question: 'Is there a free option?',
    answer:
      'Yes. Sign up for a free Starter account — 1 website and 3 scans per month with basic WCAG reporting. Paid plans on this page add the widget, unlimited scans, remediation support, and regulatory reporting. A 14-day widget trial is available on Widget Only.',
  },
  {
    question: 'Do you support Hindi language content scanning?',
    answer:
      'Yes. AccessShield supports Hindi (Devanagari) and all 22 scheduled Indian languages — Unicode compliance, lang attributes, font rendering, and IS 17802 rules for non-English content.',
  },
  {
    question: "What's the difference between automated and manual audit?",
    answer:
      'Automated scanning catches 70–80% of WCAG issues. Our Compliance Website Audit & Scan (₹49,999) pairs automation with hands-on specialist review — keyboard testing, screen-reader validation, and a prioritized remediation roadmap. SEBI assessments add IAAP-certified sign-off for listed companies.',
  },
];

export default function ServicesPage() {
  return (
    <div className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_minmax(240px,400px)] lg:gap-16">
          <div className="text-center lg:text-left">
            <p className="text-sm font-semibold uppercase tracking-wide text-primary-600">
              Services &amp; Pricing
            </p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-text-primary sm:text-4xl lg:text-5xl">
              Everything you need to stay compliant
            </h1>
            <p className="mt-4 max-w-3xl text-lg leading-normal text-text-secondary lg:mx-0 mx-auto">
              Three building blocks for <strong>one website</strong>: a comprehensive audit,
              remediation sized to your site, and ongoing monitoring so you never fall out of
              compliance. Prices exclude 18% GST.
            </p>
          </div>

          <MarketingVisual
            label="Compliance audit and certification"
            className="mx-auto w-full max-w-md lg:max-w-none"
          >
            <ServicesIllustration />
          </MarketingVisual>
        </div>

        <div className="mt-16">
          <PricingToggleSection />
          <WidgetComplianceDisclaimer />
          <PricingRemediationSection />
          <PricingAuditAddonSection />
          <PricingRegulatoryAddonsSection />
        </div>

        <div className="mt-24">
          <FAQSection items={servicesFaqs} />
        </div>
      </div>
    </div>
  );
}
