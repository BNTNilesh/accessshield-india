import Link from 'next/link';
import { ButtonLink } from '@/components/marketing/ButtonLink';
import { MobileMenuToggle } from './MobileMenuToggle';

export function MarketingNav() {
  return (
    <header className="border-b border-gray-200 bg-white">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8"
        aria-label="Main navigation"
      >
        <Link href="/" className="text-xl font-bold text-primary-700">
          AccessShield India
        </Link>

        {/* Desktop navigation */}
        <div className="hidden items-center gap-8 md:flex">
          <Link
            href="/"
            className="text-base font-medium text-text-secondary hover:text-primary-600"
          >
            Home
          </Link>
          <Link
            href="/services"
            className="text-base font-medium text-text-secondary hover:text-primary-600"
          >
            Services
          </Link>
          <Link
            href="/widget"
            className="text-base font-medium text-text-secondary hover:text-primary-600"
          >
            Widget
          </Link>
          <Link
            href="/blog"
            className="text-base font-medium text-text-secondary hover:text-primary-600"
          >
            Blog
          </Link>
          <Link
            href="/scan"
            className="text-base font-medium text-text-secondary hover:text-primary-600"
          >
            Free Scan
          </Link>
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <ButtonLink href="/login" size="md" variant="secondary">
            Sign in
          </ButtonLink>
          <ButtonLink href="/signup" size="md" variant="primary">
            Start free trial
          </ButtonLink>
        </div>

        {/* Mobile menu toggle */}
        <div className="md:hidden">
          <MobileMenuToggle />
        </div>
      </nav>
    </header>
  );
}
