'use client';

import { useQuery, useMutation, useQueryClient, type UseQueryOptions } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import {
  listAssets,
  createAsset,
  deleteAsset,
  createScan,
  getScan,
  listScans,
  listViolations,
  getAccessToken,
  getDashboardStats,
  type CreateAssetInput,
  type CreateScanInput,
  type Asset,
  type ScanDetail,
  type ScanListItem,
  type ListScansParams,
  type ViolationRow,
  type DashboardStats,
  type DashboardActivity,
} from '@/lib/api/client';
import { ApiError } from '@/lib/api/types';

/** Assets */
export function useAssets() {
  return useQuery({
    queryKey: ['assets'],
    queryFn: async () => {
      const token = await getAccessToken();
      return listAssets(token);
    },
  });
}

export function useCreateAsset() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: CreateAssetInput) => {
      const token = await getAccessToken();
      return createAsset(token, input);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['assets'] });
      toast.success('Asset created successfully');
    },
    onError: (error: ApiError) => {
      toast.error(error.message);
    },
  });
}

export function useDeleteAsset() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: async ({ assetId }: { assetId: string; redirectTo?: string }) => {
      const token = await getAccessToken();
      await deleteAsset(token, assetId);
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['assets'] });
      queryClient.invalidateQueries({ queryKey: ['issues'] });
      queryClient.invalidateQueries({ queryKey: ['scans'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard-stats'] });
      toast.success('Asset deleted');
      if (variables.redirectTo) {
        router.push(variables.redirectTo);
      }
    },
    onError: (error: ApiError) => {
      toast.error(error.message);
    },
  });
}

/** Scans */
export function useScan(scanId: string | null, options?: Partial<UseQueryOptions<ScanDetail>>) {
  return useQuery({
    queryKey: ['scans', scanId],
    queryFn: async () => {
      if (!scanId) throw new Error('Scan ID required');
      const token = await getAccessToken();
      return getScan(token, scanId);
    },
    enabled: Boolean(scanId),
    refetchInterval: (query) => {
      const status = query.state.data?.status;
      const isActive = status === 'running' || status === 'pending';
      return isActive ? 3000 : false;
    },
    ...options,
  });
}

export function useTriggerScan() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: async (input: CreateScanInput) => {
      const token = await getAccessToken();
      return createScan(token, input);
    },
    onSuccess: (result, variables) => {
      queryClient.invalidateQueries({ queryKey: ['scans'] });
      queryClient.invalidateQueries({ queryKey: ['scans', variables.asset_id] });
      toast.success('Scan started successfully');
      router.push(`/dashboard/scans/${result.scanId}`);
    },
    onError: (error: ApiError) => {
      toast.error(error.message);
    },
  });
}

export function useScans(params?: ListScansParams) {
  return useQuery({
    queryKey: ['scans', params],
    queryFn: async () => {
      const token = await getAccessToken();
      return listScans(token, params);
    },
    refetchInterval: (query) => {
      const rows = query.state.data?.rows ?? [];
      const hasActive = rows.some((scan) => scan.status === 'running' || scan.status === 'pending');
      return hasActive ? 5000 : false;
    },
  });
}

/** Violations */
export function useViolations(
  scanId: string | null,
  params?: { page?: number; limit?: number; severity?: string },
  scanStatus?: ScanDetail['status'],
) {
  return useQuery({
    queryKey: ['violations', scanId, params],
    queryFn: async () => {
      if (!scanId) throw new Error('Scan ID required');
      const token = await getAccessToken();
      return listViolations(token, scanId, params);
    },
    enabled: Boolean(scanId) && scanStatus === 'completed',
  });
}

/** Dashboard stats */
export type { DashboardStats, DashboardActivity };
/** @deprecated Use DashboardActivity */
export type Activity = DashboardActivity;

export function useDashboardStats() {
  return useQuery({
    queryKey: ['dashboard-stats'],
    queryFn: async () => {
      const token = await getAccessToken();
      return getDashboardStats(token);
    },
  });
}
