import Link from 'next/link';

export function StandardsSection() {
  const standards = [
    {
      name: 'RPwD Act 2016',
      description: 'Rights of Persons with Disabilities Act — mandatory for government websites',
      href: '/rpwd-act',
      icon: '📜',
    },
    {
      name: 'IS 17802',
      description: 'Indian Standard for ICT Accessibility — aligned with WCAG 2.1 AA',
      href: '/is-17802',
      icon: '🇮🇳',
    },
    {
      name: 'GIGW 3.0',
      description: 'Guidelines for Indian Government Websites — WCAG 2.0 Level A compliance',
      href: '/gigw',
      icon: '🏛️',
    },
    {
      name: 'WCAG 2.2 AA',
      description: 'Web Content Accessibility Guidelines — international accessibility standard',
      href: '/wcag-2-2-aa',
      icon: '🌐',
    },
    {
      name: 'SEBI 2024',
      description: 'SEBI accessibility circular — mandatory for listed companies by Apr 2026',
      href: '/sebi-accessibility',
      icon: '📊',
    },
  ];

  return (
    <section id="standards" className="bg-gray-50 px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
            Every Indian standard covered
          </h2>
          <p className="mt-4 text-lg leading-normal text-text-secondary">
            One scan. All compliance requirements. Zero blind spots.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {standards.map((standard) => (
            <Link
              key={standard.name}
              href={standard.href}
              className="group rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 focus-visible:ring-offset-2"
            >
              <div className="flex items-start gap-4">
                <div className="text-3xl" role="img" aria-label={`${standard.name} icon`}>
                  {standard.icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-text-primary group-hover:text-primary-600">
                    {standard.name}
                  </h3>
                  <p className="mt-2 text-base leading-normal text-text-secondary">
                    {standard.description}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
