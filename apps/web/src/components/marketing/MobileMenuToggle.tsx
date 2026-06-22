'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ButtonLink } from '@/components/marketing/ButtonLink';
import { useFocusTrap } from '@accessshield/ui';

export function MobileMenuToggle() {
  const [isOpen, setIsOpen] = useState(false);
  const trapRef = useFocusTrap<HTMLDivElement>({ active: isOpen });

  const handleClose = () => setIsOpen(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-controls="mobile-menu"
        aria-label="Toggle navigation menu"
        className="inline-flex items-center justify-center rounded-md p-2 text-gray-700 hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 focus-visible:ring-offset-2"
      >
        <svg
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="currentColor"
          aria-hidden="true"
        >
          {isOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40 bg-black/50"
            onClick={handleClose}
            aria-hidden="true"
          />

          {/* Mobile menu panel */}
          <div
            id="mobile-menu"
            ref={trapRef}
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation menu"
            className="fixed inset-y-0 right-0 z-50 w-full max-w-sm bg-white px-6 py-6 shadow-xl sm:max-w-sm"
          >
            <div className="flex items-center justify-between">
              <span className="text-xl font-bold text-primary-700">AccessShield India</span>
              <button
                type="button"
                onClick={handleClose}
                aria-label="Close menu"
                className="rounded-md p-2 text-gray-700 hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 focus-visible:ring-offset-2"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <nav className="mt-8 flex flex-col gap-4">
              <Link
                href="/"
                onClick={handleClose}
                className="block rounded-md px-3 py-2 text-base font-medium text-text-secondary hover:bg-gray-100 hover:text-primary-600"
              >
                Home
              </Link>
              <Link
                href="/services"
                onClick={handleClose}
                className="block rounded-md px-3 py-2 text-base font-medium text-text-secondary hover:bg-gray-100 hover:text-primary-600"
              >
                Services
              </Link>
              <Link
                href="/widget"
                onClick={handleClose}
                className="block rounded-md px-3 py-2 text-base font-medium text-text-secondary hover:bg-gray-100 hover:text-primary-600"
              >
                Widget
              </Link>
              <Link
                href="/scan"
                onClick={handleClose}
                className="block rounded-md px-3 py-2 text-base font-medium text-text-secondary hover:bg-gray-100 hover:text-primary-600"
              >
                Free Scan
              </Link>

              <hr className="my-4 border-gray-200" />

              <ButtonLink
                href="/login"
                size="lg"
                variant="secondary"
                className="w-full"
                onClick={handleClose}
              >
                Sign in
              </ButtonLink>
              <ButtonLink
                href="/signup"
                size="lg"
                variant="primary"
                className="w-full"
                onClick={handleClose}
              >
                Start free trial
              </ButtonLink>
            </nav>
          </div>
        </>
      )}
    </>
  );
}
