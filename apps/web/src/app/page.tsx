import Link from 'next/link';

export default function HomePage() {
  return (
    <main id="main-content">
      <header className="border-b border-gray-200">
        <nav
          className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8"
          aria-label="Main navigation"
        >
          <Link href="/" className="text-xl font-bold text-brand-700">
            AccessShield India
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/login" className="text-sm font-medium text-gray-700 hover:text-brand-600">
              Sign in
            </Link>
            <Link
              href="/signup"
              className="inline-flex items-center justify-center rounded-md bg-brand-600 px-4 py-2 text-base font-medium text-white hover:bg-brand-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2"
            >
              Get started
            </Link>
          </div>
        </nav>
      </header>

      <section className="mx-auto max-w-7xl px-4 py-24 text-center sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
          Make your digital products accessible to every Indian
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600">
          AI-powered WCAG 2.2 AA compliance scanning, remediation tracking, and certification —
          built for RPwD Act 2016 and GIGW 3.0 requirements.
        </p>
        <div className="mt-10 flex items-center justify-center gap-4">
          <Link
            href="/signup"
            className="inline-flex items-center justify-center rounded-md bg-brand-600 px-6 py-3 text-lg font-medium text-white hover:bg-brand-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2"
          >
            Start free trial
          </Link>
          <Link
            href="/demo"
            className="inline-flex items-center justify-center rounded-md border border-brand-300 bg-white px-6 py-3 text-lg font-medium text-brand-700 hover:bg-brand-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2"
          >
            Book a demo
          </Link>
        </div>
      </section>
    </main>
  );
}
