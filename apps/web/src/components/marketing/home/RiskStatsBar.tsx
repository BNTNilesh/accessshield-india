'use client';

import { useDictionary } from '@/lib/i18n/locale-context';

export function RiskStatsBar() {
  const { home } = useDictionary();
  const { riskStats } = home;

  return (
    <section className="bg-primary-900 px-4 py-12 sm:px-6 lg:px-8" aria-label={riskStats.title}>
      <div className="mx-auto max-w-7xl">
        <p className="mb-8 text-center text-sm font-medium text-primary-100">{riskStats.intro}</p>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {riskStats.stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl font-bold text-white sm:text-4xl">{stat.value}</div>
              <div className="mt-2 text-sm leading-normal text-primary-100 sm:text-base">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
