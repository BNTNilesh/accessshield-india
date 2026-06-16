import { Suspense } from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { Skeleton } from '@accessshield/ui';
import { ViolationDetail } from '@/components/dashboard/issues/ViolationDetail';
import { AIFixPanel } from '@/components/dashboard/issues/AIFixPanel';
import { StatusWorkflow } from '@/components/dashboard/issues/StatusWorkflow';
import { IssueMetadata } from '@/components/dashboard/issues/IssueMetadata';
import { CommentThread } from '@/components/dashboard/issues/CommentThread';

interface IssueDetailPageProps {
  params: {
    id: string;
  };
}

export async function generateMetadata({ params }: IssueDetailPageProps) {
  return {
    title: `Issue ${params.id} | AccessShield India`,
    description: 'View and manage accessibility issue details',
  };
}

export default function IssueDetailPage({ params }: IssueDetailPageProps) {
  return (
    <div className="space-y-6">
      <nav aria-label="Breadcrumb">
        <ol className="flex items-center gap-2 text-sm">
          <li>
            <Link
              href="/dashboard/issues"
              className="text-primary-600 hover:text-primary-700 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 focus-visible:ring-offset-2"
            >
              Issues
            </Link>
          </li>
          <li aria-hidden="true">
            <ChevronRight className="h-4 w-4 text-text-tertiary" />
          </li>
          <li aria-current="page">
            <span className="text-text-primary font-medium">Issue #{params.id.slice(0, 8)}</span>
          </li>
        </ol>
      </nav>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <Suspense fallback={<Skeleton className="h-96 rounded-lg" />}>
            <ViolationDetail issueId={params.id} />
          </Suspense>

          <Suspense fallback={<Skeleton className="h-64 rounded-lg" />}>
            <AIFixPanel issueId={params.id} />
          </Suspense>
        </div>

        <div className="space-y-6">
          <Suspense fallback={<Skeleton className="h-64 rounded-lg" />}>
            <StatusWorkflow issueId={params.id} />
          </Suspense>

          <Suspense fallback={<Skeleton className="h-96 rounded-lg" />}>
            <IssueMetadata issueId={params.id} />
          </Suspense>

          <Suspense fallback={<Skeleton className="h-64 rounded-lg" />}>
            <CommentThread issueId={params.id} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
