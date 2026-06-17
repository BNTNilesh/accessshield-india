'use client';

import { useEffect, useState } from 'react';

const companies = [
  'HDFC Bank · Mumbai',
  'Infosys · Bengaluru',
  'TCS · Chennai',
  'ICICI Bank · Mumbai',
  'Wipro · Bengaluru',
  'Axis Bank · Mumbai',
  'Tech Mahindra · Pune',
  'Kotak Mahindra · Mumbai',
  'HCL Technologies · Noida',
  'L&T Infotech · Mumbai',
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
      className="border-y border-gray-200 bg-white py-4"
      aria-label="Companies currently being protected"
    >
      <div className="relative overflow-hidden">
        <div
          className={`flex gap-8 ${isPaused ? '' : 'animate-marquee'}`}
          style={{
            animation: isPaused ? 'none' : 'marquee 40s linear infinite',
          }}
        >
          {[...companies, ...companies].map((company, i) => (
            <div key={i} className="flex items-center gap-2 whitespace-nowrap">
              <span className="inline-block h-2 w-2 rounded-full bg-green-500" aria-hidden="true" />
              <span className="text-sm font-medium text-text-secondary">{company}</span>
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
