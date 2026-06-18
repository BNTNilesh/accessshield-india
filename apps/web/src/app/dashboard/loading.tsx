import { Skeleton } from '@accessshield/ui';

export default function DashboardLoading() {
  return (
    <div className="space-y-8" aria-busy="true" aria-label="Loading dashboard">
      <Skeleton className="h-32 rounded-2xl" />
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <Skeleton key={i} className="h-40 rounded-xl" />
        ))}
      </div>
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <Skeleton className="h-80 rounded-xl lg:col-span-1" />
        <Skeleton className="h-80 rounded-xl lg:col-span-2" />
      </div>
    </div>
  );
}
