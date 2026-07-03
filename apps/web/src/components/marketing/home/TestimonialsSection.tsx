export function TestimonialsSection() {
  // TODO: Replace with real testimonials from beta clients
  const testimonials = [
    {
      quote:
        'We thought we were fine until we realised a blind user could not complete our KYC flow. AccessShield showed us exactly what to fix — and gave us SEBI-ready reports.',
      author: 'Priya Sharma',
      role: 'Head of Compliance',
      company: 'Leading Fintech',
      rating: 5,
    },
    {
      quote:
        'Our government tender required GIGW compliance. AccessShield translated that into real barriers for users with disabilities — not just a checklist.',
      author: 'Rajesh Kumar',
      role: 'CTO',
      company: 'E-commerce Platform',
      rating: 5,
    },
    {
      quote:
        'The widget helps visitors with low vision and dyslexia today. The remediation work helps everyone tomorrow. That is the right order.',
      author: 'Meera Patel',
      role: 'Product Manager',
      company: 'SaaS Startup',
      rating: 5,
    },
  ];

  return (
    <section className="px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
            Teams building for everyone across India
          </h2>
          <p className="mt-4 text-lg leading-normal text-text-secondary">
            Compliance gets you the certificate. Accessibility gets you the customer.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.author}
              className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm"
            >
              <div
                className="flex items-center gap-1"
                aria-label={`${testimonial.rating} out of 5 stars`}
              >
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <svg
                    key={i}
                    className="h-5 w-5 text-amber-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    aria-hidden="true"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <blockquote className="mt-4 text-base leading-normal text-text-primary">
                &ldquo;{testimonial.quote}&rdquo;
              </blockquote>
              <div className="mt-6">
                <div className="flex items-center gap-3">
                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-100 text-sm font-semibold text-primary-700"
                    aria-hidden="true"
                  >
                    {testimonial.author
                      .split(' ')
                      .map((n) => n[0])
                      .join('')}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-text-primary">
                      {testimonial.author}
                    </div>
                    <div className="text-sm text-text-secondary">
                      {testimonial.role}, {testimonial.company}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
