import { ButtonAnchor, ButtonLink } from '@/components/marketing/ButtonLink';

export function CTABanner() {
  const calendlyUrl = process.env.NEXT_PUBLIC_CALENDLY_URL;

  return (
    <section className="bg-primary-900 px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Your SEBI deadline is approaching. Are you compliant?
        </h2>
        <p className="mt-6 text-lg leading-normal text-primary-100">
          Listed companies must comply with SEBI accessibility rules by April 2026. Don&apos;t wait
          for the penalty notice — get compliant today.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <ButtonLink href="/scan" size="lg" variant="primary" className="min-w-[220px]">
            Scan my website free
          </ButtonLink>
          <ButtonAnchor
            href={calendlyUrl || '/contact'}
            size="lg"
            variant="secondary"
            className="min-w-[220px] border-white bg-white text-primary-700 hover:border-primary-100 hover:bg-primary-50"
            {...(calendlyUrl ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
          >
            Talk to an expert
          </ButtonAnchor>
        </div>
      </div>
    </section>
  );
}
