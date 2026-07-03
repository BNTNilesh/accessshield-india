import { Badge } from '@accessshield/ui';
import { Building2, FileCheck, Landmark, ShieldCheck } from 'lucide-react';
import { ButtonAnchor, ButtonLink } from '@/components/marketing/ButtonLink';
import { MarketingImage } from '@/components/marketing/visuals/MarketingImage';

const urgencyBadges = [
  { label: 'SEBI deadline Apr 2026', variant: 'accent' as const },
  { label: 'GIGW 3.0 · Govt portals', variant: 'outline' as const },
  { label: 'RPwD Act 2016', variant: 'outline' as const },
];

const enterpriseSectors = [
  { label: 'BFSI & listed cos.', icon: Building2 },
  { label: 'PSUs & ministries', icon: Landmark },
  { label: 'Govt vendors', icon: ShieldCheck },
  { label: 'Audit-ready reports', icon: FileCheck },
];

const trustPoints = [
  'WCAG 2.2 AA + IS 17802 scans for websites & mobile apps',
  'Audit-ready PDFs for SEBI, RPwD, GIGW & tender committees',
  'Remediation, widget, monitoring & IAAP sign-off pathways',
];

const complianceStandards = ['RPwD Act 2016', 'IS 17802', 'WCAG 2.2 AA', 'GIGW 3.0', 'SEBI 2024'];

const severityPreview = [
  { label: 'Critical', count: 3, className: 'bg-red-100 text-red-800 border-red-200' },
  { label: 'Serious', count: 8, className: 'bg-amber-100 text-amber-800 border-amber-200' },
  { label: 'Moderate', count: 14, className: 'bg-blue-100 text-blue-800 border-blue-200' },
];

