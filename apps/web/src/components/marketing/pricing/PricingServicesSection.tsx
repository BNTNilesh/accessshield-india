import { ButtonLink } from '@/components/marketing/ButtonLink';

interface ServiceSku {
  name: string;
  subtitle: string;
  priceInr: number;
  priceNote?: string;
  features: string[];
  popular?: boolean;
  cta: { text: string; href: string };
}

function formatInr(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}

const auditServices: ServiceSku[] = [
  {
    name: 'Compliance audit report',
    subtitle: 'Standalone — no subscription required',
    priceInr: 49999,
    features: [
      'WCAG 2.2 AA + IS 17802 automated scan',
      'Executive PDF with severity-ranked findings',
      'Prioritized remediation roadmap',
      'Ideal upsell from the free scan tool',
    ],
    cta: { text: 'Get audit report', href: '/contact?service=audit' },
  },
  {
    name: 'SEBI accessibility assessment',
    subtitle: 'For listed companies',
    priceInr: 79999,
    features: [
      'SEBI circular (2024) aligned assessment',
      'IAAP-certified professional sign-off',
      'Investor-facing accessibility documentation',
      'Included once per year on Enterprise plan',
    ],
    cta: { text: 'Request SEBI assessment', href: '/contact?service=sebi' },
  },
  {
    name: 'RPwD legal compliance report',
    subtitle: 'For BFSI and government-facing sites',
    priceInr: 59999,
    features: [
      'RPwD Act 2016 alignment report',
      'IS 17802 + WCAG 2.2 AA coverage',
      'Accessibility statement draft',
      'Regulatory evidence package',
    ],
    cta: { text: 'Request RPwD report', href: '/contact?service=rpwd' },
  },
];

const remediationServices: ServiceSku[] = [
  {
    name: 'Starter site',
    subtitle: '1–5 pages',
    priceInr: 75000,
    priceNote: 'Additional pages from ₹8,000/page',
    popular: true,
    features: [
      'Alt text and colour contrast fixes',
      'Heading structure and keyboard navigation',
      'Accessibility statement page',
      'Hand-off to ongoing monitoring',
    ],
    cta: { text: 'Get remediation quote', href: '/contact?service=remediation-starter' },
  },
  {
    name: 'Standard site',
    subtitle: '6–15 pages',
    priceInr: 150000,
    priceNote: 'Additional pages from ₹8,000/page',
    features: [
      'Form labelling and error handling',
      'Mobile accessibility fixes',
      'ARIA landmark roles',
      'Template-level improvements',
    ],
    cta: { text: 'Get remediation quote', href: '/contact?service=remediation-standard' },
  },
  {
    name: 'Large site',
    subtitle: '16–30 pages',
    priceInr: 275000,
    priceNote: 'Additional pages from ₹8,000/page',
    features: [
      'Site-wide template remediation',
      'Video captions and focus management',
      'Full WCAG 2.2 AA remediation',
      'Re-scan and certification support',
    ],
    cta: { text: 'Get remediation quote', href: '/contact?service=remediation-large' },
  },
];

function ServiceCard({ service }: { service: ServiceSku }) {
  return (
    <article
      className={`relative flex h-full flex-col rounded-lg border bg-white p-6 shadow-sm ${
        service.popular ? 'border-primary-600 border-2' : 'border-gray-200'
      }`}
    >
      {service.popular && (
        <span className="absolute -top-3 left-4 inline-flex rounded-full bg-primary-600 px-3 py-0.5 text-xs font-semibold text-white">
          Most popular
        </span>
      )}
      <h3 className="text-lg font-bold text-text-primary">{service.name}</h3>
      <p className="mt-1 text-sm text-text-secondary">{service.subtitle}</p>
      <p className="mt-4 text-3xl font-bold text-text-primary">
        {formatInr(service.priceInr)}
        <span className="ml-1 text-base font-normal text-text-tertiary">one-time</span>
      </p>
      {service.priceNote && <p className="mt-1 text-xs text-text-tertiary">{service.priceNote}</p>}
      <p className="mt-1 text-xs text-text-tertiary">+ 18% GST</p>
      <ul className="mt-4 flex-1 space-y-2" role="list">
        {service.features.map((feature) => (
          <li key={feature} className="flex items-start gap-2 text-sm text-text-primary">
            <svg
              className="mt-0.5 h-4 w-4 shrink-0 text-green-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            {feature}
          </li>
        ))}
      </ul>
      <ButtonLink href={service.cta.href} variant="secondary" size="md" className="mt-6 w-full">
        {service.cta.text}
      </ButtonLink>
    </article>
  );
}

export function PricingAuditSection() {
  return (
    <section className="mt-24" aria-labelledby="pricing-audit-heading">
      <div className="text-center">
        <p className="text-sm font-semibold uppercase tracking-wide text-primary-600">Step 02</p>
        <h2
          id="pricing-audit-heading"
          className="mt-2 text-2xl font-bold text-text-primary sm:text-3xl"
        >
          Audit &amp; assessment reports
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-base leading-normal text-text-secondary">
          One-time reports priced for the Indian market. All prices exclude 18% GST.
        </p>
      </div>

      <div className="mt-10 grid grid-cols-1 items-stretch gap-6 lg:grid-cols-3 lg:gap-8">
        {auditServices.map((service) => (
          <ServiceCard key={service.name} service={service} />
        ))}
      </div>
    </section>
  );
}

export function PricingRemediationSection() {
  return (
    <section className="mt-24" aria-labelledby="pricing-remediation-heading">
      <div className="text-center">
        <h2
          id="pricing-remediation-heading"
          className="text-2xl font-bold text-text-primary sm:text-3xl"
        >
          Remediation by site size
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-base leading-normal text-text-secondary">
          Fixed-scope remediation after your audit — then move to Professional monitoring to stay
          compliant. All prices exclude 18% GST.
        </p>
      </div>

      <div className="mt-10 grid grid-cols-1 items-stretch gap-6 lg:grid-cols-3 lg:gap-8">
        {remediationServices.map((service) => (
          <ServiceCard key={service.name} service={service} />
        ))}
      </div>
    </section>
  );
}
