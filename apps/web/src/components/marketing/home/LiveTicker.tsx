'use client';

import { useEffect, useState } from 'react';

const sectors = [
  'BFSI & listed companies',
  'PSUs & central ministries',
  'State govt portals',
  'SEBI-regulated entities',
  'Government ICT vendors',
  'Healthcare & insurance',
  'E-commerce & fintech',
  'Public sector banks',
];

export function LiveTicker() {
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setIsPaused(true);
    }
  }, []);

  return (
    <div
      className="border-y border-primary-200 bg-primary-900 py-3.5"
      aria-label="Sectors we serve across India"
    >
      <div className="relative overflow-hidden">
        <div
          className={`flex gap-10 ${isPaused ? '' : 'animate-marquee'}`}
          style={{
            animation: isPaused ? 'none' : 'marquee 45s linear infinite',
          }}
        >
          {[...sectors, ...sectors].map((sector, i) => (
            <div key={i} className="flex items-center gap-2.5 whitespace-nowrap">
              <span
                className="inline-block h-2 w-2 rounded-full bg-accent-600"
                aria-hidden="true"
              />
              <span className="text-sm font-medium text-primary-100">{sector}</span>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .animate-marquee {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  );
}