const reportChecks = [
  { label: 'RPwD evidence pack', status: 'Ready' },
  { label: 'GIGW 3.0 summary', status: 'Ready' },
  { label: 'SEBI assessment', status: 'In review' },
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

function ComplianceReportCard() {
  return (
    <div className="relative overflow-hidden rounded-xl border-2 border-primary-200 bg-white shadow-2xl ring-1 ring-primary-100">
      <div className="border-b border-gray-200 bg-gradient-to-r from-primary-900 to-primary-700 px-4 py-3">
        <div className="flex items-center justify-between gap-2">
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-primary-100">
              Enterprise compliance report
            </p>
            <p className="truncate text-sm font-semibold text-white">yourorganisation.in</p>
          </div>
          <span className="shrink-0 rounded-full bg-white/15 px-2.5 py-0.5 text-xs font-semibold text-white">
            Audit file
          </span>
        </div>
      </div>

      <div className="p-5 sm:p-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-text-secondary">Accessibility score</p>
            <p className="mt-1 text-3xl font-bold text-text-primary sm:text-4xl">
              72<span className="text-lg text-text-tertiary sm:text-xl">/100</span>
            </p>
            <p className="mt-1 text-xs text-text-tertiary">25 barriers · 12 pages scanned</p>
          </div>
          <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full border-[5px] border-amber-400 bg-amber-50 text-xl font-bold text-amber-800 sm:h-24 sm:w-24 sm:text-2xl">
            72
          </div>
        </div>

        <ul className="mt-4 space-y-2">
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

        <div className="mt-4 space-y-2 rounded-lg border border-gray-200 bg-bg-secondary p-3">
          <p className="text-xs font-semibold uppercase tracking-wide text-text-tertiary">
            Regulator-ready exports
          </p>
          {reportChecks.map((item) => (
            <div key={item.label} className="flex items-center justify-between text-sm">
              <span className="text-text-primary">{item.label}</span>
              <span
                className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
                  item.status === 'Ready'
                    ? 'bg-success-100 text-success-700'
                    : 'bg-amber-100 text-amber-900'
                }`}
              >
                {item.status}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-4 flex items-center justify-center rounded-lg bg-primary-600 px-4 py-2.5 text-sm font-semibold text-white">
          Download PDF for audit committee
        </div>
      </div>
    </div>
  );
}

function HeroVisual() {
  return (
    <figure className="relative mx-auto w-full max-w-xl lg:mx-0">
      <div className="relative aspect-[5/4] w-full overflow-hidden rounded-2xl border-2 border-primary-200 shadow-2xl">
        <MarketingImage
          src="/marketing/hero-enterprise-accessibility.png"
          alt="Diverse Indian professionals in an enterprise office using laptops and assistive technology to access digital services"
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 540px"
          className="object-cover object-center"
        />
        <div
          className="absolute inset-0 bg-gradient-to-b from-primary-900/10 via-transparent to-primary-900/50"
          aria-hidden="true"
        />
        <div
          className="absolute left-4 top-4 rounded-lg border border-white/30 bg-white/90 px-3 py-2 shadow-lg backdrop-blur-sm"
          aria-hidden="true"
        >
          <p className="text-xs font-semibold text-primary-700">Scan complete</p>
          <p className="text-sm font-bold text-text-primary">68 seconds</p>
        </div>
      </div>

      <div className="relative z-10 -mt-16 px-2 sm:-mt-24 lg:-mt-28" aria-hidden="true">
        <ComplianceReportCard />
      </div>

      <figcaption className="sr-only">
        Enterprise team in India reviewing digital accessibility, with a sample compliance report
        showing accessibility score and regulator-ready exports.
      </figcaption>
    </figure>
  );
}

export function HeroSection() {
  const calendlyUrl = process.env.NEXT_PUBLIC_CALENDLY_URL;

  return (
    <section className="relative overflow-hidden border-b border-gray-200 bg-gradient-to-b from-primary-100 via-white to-white px-4 py-20 sm:px-6 sm:py-24 lg:px-8 lg:py-28">
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        aria-hidden="true"
        style={{
          backgroundImage:
            'linear-gradient(to right, #93C5FD 1px, transparent 1px), linear-gradient(to bottom, #93C5FD 1px, transparent 1px)',
          backgroundSize: '56px 56px',
          maskImage: 'radial-gradient(ellipse 90% 80% at 50% 0%, black 25%, transparent 100%)',
        }}
      />
      <div
        className="pointer-events-none absolute -right-24 top-0 h-96 w-96 rounded-full bg-primary-200/50 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -left-24 bottom-0 h-80 w-80 rounded-full bg-accent/15 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl">
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-16">
          <div className="text-center lg:text-left">
            <div
              className="flex flex-wrap items-center justify-center gap-2 lg:justify-start"
              role="list"
              aria-label="Compliance urgency"
            >
              {urgencyBadges.map((badge) => (
                <Badge
                  key={badge.label}
                  variant={badge.variant}
                  size="lg"
                  className={
                    badge.variant === 'accent'
                      ? 'border-2 border-accent/40 shadow-sm'
                      : 'border-2 border-primary-200 bg-white shadow-sm'
                  }
                >
                  {badge.label}
                </Badge>
              ))}
            </div>

            <h1 className="mt-8 text-4xl font-bold leading-[1.08] tracking-tight text-text-primary sm:text-5xl lg:text-[3.5rem] xl:text-6xl">
              Accessible to{' '}
              <span className="bg-gradient-to-r from-primary-700 to-primary-500 bg-clip-text text-transparent">
                all Indians
              </span>
              . <span className="text-primary-900">Auditable for your regulators.</span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-text-secondary sm:text-xl lg:mx-0">
              India&apos;s platform for{' '}
              <strong className="font-semibold text-text-primary">BFSI</strong>,{' '}
              <strong className="font-semibold text-text-primary">PSUs</strong>, and{' '}
              <strong className="font-semibold text-text-primary">government vendors</strong> — scan
              websites and mobile apps, remove barriers for people with disabilities, and produce
              RPwD, GIGW, IS 17802 &amp; SEBI evidence your audit file demands.
            </p>

            <div
              className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:max-w-2xl"
              role="list"
              aria-label="Who we serve"
            >
              {enterpriseSectors.map(({ label, icon: Icon }) => (
                <div
                  key={label}
                  className="flex flex-col items-center gap-2 rounded-lg border border-gray-200 bg-white/80 px-3 py-3 text-center shadow-sm backdrop-blur-sm lg:items-start lg:text-left"
                >
                  <Icon className="h-5 w-5 text-primary-600" aria-hidden="true" />
                  <span className="text-xs font-semibold leading-snug text-text-primary sm:text-sm">
                    {label}
                  </span>
                </div>
              ))}
            </div>

            <ul className="mx-auto mt-8 max-w-xl space-y-3 text-left lg:mx-0">
              {trustPoints.map((point) => (
                <li key={point} className="flex items-start gap-3 text-base text-text-secondary">
                  <CheckIcon />
                  <span>{point}</span>
                </li>
              ))}
            </ul>

            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row lg:justify-start">
              <ButtonAnchor
                href={calendlyUrl || '/contact?plan=enterprise'}
                size="lg"
                variant="primary"
                className="w-full min-w-[240px] sm:w-auto"
                {...(calendlyUrl ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              >
                Book enterprise demo
              </ButtonAnchor>
              <ButtonLink
                href="/scan"
                size="lg"
                variant="secondary"
                className="w-full min-w-[240px] sm:w-auto"
              >
                Run free scan
              </ButtonLink>
            </div>

            <p className="mt-4 text-sm text-text-tertiary">
              GST invoicing · PO &amp; annual contracts for government · No credit card for free
              scan
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

          <HeroVisual />
        </div>
      </div>
    </section>
  );
}
