import { Award, ClipboardList, ScanSearch, Wrench, type LucideIcon } from 'lucide-react';

const STEP_ICONS: LucideIcon[] = [ScanSearch, ClipboardList, Wrench, Award];

export function HowItWorksSection() {
  const steps = [
    {
      number: 1,
      title: 'Scan',
      description:
        'Enter your website URL and get a comprehensive accessibility audit in 60-90 seconds.',
    },
    {
      number: 2,
      title: 'Review',
      description:
        'See all violations categorized by severity, WCAG criterion, and Indian standards.',
    },
    {
      number: 3,
      title: 'Fix',
      description: 'Get AI-powered fix suggestions with code snippets and deploy with confidence.',
    },
    {
      number: 4,
      title: 'Certify',
      description:
        'Generate your compliance certificate and accessibility statement for regulators.',
    },
  ];

  return (
    <section className="px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
            Compliant in 4 steps
          </h2>
          <p className="mt-4 text-lg leading-normal text-text-secondary">
            From scan to certification — all in under an hour
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
