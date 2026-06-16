import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { DashboardHome } from '@/components/dashboard/home/DashboardHome';
import { getDashboardStats, listAssets } from '@/lib/api/client';
import { getServerAccessToken } from '@/lib/supabase/server';

export default async function DashboardPage() {
  const queryClient = new QueryClient();

  try {
    const token = await getServerAccessToken();
    await Promise.all([
      queryClient.prefetchQuery({
        queryKey: ['dashboard-stats'],
        queryFn: () => getDashboardStats(token),
      }),
      queryClient.prefetchQuery({
        queryKey: ['assets'],
        queryFn: () => listAssets(token),
      }),
    ]);
  } catch {
    // Client hooks will surface auth/API errors after hydration.
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <DashboardHome />
    </HydrationBoundary>
  );
}
