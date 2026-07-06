import { HeroSection } from '@/components/marketing/home/HeroSection';
import { LiveTicker } from '@/components/marketing/home/LiveTicker';
import { RiskStatsBar } from '@/components/marketing/home/RiskStatsBar';
import { WhoWeBuildForSection } from '@/components/marketing/home/WhoWeBuildForSection';
import { HowItWorksSection } from '@/components/marketing/home/HowItWorksSection';
import { StandardsSection } from '@/components/marketing/home/StandardsSection';
import { TestimonialsSection } from '@/components/marketing/home/TestimonialsSection';
import { BlogPreviewSection } from '@/components/marketing/home/BlogPreviewSection';
import { CTABanner } from '@/components/marketing/home/CTABanner';
import { getDictionary } from '@/lib/i18n/get-dictionary';
import { localeFromParams } from '@/lib/i18n/server';
import { localizedHref } from '@/lib/i18n/paths';
import type { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const locale = localeFromParams(params);
  const { home } = getDictionary(locale);
  const base = 'https://accessshield.in';

  return {
    title: home.meta.title,
    description: home.meta.description,
    openGraph: {
      title: 'Enterprise Digital Accessibility | AccessShield India',
      description: home.meta.description,
      type: 'website',
    },
    alternates: {
      canonical: localizedHref('/', locale) === '/' ? base : `${base}${localizedHref('/', locale)}`,
      languages: {
        en: base,
        hi: `${base}/hi`,
      },
    },
  };
}

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
