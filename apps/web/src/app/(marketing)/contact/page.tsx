import type { Metadata } from 'next';
import Link from 'next/link';
import { MarketingContentPage } from '@/components/marketing/MarketingContentPage';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Contact AccessShield India for sales, support, and accessibility compliance questions.',
};

export default function ContactPage() {
  const calendlyUrl = process.env.NEXT_PUBLIC_CALENDLY_URL;

  return (
    <MarketingContentPage
      title="Contact us"
      description="We're here to help with accessibility compliance, product questions, and enterprise plans."
    >
      <div className="space-y-4">
        <p>
          <strong className="text-text-primary">Email:</strong>{' '}
          <a
            href="mailto:support@accessshield.in"
            className="text-primary-600 hover:text-primary-700"
          >
            support@accessshield.in
          </a>
        </p>
        <p>
          <strong className="text-text-primary">Sales:</strong>{' '}
          <a
            href="mailto:sales@accessshield.in"
            className="text-primary-600 hover:text-primary-700"
          >
            sales@accessshield.in
          </a>
        </p>
        <p>
          <strong className="text-text-primary">Office:</strong> Bengaluru, Karnataka, India
        </p>
        {calendlyUrl && calendlyUrl !== '#' && (
          <p>
            <a
              href={calendlyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex font-medium text-primary-600 hover:text-primary-700"
            >
              Book a demo with our team →
            </a>
          </p>
        )}
        <p>
          New to AccessShield?{' '}
          <Link href="/signup" className="font-medium text-primary-600 hover:text-primary-700">
            Start your free trial
          </Link>{' '}
          or try our{' '}
          <Link href="/scan" className="font-medium text-primary-600 hover:text-primary-700">
            free website scan
          </Link>
          .
        </p>
      </div>
    </MarketingContentPage>
  );
}
