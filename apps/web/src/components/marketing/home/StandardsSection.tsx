'use client';

import { LocaleLink } from '@/components/common/LocaleLink';
import { useDictionary } from '@/lib/i18n/locale-context';

const ICONS = ['📜', '🇮🇳', '🏛️', '🌐', '📊'];

export function StandardsSection() {
  const { home } = useDictionary();
  const { standards } = home;

  return (
    <section id="standards" className="bg-gray-50 px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
            {standards.title}
          </h2>
          <p className="mt-4 text-lg leading-normal text-text-secondary">{standards.subtitle}</p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {standards.items.map((standard, index) => (
            <LocaleLink
              key={standard.href}
              href={standard.href}
              className="group rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 focus-visible:ring-offset-2"
            >
              <span className="text-3xl" aria-hidden="true">
                {ICONS[index] ?? '📋'}
              </span>
              <h3 className="mt-4 text-lg font-semibold text-text-primary group-hover:text-primary-600">
                {standard.name}
              </h3>
              <p className="mt-2 text-base leading-normal text-text-secondary">
                {standard.description}
              </p>
            </LocaleLink>
          ))}
        </div>
      </div>
    </section>
  );
}
