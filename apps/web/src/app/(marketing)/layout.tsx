import { Inter } from 'next/font/google';
import { SkipLink } from '@accessshield/ui';
import { MarketingNav } from '@/components/marketing/MarketingNav';
import { MarketingFooter } from '@/components/marketing/MarketingFooter';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={inter.variable}>
      <SkipLink href="#main-content" />
      <MarketingNav />
      <main id="main-content">{children}</main>
      <MarketingFooter />
    </div>
  );
}
