import { HeroSection } from '@/components/marketing/home/HeroSection';
import { LiveTicker } from '@/components/marketing/home/LiveTicker';
import { RiskStatsBar } from '@/components/marketing/home/RiskStatsBar';
import { WhoWeBuildForSection } from '@/components/marketing/home/WhoWeBuildForSection';
import { HowItWorksSection } from '@/components/marketing/home/HowItWorksSection';
import { StandardsSection } from '@/components/marketing/home/StandardsSection';
import { TestimonialsSection } from '@/components/marketing/home/TestimonialsSection';
import { BlogPreviewSection } from '@/components/marketing/home/BlogPreviewSection';
import { CTABanner } from '@/components/marketing/home/CTABanner';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Accessible to all Indians. Auditable for your regulators.',
  description:
    'Enterprise accessibility platform for BFSI, PSUs, and government vendors — scan websites and mobile apps, fix barriers for people with disabilities, and produce RPwD, GIGW, IS 17802 & SEBI audit evidence.',
  openGraph: {
    title: 'Enterprise Digital Accessibility | AccessShield India',
    description:
      'BFSI, PSUs & govt vendors trust AccessShield for RPwD, GIGW, IS 17802 & SEBI compliance — websites, mobile apps, audit-ready reports.',
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
      <WhoWeBuildForSection />
      <HowItWorksSection />
      <StandardsSection />
      <TestimonialsSection />
      <BlogPreviewSection />
      <CTABanner />
    </>
  );
}
