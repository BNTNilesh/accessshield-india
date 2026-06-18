import type { Metadata } from 'next';
import Link from 'next/link';
import { MarketingContentPage } from '@/components/marketing/MarketingContentPage';
import { CTABanner } from '@/components/marketing/home/CTABanner';

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'AccessShield India helps Indian organisations achieve digital accessibility compliance with AI-powered scanning and remediation.',
};

export default function AboutPage() {
  return (
    <>
      <MarketingContentPage
        title="About AccessShield India"
        description="We make digital accessibility compliance practical for Indian businesses, government vendors, and regulated industries."
      >
        <p>
          AccessShield India is an AI-powered SaaS platform built for RPwD Act 2016, IS 17802, GIGW
          3.0, WCAG 2.2 AA, and SEBI accessibility requirements. We help teams scan websites, track
          remediation, generate compliance reports, and certify accessibility improvements.
        </p>
        <p>
          Based in Bengaluru, we understand India-specific needs: Indian language support, GST
          invoicing, rupee pricing, and standards aligned with BIS and SEBI circulars.
        </p>
        <p>
          <Link href="/signup" className="font-medium text-primary-600 hover:text-primary-700">
            Start your free trial →
          </Link>
        </p>
      </MarketingContentPage>
      <CTABanner />
    </>
  );
}
