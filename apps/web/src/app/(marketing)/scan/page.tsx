import { ScanToolWidget } from '@/components/marketing/scan/ScanToolWidget';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free Website Accessibility Scan',
  description:
    'Scan your website for WCAG 2.2 AA, RPwD Act, and IS 17802 compliance issues. Get results in 60-90 seconds. No credit card required.',
  openGraph: {
    title: 'Free Website Accessibility Scan | AccessShield India',
    description:
      'Scan your website for WCAG 2.2 AA, RPwD Act, and IS 17802 compliance issues in 60-90 seconds.',
    type: 'website',
  },
  alternates: {
    canonical: 'https://accessshield.in/scan',
  },
};

export default function ScanPage() {
  return (
    <div className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-text-primary sm:text-4xl lg:text-5xl">
            See how accessible your website is
          </h1>
          <p className="mt-4 text-lg leading-normal text-text-secondary">
            Scans up to 10 pages · Results in 60-90 seconds · No credit card required
          </p>
        </div>

        <div className="mt-12">
          <ScanToolWidget />
        </div>
      </div>
    </div>
  );
}
