export function RiskStatsBar() {
  const stats = [
    { value: '50M+', label: 'Indians with colour blindness' },
    { value: '₹250 Cr', label: 'Max DPDP Act penalty' },
    { value: 'Apr 2026', label: 'SEBI compliance deadline' },
    { value: '21', label: 'Disabilities under RPwD Act' },
  ];

  return (
    <section
      className="bg-primary-900 px-4 py-12 sm:px-6 lg:px-8"
      role="region"
      aria-label="Accessibility risk statistics in India"
    >
      <div className="mx-auto max-w-7xl">
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
