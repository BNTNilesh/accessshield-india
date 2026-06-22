import { PricingToggleSection } from '@/components/marketing/pricing/PricingToggleSection';
import {
  PricingAuditSection,
  PricingRemediationSection,
} from '@/components/marketing/pricing/PricingServicesSection';
import { WidgetComplianceDisclaimer } from '@/components/marketing/pricing/WidgetComplianceDisclaimer';
import { FAQSection } from '@/components/marketing/pricing/FAQSection';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Services',
  description:
    'AccessShield India services — subscription plans, one-time audits, and remediation packages. GST invoice on every payment.',
  openGraph: {
    title: 'Services | AccessShield India',
    description: 'INR pricing for accessibility compliance — RPwD, SEBI, GIGW, and IS 17802.',
    type: 'website',
  },
  alternates: {
    canonical: 'https://accessshield.in/services',
  },
};

const servicesFaqs = [
  {
    question: 'Does my startup need to comply with the RPwD Act 2016?',
    answer:
      'The RPwD Act 2016 applies to all government websites and services. Private companies are not legally mandated, but compliance is highly recommended for inclusive design. If you have government contracts or serve public services, compliance may be required in your agreements.',
  },
  {
    question: 'What is the SEBI accessibility deadline and who is affected?',
    answer:
      'SEBI issued a circular in 2024 requiring all listed companies to make their websites, mobile apps, and investor documents accessible by April 2026. Non-compliance may result in penalties and regulatory scrutiny. Our SEBI assessment (₹79,999 one-time) or Enterprise plan includes annual reporting.',
  },
  {
    question: 'Is the accessibility widget enough for compliance?',
    answer:
      'No. The widget improves user experience (font size, contrast, text-to-speech) but does not, by itself, certify RPwD, SEBI, or GIGW compliance. Full compliance requires automated scanning, code-level remediation, and documented audit evidence. We offer standalone audit reports from ₹49,999.',
  },
  {
    question: 'Is IS 17802 the same as WCAG 2.1?',
    answer:
      "IS 17802 (BIS 2021) is India's national ICT accessibility standard. It adopts WCAG 2.1 Level AA as the base and adds India-specific rules like Hindi and regional languages, DD/MM/YYYY dates, and rupee formatting. AccessShield scans for both WCAG 2.2 and IS 17802.",
  },
  {
    question: 'Do you provide a GST invoice?',
    answer:
      'Yes. All prices on this page exclude 18% GST. We provide GST-compliant invoices (CGST 9% + SGST 9% intra-state, IGST 18% inter-state). Registered businesses may claim GST input tax credit on qualifying purchases.',
  },
  {
    question: 'Can I cancel anytime?',
    answer:
      'Yes, you can cancel your subscription at any time from account settings. There are no cancellation fees. You retain access until the end of your billing period. One-time audit and remediation packages are non-refundable once work has started.',
  },
  {
    question: "What happens if I exceed my plan's scan limit?",
    answer:
      'Starter includes 3 scans per month. The 14-day trial includes 5 scans on one asset with Professional features. After trial, upgrade to Professional for unlimited scans or stay on Starter (3 scans/month).',
  },
  {
    question: 'Do you support Hindi language content scanning?',
    answer:
      'Yes. AccessShield supports Hindi (Devanagari) and all 22 scheduled Indian languages — Unicode compliance, lang attributes, font rendering, and IS 17802 rules for non-English content.',
  },
  {
    question: "What's the difference between automated and manual audit?",
    answer:
      'Automated scanning (included in Starter and above) catches 70–80% of WCAG issues. Our standalone compliance audit (₹49,999) adds expert review and a remediation roadmap. SEBI assessments (₹79,999) include IAAP-certified sign-off for listed companies.',
  },
  {
    question: 'Do you offer a free trial?',
    answer:
      'Yes. Sign up for a 14-day Professional trial — no credit card required. You get 1 website and 5 scans with full Professional features including the accessibility widget. After 14 days, subscribe to Professional or Enterprise, or continue free on Starter (3 scans/month).',
  },
];

export default function ServicesPage() {
  return (
    <div className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-text-primary sm:text-4xl lg:text-5xl">
            Simple, transparent INR pricing
          </h1>
          <p className="mt-4 text-lg leading-normal text-text-secondary">
            Subscription plans, one-time audits, and remediation — built for RPwD, SEBI, and GIGW
            compliance. Prices exclude 18% GST.
          </p>
        </div>

        <PricingToggleSection />
        <WidgetComplianceDisclaimer />
        <PricingAuditSection />
        <PricingRemediationSection />

        <div className="mt-24">
          <FAQSection items={servicesFaqs} />
        </div>
      </div>
    </div>
  );
}
