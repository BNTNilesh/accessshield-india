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
    loading: () => (
      <Skeleton className="h-12 w-56 rounded-md" aria-label="Loading report generator" />
    ),
  },
);

export const metadata = {
  title: 'Reports | AccessShield India',
  description: 'Generate and download accessibility compliance reports',
};

export default function ReportsPage() {
  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-primary-50 to-white border border-gray-200 rounded-2xl p-8 shadow-lg">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-2">Reports</h1>
        <p className="text-lg text-gray-600 font-medium">
          Generate comprehensive accessibility compliance reports for your assets
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 shadow-lg p-6">
        <GenerateReportPanel />
      </div>

      <Suspense fallback={<Skeleton className="h-96 rounded-xl" />}>
        <div className="bg-white rounded-2xl border border-gray-200 shadow-lg overflow-hidden">
          <ReportsList />
        </div>
      </Suspense>
    </div>
  );
}
