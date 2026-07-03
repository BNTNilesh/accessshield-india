import { Award, ClipboardList, ScanSearch, Wrench, type LucideIcon } from 'lucide-react';

const STEP_ICONS: LucideIcon[] = [ScanSearch, ClipboardList, Wrench, Award];

export function HowItWorksSection() {
  const steps = [
    {
      number: 1,
      title: 'Discover',
      description:
        'See your site through the eyes of users with disabilities — automated scan plus real barrier detection in 60–90 seconds.',
    },
    {
      number: 2,
      title: 'Understand',
      description:
        'Prioritised issues: what blocks someone from paying, signing up, or reading your content — mapped to WCAG and IS 17802.',
    },
    {
      number: 3,
      title: 'Fix',
      description:
        'Code-level remediation guidance and AI suggestions your dev team can ship — alt text, contrast, keyboard access, and more.',
    },
    {
      number: 4,
      title: 'Prove',
      description:
        'Reports and certificates for RPwD, SEBI, GIGW, and your audit file — so compliance follows inclusion, not the other way around.',
    },
  ];

  return (
    <section className="px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
            From barriers to welcome — in 4 steps
          </h2>
          <p className="mt-4 text-lg leading-normal text-text-secondary">
            Find what excludes people, fix it, and document progress for your team and regulators
          </p>
        </div>

        <ol className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => {
            const Icon = STEP_ICONS[index] ?? ScanSearch;
            return (
              <li
                key={step.number}
                className="relative rounded-lg border border-gray-200 bg-white p-6 shadow-sm"
              >
                <div className="flex items-center justify-center">
                  <div
                    className="flex h-14 w-14 items-center justify-center rounded-full bg-primary-50 text-primary-600 ring-2 ring-primary-100"
                    aria-hidden="true"
                  >
                    <Icon className="h-7 w-7" strokeWidth={1.75} />
                  </div>
                </div>
                <p className="mt-3 text-center text-xs font-semibold uppercase tracking-wide text-primary-600">
                  Step {step.number}
                </p>
                <h3 className="mt-2 text-center text-xl font-semibold text-text-primary">
                  {step.title}
                </h3>
                <p className="mt-2 text-center text-base leading-normal text-text-secondary">
                  {step.description}
                </p>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
