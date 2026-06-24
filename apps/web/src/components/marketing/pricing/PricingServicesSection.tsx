import { ButtonLink } from '@/components/marketing/ButtonLink';
import { formatInr, PRICING_CATALOG, type OneTimeSku } from '@/lib/pricing/catalog';

function ServiceCard({
  service,
  oneTimeLabel = 'one-time',
}: {
  service: OneTimeSku;
  oneTimeLabel?: string;
}) {
  return (
    <article
      className={`relative flex h-full flex-col rounded-lg border bg-white p-6 shadow-sm ${
        service.popular || service.highlighted ? 'border-primary-600 border-2' : 'border-gray-200'
      }`}
    >
      {service.popular && (
        <span className="absolute -top-3 left-4 inline-flex rounded-full bg-primary-600 px-3 py-0.5 text-xs font-semibold text-white">
          Most popular
        </span>
      )}
      {service.highlighted && !service.popular && (
        <span className="absolute -top-3 left-4 inline-flex rounded-full bg-accent-100 px-3 py-0.5 text-xs font-semibold text-accent-700">
          Add-on · standalone
        </span>
      )}
      <h3 className="text-lg font-bold text-text-primary">{service.name}</h3>
      <p className="mt-1 text-sm text-text-secondary">{service.subtitle}</p>
      <p className="mt-4 text-3xl font-bold text-text-primary">
        {formatInr(service.priceInr)}
        <span className="ml-1 text-base font-normal text-text-tertiary">{oneTimeLabel}</span>
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

export function PricingRemediationSection() {
  const remediationServices = PRICING_CATALOG.oneTime.remediation;

  return (
    <section className="mt-24" aria-labelledby="pricing-remediation-heading">
      <div className="text-center">
        <p className="text-sm font-semibold uppercase tracking-wide text-primary-600">Step 02</p>
        <h2
          id="pricing-remediation-heading"
          className="mt-2 text-2xl font-bold text-text-primary sm:text-3xl"
        >
          Remediation, priced by site size
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-base leading-normal text-text-secondary">
          Fixed-scope remediation for <strong>one website</strong> — then move to Compliance Shield
          monitoring to stay compliant. All prices exclude 18% GST.
        </p>
      </div>

      <div className="mt-10 grid grid-cols-1 items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
        {remediationServices.map((service) => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </div>
    </section>
  );
}

export function PricingAuditAddonSection() {
  const audit = PRICING_CATALOG.oneTime.audit;

  return (
    <section className="mt-24" aria-labelledby="pricing-audit-addon-heading">
      <div className="text-center">
        <h2
          id="pricing-audit-addon-heading"
          className="text-2xl font-bold text-text-primary sm:text-3xl"
        >
          Compliance Website Audit &amp; Scan
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-base leading-normal text-text-secondary">
          Know exactly where your site stands — and exactly how to fix it. Required for Compliance
          Shield and Regulatory Defense; also available standalone for one website.
        </p>
      </div>

      <div className="mx-auto mt-10 max-w-2xl">
        <ServiceCard service={audit} />
      </div>
    </section>
  );
}

export function PricingRegulatoryAddonsSection() {
  const addons = PRICING_CATALOG.oneTime.regulatoryAddons;

  return (
    <section className="mt-24" aria-labelledby="pricing-regulatory-heading">
      <div className="text-center">
        <h2
          id="pricing-regulatory-heading"
          className="text-2xl font-bold text-text-primary sm:text-3xl"
        >
          Regulatory add-ons
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-base leading-normal text-text-secondary">
          India-specific assessments for listed companies and government-facing organisations.
        </p>
      </div>

      <div className="mt-10 grid grid-cols-1 items-stretch gap-6 lg:grid-cols-2 lg:gap-8">
        {addons.map((service) => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </div>
    </section>
  );
}

/** @deprecated Use PricingAuditAddonSection — kept for import compatibility during transition */
export function PricingAuditSection() {
  return <PricingAuditAddonSection />;
}
