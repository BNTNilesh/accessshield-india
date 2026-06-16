import { Suspense } from 'react';
import { IssueFilters } from '@/components/dashboard/issues/IssueFilters';
import { IssueList } from '@/components/dashboard/issues/IssueList';
import { IssueStats } from '@/components/dashboard/issues/IssueStats';
import { Skeleton } from '@accessshield/ui';

export const metadata = {
  title: 'Issues | AccessShield India',
  description: 'Track and manage accessibility violations across all your assets',
};

interface IssuesPageProps {
  searchParams: {
    search?: string;
    status?: string;
    severity?: string;
    assignee?: string;
    assetId?: string;
    wcagCriterion?: string;
    dateFrom?: string;
    dateTo?: string;
    page?: string;
  };
}

export default function IssuesPage({ searchParams }: IssuesPageProps) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-text-primary">Issues</h1>
        <p className="mt-2 text-base text-text-secondary">
          Track and manage accessibility violations across all your assets
        </p>
      </div>

      <Suspense
        fallback={
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-24 rounded-lg" />
            ))}
          </div>
        }
      >
        <IssueStats />
      </Suspense>

      <IssueFilters searchParams={searchParams} />

      <Suspense fallback={<Skeleton className="h-96 rounded-lg" />}>
        <IssueList searchParams={searchParams} />
      </Suspense>
    </div>
  );
}
