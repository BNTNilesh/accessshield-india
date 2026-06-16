import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import { Skeleton } from '@accessshield/ui';
import { ReportsList } from '@/components/dashboard/reports/ReportsList';

const GenerateReportPanel = dynamic(
  () =>
    import('@/components/dashboard/reports/GenerateReportPanel').then((mod) => ({
      default: mod.GenerateReportPanel,
    })),
  {
    ssr: false,
    loading: () => <Skeleton className="h-48 rounded-lg" aria-label="Loading report generator" />,
  },
);

export const metadata = {
  title: 'Reports | AccessShield India',
  description: 'Generate and download accessibility compliance reports',
};

export default function ReportsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-text-primary">Reports</h1>
        <p className="mt-2 text-base text-text-secondary">
          Generate comprehensive accessibility compliance reports for your assets
        </p>
      </div>

      <GenerateReportPanel />

      <Suspense fallback={<Skeleton className="h-96 rounded-lg" />}>
        <ReportsList />
      </Suspense>
    </div>
  );
}
