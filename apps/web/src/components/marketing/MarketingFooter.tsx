import Link from 'next/link';

export function MarketingFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-gray-200 bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Compliance */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-700">
              Compliance
            </h3>
            <ul className="mt-4 space-y-3">
              <li>
                <Link
                  href="/rpwd-act"
                  className="text-base text-text-secondary hover:text-primary-600"
                >
                  RPwD Act 2016
                </Link>
              </li>
              <li>
                <Link
                  href="/is-17802"
                  className="text-base text-text-secondary hover:text-primary-600"
                >
                  IS 17802
                </Link>
              </li>
              <li>
                <Link href="/gigw" className="text-base text-text-secondary hover:text-primary-600">
                  GIGW 3.0
                </Link>
              </li>
              <li>
                <Link
                  href="/wcag-2-2-aa"
                  className="text-base text-text-secondary hover:text-primary-600"
                >
                  WCAG 2.2 AA
                </Link>
              </li>
              <li>
                <Link
                  href="/sebi-accessibility"
                  className="text-base text-text-secondary hover:text-primary-600"
                >
                  SEBI Accessibility
                </Link>
              </li>
            </ul>
          </div>

          {/* Product */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-700">
              Product
            </h3>
            <ul className="mt-4 space-y-3">
              <li>
                <Link href="/scan" className="text-base text-text-secondary hover:text-primary-600">
                  Free Scan
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="text-base text-text-secondary hover:text-primary-600"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  href="/widget"
                  className="text-base text-text-secondary hover:text-primary-600"
                >
                  Accessibility Widget
                </Link>
              </li>
              <li>
                <Link href="/docs" className="text-base text-text-secondary hover:text-primary-600">
                  Documentation
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-base text-text-secondary hover:text-primary-600">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-700">
              Company
            </h3>
            <ul className="mt-4 space-y-3">
              <li>
                <Link
                  href="/about"
                  className="text-base text-text-secondary hover:text-primary-600"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-base text-text-secondary hover:text-primary-600"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href="/careers"
                  className="text-base text-text-secondary hover:text-primary-600"
                >
                  Careers
                </Link>
              </li>
              <li>
                <a
                  href={process.env.NEXT_PUBLIC_CALENDLY_URL || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-base text-text-secondary hover:text-primary-600"
                >
                  Book a Demo
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-700">Legal</h3>
            <ul className="mt-4 space-y-3">
              <li>
                <Link
                  href="/privacy"
                  className="text-base text-text-secondary hover:text-primary-600"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-base text-text-secondary hover:text-primary-600"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href="/refund"
                  className="text-base text-text-secondary hover:text-primary-600"
                >
                  Refund Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/accessibility-statement"
                  className="text-base text-text-secondary hover:text-primary-600"
                >
                  Accessibility
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 border-t border-gray-200 pt-8">
          <p className="text-sm text-text-secondary">
            &copy; {currentYear} AccessShield India. All rights reserved.
            <span className="ml-4">GSTIN: 29AABCA1234B1ZS</span>
            <span className="ml-4">Pune, Maharashtra, India</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
