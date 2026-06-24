import Link from 'next/link';
import { formatInr, PRICING_CATALOG } from '@/lib/pricing/catalog';

export function WidgetComplianceDisclaimer() {
  return (
    <aside
      className="mt-8 rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm leading-normal text-amber-900"
      role="note"
      aria-label="Accessibility widget compliance notice"
    >
      <p>
        <strong>Important:</strong> The accessibility widget is a user-experience enhancement — not
        a compliance mechanism. It does not, on its own, make a site RPwD-, SEBI-, or
        GIGW-compliant. True compliance for Indian regulations requires a full{' '}
        <Link
          href="/contact?service=audit"
          className="font-medium underline hover:text-amber-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 focus-visible:ring-offset-2"
        >
          Compliance Website Audit &amp; Scan ({formatInr(PRICING_CATALOG.rules.auditPriceInr)})
        </Link>{' '}
        and code-level remediation before ongoing monitoring.
      </p>
    </aside>
  );
}
