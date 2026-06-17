import { HeroSection } from '@/components/marketing/home/HeroSection';
import { LiveTicker } from '@/components/marketing/home/LiveTicker';
import { RiskStatsBar } from '@/components/marketing/home/RiskStatsBar';
import { HowItWorksSection } from '@/components/marketing/home/HowItWorksSection';
import { StandardsSection } from '@/components/marketing/home/StandardsSection';
import { TestimonialsSection } from '@/components/marketing/home/TestimonialsSection';
import { BlogPreviewSection } from '@/components/marketing/home/BlogPreviewSection';
import { CTABanner } from '@/components/marketing/home/CTABanner';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Make your website legally accessible in India',
  description:
    'AI-powered accessibility compliance for RPwD Act 2016, IS 17802, GIGW 3.0, WCAG 2.2 AA, and SEBI. Scan, remediate, and certify your website in minutes.',
  openGraph: {
    title: 'Make your website legally accessible in India | AccessShield India',
    description:
      'AI-powered accessibility compliance for RPwD Act 2016, IS 17802, GIGW 3.0, WCAG 2.2 AA, and SEBI.',
    type: 'website',
  },
  alternates: {
    canonical: 'https://accessshield.in',
  },
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <LiveTicker />
      <RiskStatsBar />
      <HowItWorksSection />
      <StandardsSection />
      <TestimonialsSection />
      <BlogPreviewSection />
      <CTABanner />
    </>
  );
}
