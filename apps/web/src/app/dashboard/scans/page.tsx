'use client';

import Link from 'next/link';
import { FlaskConical } from 'lucide-react';
import { Skeleton } from '@accessshield/ui';
import { ScanHistoryTable } from '@/components/dashboard/scans/ScanHistoryTable';
import { useScans } from '@/lib/hooks/useApi';

export default function ScansPage() {
  const { data, isLoading } = useScans({ limit: 50 });
  const scans = data?.rows ?? [];
  const total = data?.meta?.total ?? scans.length;

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-96" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-text-primary">Scans</h1>
          <p className="mt-2 text-text-secondary">
            History of accessibility scans and their results across your assets
          </p>
        </div>
        <Link
          href="/dashboard/scans/test"
          className="inline-flex min-h-11 items-center justify-center rounded-md border border-border bg-white px-4 py-2 text-sm font-medium text-primary-dark hover:bg-primary-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 focus-visible:ring-offset-2"
        >
          <FlaskConical className="mr-2 h-4 w-4" aria-hidden="true" />
          Scanner test lab
        </Link>
      </div>

      <ScanHistoryTable scans={scans} isLoading={isLoading} total={total} />
    </div>
  );
}
