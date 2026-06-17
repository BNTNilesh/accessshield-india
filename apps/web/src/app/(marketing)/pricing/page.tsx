import { PricingToggleSection } from '@/components/marketing/pricing/PricingToggleSection';
import { FAQSection } from '@/components/marketing/pricing/FAQSection';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pricing',
  description:
    'Simple, transparent INR pricing for AccessShield India. No hidden charges. GST invoice on every payment. Start with a free trial.',
  openGraph: {
    title: 'Pricing | AccessShield India',
    description: 'Simple, transparent INR pricing for accessibility compliance.',
    type: 'website',
  },
  alternates: {
    canonical: 'https://accessshield.in/pricing',
  },
};

const pricingFaqs = [
  {
    question: 'Does my startup need to comply with the RPwD Act 2016?',
    answer:
      'The RPwD Act 2016 applies to all government websites and services. Private companies are not legally mandated, but compliance is highly recommended for inclusive design and avoiding discrimination lawsuits. If you have government contracts or serve public services, compliance may be required in your agreements.',
  },
  {
    question: 'What is the SEBI accessibility deadline and who is affected?',
    answer:
      'SEBI issued a circular in 2024 requiring all listed companies to make their websites, mobile apps, and investor documents accessible by April 2026. This includes annual reports, investor presentations, and shareholder communications. Non-compliance may result in penalties and regulatory scrutiny.',
  },
  {
    question: 'Is IS 17802 the same as WCAG 2.1?',
    answer:
      "IS 17802 (BIS 2021) is India's national ICT accessibility standard. It adopts WCAG 2.1 Level AA as the base requirement and adds India-specific rules like support for Indian languages (Hindi, Bengali, Tamil, etc.), Indian date formats (DD/MM/YYYY), and rupee currency formatting. AccessShield scans for both WCAG and IS 17802 compliance.",
  },
  {
    question: 'Do you provide a GST invoice?',
    answer:
      'Yes, we provide GST-compliant invoices for all subscriptions. Our GSTIN is 29AABCA1234B1ZS (Bangalore, Karnataka). GST is calculated at 18% (CGST 9% + SGST 9% for intra-state, IGST 18% for inter-state). Invoices are auto-generated and emailed within 24 hours of payment.',
  },
  {
    question: 'Can I cancel anytime?',
    answer:
      'Yes, you can cancel your subscription at any time from your account settings. There are no cancellation fees or lock-in periods. If you cancel, you will retain access until the end of your current billing period. We do not offer pro-rata refunds for partial months.',
  },
  {
    question: "What happens if I exceed my plan's scan limit?",
    answer:
      'On the Starter plan, you have 3 scans per month. If you exceed this limit, you will be prompted to upgrade to Professional (unlimited scans). Professional and Enterprise plans have no scan limits. You can also purchase one-time scan credits if you need occasional extra scans without upgrading.',
  },
  {
    question: 'Do you support Hindi language content scanning?',
    answer:
      'Yes, AccessShield fully supports Hindi (Devanagari script) and all 22 scheduled Indian languages. Our scanner checks for Unicode compliance, proper lang attributes, correct font rendering, and accessibility of non-English content per IS 17802 requirements.',
  },
  {
    question: 'How long does a scan take?',
    answer:
      'Most scans complete in 60-90 seconds for websites with up to 50 pages. Larger sites (100+ pages) may take 3-5 minutes. You can monitor real-time progress in the dashboard. If a scan takes longer than expected, we will email you the results.',
  },
  {
    question: "What's the difference between automated and manual audit?",
    answer:
      'Automated scanning (included in all plans) catches 70-80% of WCAG violations using axe-core and Playwright. Manual audits (Enterprise plan add-on) involve human accessibility experts who test with real assistive technologies (screen readers, keyboard navigation, voice control) and catch issues that automation misses, like unclear link text or illogical tab order.',
  },
  {
    question: 'Do you offer a free trial?',
    answer:
      'Yes, all plans come with a 14-day free trial. No credit card required. You get full access to all features during the trial. After 14 days, you can choose to subscribe or downgrade to the free Starter plan (3 scans/month).',
  },
];

export default function PricingPage() {
  return (
    <div className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-text-primary sm:text-4xl lg:text-5xl">
            Simple, transparent INR pricing
          </h1>
          <p className="mt-4 text-lg leading-normal text-text-secondary">
            No hidden charges. GST invoice on every payment.
          </p>
        </div>

        <PricingToggleSection />

        <FAQSection items={pricingFaqs} />
      </div>
    </div>
  );
}
