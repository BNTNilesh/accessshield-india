import { Badge } from '@accessshield/ui';
import { ButtonAnchor, ButtonLink } from '@/components/marketing/ButtonLink';

const trustPoints = [
  'WCAG 2.2 AA + IS 17802 scanning',
  'AI fix suggestions in plain English',
  'Compliance certificate in minutes',
];

const complianceStandards = ['RPwD Act 2016', 'IS 17802', 'WCAG 2.2 AA', 'GIGW 3.0', 'SEBI 2024'];

const severityPreview = [
  { label: 'Critical', count: 3, className: 'bg-red-100 text-red-800 border-red-200' },
  { label: 'Serious', count: 8, className: 'bg-amber-100 text-amber-800 border-amber-200' },
  { label: 'Moderate', count: 14, className: 'bg-blue-100 text-blue-800 border-blue-200' },
];

function CheckIcon() {
  return (
    <svg
      className="h-5 w-5 shrink-0 text-success-700"
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function HeroPreviewCard() {
  return (
    <div className="relative mx-auto w-full max-w-lg lg:mx-0" aria-hidden="true">
      <div className="absolute -left-4 -top-4 h-24 w-24 rounded-full bg-primary-200/40 blur-2xl motion-safe:animate-pulse" />
      <div className="absolute -bottom-6 -right-6 h-32 w-32 rounded-full bg-accent/20 blur-2xl motion-safe:animate-pulse" />

      <div className="relative overflow-hidden rounded-xl border-2 border-gray-200 bg-white shadow-2xl">
        <div className="border-b border-gray-200 bg-gray-50 px-4 py-3">
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-red-400" />
            <span className="h-3 w-3 rounded-full bg-amber-400" />
            <span className="h-3 w-3 rounded-full bg-green-500" />
            <span className="ml-2 truncate rounded-md border border-gray-200 bg-white px-3 py-1 text-xs text-text-tertiary">
              https://yourcompany.in
            </span>
          </div>
        </div>

        <div className="p-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-medium text-text-secondary">Accessibility score</p>
              <p className="mt-1 text-3xl font-bold text-text-primary">
                72<span className="text-lg text-text-tertiary">/100</span>
              </p>
            </div>
            <div className="flex h-20 w-20 items-center justify-center rounded-full border-4 border-amber-400 bg-amber-50 text-xl font-bold text-amber-800">
              72
            </div>
          </div>

          <p className="mt-4 text-sm text-text-secondary">
            25 issues found across 12 pages · scan completed in 68s
          </p>

          <ul className="mt-5 space-y-2">
            {severityPreview.map((item) => (
              <li
                key={item.label}
                className={`flex items-center justify-between rounded-md border px-3 py-2 text-sm font-medium ${item.className}`}
              >
                <span>{item.label}</span>
                <span>{item.count}</span>
              </li>
            ))}
          </ul>

          <div className="mt-5 rounded-lg border-2 border-dashed border-primary-200 bg-primary-50 px-4 py-3 text-sm text-primary-700">
            AI suggestion ready: Add alt text to 6 product images
          </div>
        </div>
      </div>
    </div>
  );
}

export function HeroSection() {
  return (
    <section className="relative overflow-hidden border-b border-gray-200 bg-gradient-to-b from-primary-50 via-white to-white px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
      {/* Background grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        aria-hidden="true"
        style={{
          backgroundImage:
            'linear-gradient(to right, #D1D5DB 1px, transparent 1px), linear-gradient(to bottom, #D1D5DB 1px, transparent 1px)',
          backgroundSize: '48px 48px',
          maskImage: 'radial-gradient(ellipse 80% 70% at 50% 0%, black 30%, transparent 100%)',
        }}
      />

      <div className="relative mx-auto max-w-7xl">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="text-center lg:text-left">
            <div className="flex justify-center lg:justify-start">
              <Badge variant="accent" size="lg" className="border-2 border-accent/30 shadow-sm">
                SEBI deadline: April 2026 — start your compliance journey
              </Badge>
            </div>

            <h1 className="mt-6 text-4xl font-bold leading-tight tracking-tight text-text-primary sm:text-5xl lg:text-[3.25rem] lg:leading-[1.1]">
              Make your website <span className="text-primary-600">legally accessible</span> in
              India
            </h1>

            <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-text-secondary sm:text-xl lg:mx-0">
              AI-powered scanning for RPwD Act, IS 17802, GIGW 3.0, WCAG 2.2 AA, and SEBI rules.
              Find issues, fix them faster, and download your compliance certificate.
            </p>

            <ul className="mx-auto mt-8 max-w-md space-y-3 text-left lg:mx-0">
              {trustPoints.map((point) => (
                <li key={point} className="flex items-start gap-3 text-base text-text-secondary">
                  <CheckIcon />
                  <span>{point}</span>
                </li>
              ))}
            </ul>

            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row lg:justify-start">
              <ButtonLink
                href="/scan"
                size="lg"
                variant="primary"
                className="w-full min-w-[220px] sm:w-auto"
              >
                Scan your website free
              </ButtonLink>
              <ButtonAnchor
                href={process.env.NEXT_PUBLIC_CALENDLY_URL || '/contact'}
                size="lg"
                variant="secondary"
                className="w-full min-w-[220px] sm:w-auto"
                {...(process.env.NEXT_PUBLIC_CALENDLY_URL
                  ? { target: '_blank', rel: 'noopener noreferrer' }
                  : {})}
              >
                Book a demo
              </ButtonAnchor>
            </div>

            <p className="mt-4 text-sm text-text-tertiary">
              No credit card · Free scan in under 90 seconds · Built for Indian compliance
            </p>

            <div
              className="mt-10 flex flex-wrap items-center justify-center gap-2 lg:justify-start"
              role="list"
              aria-label="Supported compliance standards"
            >
              {complianceStandards.map((standard) => (
                <Badge
                  key={standard}
                  variant="outline"
                  size="lg"
                  className="border-2 border-gray-300 bg-white shadow-sm"
                >
                  {standard}
                </Badge>
              ))}
            </div>
          </div>

          <HeroPreviewCard />
        </div>
      </div>
    </section>
  );
}
