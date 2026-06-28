import type { Metadata } from 'next';
import Link from 'next/link';
import { MarketingContentPage } from '@/components/marketing/MarketingContentPage';
import { AboutIllustration } from '@/components/marketing/visuals';
import { CTABanner } from '@/components/marketing/home/CTABanner';
import { ButtonLink } from '@/components/marketing/ButtonLink';

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'AccessShield India is a Pune-based company helping Indian organisations achieve RPwD, IS 17802, GIGW, WCAG 2.2 AA, and SEBI digital accessibility compliance.',
  openGraph: {
    title: 'About Us | AccessShield India',
    description:
      'Pune-based accessibility compliance platform for Indian businesses, government vendors, and SEBI-regulated entities.',
  },
  alternates: { canonical: 'https://accessshield.in/about' },
};

export default function AboutPage() {
  return (
    <>
      <MarketingContentPage
        title="About AccessShield India"
        description="A Pune-based company making digital accessibility compliance practical for Indian businesses, government vendors, and regulated industries."
        visual={<AboutIllustration />}
        visualLabel="Team collaborating on accessibility compliance"
      >
        <section aria-labelledby="mission-heading">
          <h2 id="mission-heading" className="text-xl font-semibold text-text-primary">
            Our mission
          </h2>
          <p>
            Everyone deserves equal access to digital services — from banking and healthcare to
            government portals and investor platforms. AccessShield India exists to close the gap
            between India&apos;s accessibility laws and what teams can actually ship on tight
            deadlines and budgets.
          </p>
        </section>

        <section aria-labelledby="what-we-do-heading">
          <h2 id="what-we-do-heading" className="text-xl font-semibold text-text-primary">
            What we do
          </h2>
          <p>
            We are an AI-powered SaaS platform for continuous accessibility compliance. Teams use
            AccessShield to scan websites, prioritise issues, track remediation, generate
            audit-ready reports, and demonstrate progress toward RPwD Act 2016, IS 17802, GIGW 3.0,
            WCAG 2.2 AA, and SEBI accessibility requirements.
          </p>
          <ul className="list-disc space-y-2 pl-6">
            <li>Automated scanning with India-specific rules (IS 17802, GIGW)</li>
            <li>Issue tracking and remediation workflows for dev and compliance teams</li>
            <li>Compliance reports for executives, auditors, and regulators</li>
            <li>Optional accessibility widget for end-user experience improvements</li>
          </ul>
        </section>

        <section aria-labelledby="why-india-heading">
          <h2 id="why-india-heading" className="text-xl font-semibold text-text-primary">
            Built in India, for India
          </h2>
          <p>
            We are headquartered in <strong className="text-text-primary">Pune, Maharashtra</strong>
            . That shapes how we build: Indian language support, rupee pricing with GST invoicing,
            and standards aligned with BIS (IS 17802) and SEBI&apos;s 2024 accessibility circular —
            not generic checklists copied from US-only tooling.
          </p>
        </section>

        <section aria-labelledby="who-we-serve-heading">
          <h2 id="who-we-serve-heading" className="text-xl font-semibold text-text-primary">
            Who we serve
          </h2>
          <ul className="list-disc space-y-2 pl-6">
            <li>BFSI and SEBI-regulated entities facing the April 2026 deadline</li>
            <li>Government vendors and public-sector digital teams (GIGW 3.0)</li>
            <li>Mid-market companies preparing for RPwD and IS 17802 alignment</li>
            <li>Developers and accessibility officers who need actionable fixes, not PDF dumps</li>
          </ul>
        </section>

        <section aria-labelledby="standards-heading">
          <h2 id="standards-heading" className="text-xl font-semibold text-text-primary">
            Standards we help you meet
          </h2>
          <p>
            Explore our compliance guides:{' '}
            <Link href="/rpwd-act" className="font-medium text-primary-600 hover:text-primary-700">
              RPwD Act
            </Link>
            ,{' '}
            <Link href="/is-17802" className="font-medium text-primary-600 hover:text-primary-700">
              IS 17802
            </Link>
            ,{' '}
            <Link href="/gigw" className="font-medium text-primary-600 hover:text-primary-700">
              GIGW 3.0
            </Link>
            ,{' '}
            <Link
              href="/wcag-2-2-aa"
              className="font-medium text-primary-600 hover:text-primary-700"
            >
              WCAG 2.2 AA
            </Link>
            , and{' '}
            <Link
              href="/sebi-accessibility"
              className="font-medium text-primary-600 hover:text-primary-700"
            >
              SEBI accessibility
            </Link>
            .
          </p>
        </section>

        <div className="flex flex-wrap gap-4 pt-2">
          <ButtonLink href="/signup" variant="primary">
            Start free trial
          </ButtonLink>
          <ButtonLink href="/contact" variant="secondary">
            Talk to us
          </ButtonLink>
        </div>
      </MarketingContentPage>
      <CTABanner />
    </>
  );
}
