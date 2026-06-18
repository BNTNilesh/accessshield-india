import { getDashboardStats, listAssets, listScans, type DashboardStats } from '@/lib/api/client';
import { getServerAccessToken } from '@/lib/supabase/server';
import { makeQueryClient } from '@/lib/query-client';
import type { Asset } from '@/lib/api/types';

async function serverToken(): Promise<string> {
  return getServerAccessToken();
}

/** Prefetch dashboard home queries in parallel (one auth read). */
export async function prefetchDashboardHome() {
  const queryClient = makeQueryClient();
  const token = await serverToken();

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

  return queryClient;
}

export async function prefetchAssets() {
  const queryClient = makeQueryClient();
  const token = await serverToken();

  await queryClient.prefetchQuery({
    queryKey: ['assets'],
    queryFn: () => listAssets(token),
  });

  return queryClient;
}

export async function prefetchScans(limit = 50) {
  const queryClient = makeQueryClient();
  const token = await serverToken();

  await queryClient.prefetchQuery({
    queryKey: ['scans', { limit }],
    queryFn: () => listScans(token, { limit }),
  });

  return queryClient;
}

export type { DashboardStats, Asset };
