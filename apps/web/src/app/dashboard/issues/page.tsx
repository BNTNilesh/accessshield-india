import { Suspense } from 'react';
import { IssueFilters } from '@/components/dashboard/issues/IssueFilters';
import { IssueList } from '@/components/dashboard/issues/IssueList';
import { IssueStats } from '@/components/dashboard/issues/IssueStats';
import { LoadingState } from '@/components/dashboard/common/LoadingState';
import type { IssueFilters as IssueFilterParams } from '@/lib/api/types';

export const metadata = {
  title: 'Issues | AccessShield India',
  description: 'Track and manage accessibility violations across all your assets',
};

interface IssuesPageProps {
  searchParams: IssueFilterParams;
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
        fallback={<LoadingState message="Loading issue statistics…" variant="inline" size="sm" />}
      >
        <IssueStats />
      </Suspense>

      <IssueFilters searchParams={searchParams} />

      <Suspense fallback={<LoadingState message="Loading issues…" variant="card" />}>
        <IssueList searchParams={searchParams} />
      </Suspense>
    </div>
  );
}
