import { MarketingImage } from '@/components/marketing/visuals/MarketingImage';

const userGroups = [
  {
    title: 'Blind & low-vision users',
    barrier: 'Missing alt text, poor contrast, broken screen-reader order',
    checks: 'WCAG 1.1.1, 1.4.3, focus order, ARIA labels',
  },
  {
    title: 'Deaf & hard-of-hearing users',
    barrier: 'Videos without captions, audio-only alerts',
    checks: 'WCAG 1.2 multimedia, transcripts, visual alternatives',
  },
  {
    title: 'Motor & cognitive disabilities',
    barrier: 'Tiny buttons, keyboard traps, confusing forms',
    checks: 'WCAG 2.1 keyboard access, 2.5.8 touch targets, IS 17802',
  },
] as const;

export function WhoWeBuildForSection() {
  return (
    <section
      className="border-y border-gray-200 bg-white px-4 py-16 sm:px-6 sm:py-24 lg:px-8"
      aria-labelledby="who-we-build-for-heading"
    >
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <h2
            id="who-we-build-for-heading"
            className="text-3xl font-bold tracking-tight text-text-primary sm:text-4xl"
          >
            Built for real users, not just PDFs
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg leading-normal text-text-secondary">
            When someone with a disability cannot pay a bill, read a menu, or complete a form on
            your site, the service is not truly public. We find those barriers — then help you
            remove them.
          </p>
        </div>

        <figure className="relative mx-auto mt-12 max-w-5xl overflow-hidden rounded-2xl border border-gray-200 shadow-lg">
          <div className="relative aspect-[21/9] w-full">
            <MarketingImage
              src="/marketing/accessibility-users-banner.png"
              alt="Indian users with visual, hearing, and motor disabilities independently using smartphones, laptops, and accessible keyboards"
              fill
              sizes="(max-width: 1280px) 100vw, 1024px"
              className="object-cover object-center"
            />
            <div
              className="absolute inset-0 bg-gradient-to-r from-primary-900/70 via-primary-900/25 to-transparent"
              aria-hidden="true"
            />
            <blockquote className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 lg:max-w-xl lg:p-10">
              <p className="text-lg font-medium leading-relaxed text-white sm:text-xl">
                &ldquo;The power of the Web is in its universality. Access by everyone regardless of
                disability is an essential aspect.&rdquo;
              </p>
              <footer className="mt-3 text-sm text-primary-100">— Tim Berners-Lee</footer>
            </blockquote>
          </div>
          <figcaption className="sr-only">
            People with disabilities using assistive technology to access digital services in India
          </figcaption>
        </figure>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {userGroups.map((group) => (
            <article
              key={group.title}
              className="rounded-lg border border-gray-200 bg-bg-secondary p-6 shadow-sm"
            >
              <h3 className="text-lg font-semibold text-text-primary">{group.title}</h3>
              <p className="mt-3 text-sm leading-normal text-text-secondary">
                <span className="font-medium text-text-primary">Common barrier:</span>{' '}
                {group.barrier}
              </p>
              <p className="mt-2 text-sm leading-normal text-text-secondary">
                <span className="font-medium text-text-primary">What we check:</span> {group.checks}
              </p>
            </article>
          ))}
        </div>

        <p className="mx-auto mt-10 max-w-3xl text-center text-base leading-normal text-text-secondary">
          Fix these barriers and you welcome crores of Indians who rely on screen readers,
          magnifiers, voice control, and other assistive technology every day — with the scans and
          reports regulators expect under RPwD, IS 17802, GIGW, and SEBI.
        </p>
      </div>
    </section>
  );
}
