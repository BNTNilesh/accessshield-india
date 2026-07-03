export function RiskStatsBar() {
  const stats = [
    { value: '2.68 Cr+', label: 'Indians with visual disability (Census 2011)' },
    { value: '70M+', label: 'People with disabilities in India' },
    { value: '21', label: 'Disability types recognised under RPwD Act' },
    { value: 'Apr 2026', label: 'SEBI accessibility deadline for listed cos.' },
  ];

  return (
    <section
      className="bg-primary-900 px-4 py-12 sm:px-6 lg:px-8"
      role="region"
      aria-label="Accessibility in India — by the numbers"
    >
      <div className="mx-auto max-w-7xl">
        <p className="mb-8 text-center text-sm font-medium text-primary-100">
          The web was built to be universal. Too many Indian sites still leave people out.
        </p>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
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
