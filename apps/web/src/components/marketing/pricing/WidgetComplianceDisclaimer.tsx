export function WidgetComplianceDisclaimer() {
  return (
    <aside
      className="mt-8 rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm leading-normal text-amber-900"
      role="note"
      aria-label="Accessibility widget compliance notice"
    >
      <p>
        <strong>Important:</strong> The accessibility widget improves user experience but does not,
        by itself, certify RPwD, SEBI, or GIGW compliance. Full compliance requires scanning,
        remediation, and documented audit evidence.
      </p>
    </aside>
  );
}
