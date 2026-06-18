import { createClient } from '@/lib/supabase/client';
import { apiUrl } from './base';
import type {
  ApiResponse,
  Asset,
  CreateAssetInput,
  CreateScanInput,
  CreateScanResult,
  ListScansParams,
  ScanDetail,
  ScanListItem,
  ViolationRow,
} from './types';
import { ApiError } from './types';

export type {
  Asset,
  CreateAssetInput,
  CreateScanInput,
  CreateScanResult,
  ListScansParams,
  ScanDetail,
  ScanListItem,
  ViolationRow,
} from './types';

/**
 * Retrieve the current Supabase access token for API calls.
 * Concurrent callers share one in-flight session read.
 */
let tokenPromise: Promise<string> | null = null;

export async function getAccessToken(): Promise<string> {
  if (!tokenPromise) {
    tokenPromise = (async () => {
      const supabase = createClient();
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();

      if (error || !session?.access_token) {
        throw new Error('Not authenticated — please sign in again.');
      }

      return session.access_token;
    })().finally(() => {
      tokenPromise = null;
    });
  }

  return tokenPromise;
}

async function apiFetch<T>(path: string, token: string, init?: RequestInit): Promise<T> {
  const response = await fetch(apiUrl(path), {
    ...init,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      ...init?.headers,
    },
  });

  if (!response.ok) {
    let problem: ApiError['problem'];
    try {
      problem = (await response.json()) as ApiError['problem'];
    } catch {
      problem = {
        type: 'https://api.accessshield.in/problems/unknown',
        title: 'Request failed',
        status: response.status,
        detail: response.statusText,
        timestamp: new Date().toISOString(),
      };
    }
    throw new ApiError(problem);
  }

  return response.json() as Promise<T>;
}

/** List assets for the current organisation */
export async function listAssets(token: string): Promise<Asset[]> {
  const response = await apiFetch<ApiResponse<Asset[]>>('/api/v1/assets', token);
  return response.data;
}

/** Register a new scannable asset */
export async function createAsset(token: string, input: CreateAssetInput): Promise<Asset> {
  const response = await apiFetch<ApiResponse<Asset>>('/api/v1/assets', token, {
    method: 'POST',
    body: JSON.stringify(input),
  });
  return response.data;
}

/** Queue a new accessibility scan */
export async function createScan(token: string, input: CreateScanInput): Promise<CreateScanResult> {
  const response = await apiFetch<ApiResponse<CreateScanResult>>('/api/v1/scans', token, {
    method: 'POST',
    body: JSON.stringify(input),
  });
  return response.data;
}

/** Fetch scan status and optional live progress */
export async function getScan(token: string, scanId: string): Promise<ScanDetail> {
  const response = await apiFetch<ApiResponse<ScanDetail>>(`/api/v1/scans/${scanId}`, token);
  return response.data;
}

/** Fetch paginated scan history for the organisation */
export async function listScans(
  token: string,
  params?: ListScansParams,
): Promise<{ rows: ScanListItem[]; meta: ApiResponse<ScanListItem[]>['meta'] }> {
  const search = new URLSearchParams();
  if (params?.page) search.set('page', String(params.page));
  if (params?.limit) search.set('limit', String(params.limit));
  if (params?.status) search.set('status', params.status);
  if (params?.asset_id) search.set('asset_id', params.asset_id);

  const query = search.toString();
  const path = `/api/v1/scans${query ? `?${query}` : ''}`;
  const response = await apiFetch<ApiResponse<ScanListItem[]>>(path, token);
  return { rows: response.data, meta: response.meta };
}

/** Fetch paginated violations for a completed scan */
export async function listViolations(
  token: string,
  scanId: string,
  params?: { page?: number; limit?: number; severity?: string },
): Promise<{ rows: ViolationRow[]; meta: ApiResponse<ViolationRow[]>['meta'] }> {
  const search = new URLSearchParams();
  if (params?.page) search.set('page', String(params.page));
  if (params?.limit) search.set('limit', String(params.limit));
  if (params?.severity) search.set('severity', params.severity);

  const query = search.toString();
  const path = `/api/v1/scans/${scanId}/violations${query ? `?${query}` : ''}`;
  const response = await apiFetch<ApiResponse<ViolationRow[]>>(path, token);
  return { rows: response.data, meta: response.meta };
}

/** Request cancellation of a pending or running scan */
export async function cancelScan(token: string, scanId: string): Promise<void> {
  await apiFetch<ApiResponse<{ message: string }>>(`/api/v1/scans/${scanId}/cancel`, token, {
    method: 'POST',
  });
}

/** Download a generated report file (authenticated — required for local dev storage). */
export async function downloadReportFile(reportId: string, filename: string): Promise<void> {
  const token = await getAccessToken();

  let response = await fetch(apiUrl(`/api/v1/reports/${reportId}/file`), {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (response.status === 404) {
    const meta = await apiFetch<ApiResponse<{ downloadUrl: string }>>(
      `/api/v1/reports/${reportId}/download`,
      token,
    );
    if (meta.data.downloadUrl) {
      window.open(meta.data.downloadUrl, '_blank', 'noopener,noreferrer');
      return;
    }
  }

  if (!response.ok) {
    throw new Error('Failed to download report');
  }

  const blob = await response.blob();
  const objectUrl = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = objectUrl;
  anchor.download = filename;
  anchor.click();
  URL.revokeObjectURL(objectUrl);
}

/** Check API health (no auth required) */
export async function checkApiHealth(): Promise<{ status: string; db: string; redis: string }> {
  const response = await fetch(apiUrl('/health'));
  if (!response.ok) {
    throw new Error('API health check failed');
  }
  return response.json() as Promise<{ status: string; db: string; redis: string }>;
}

/** Dashboard aggregated stats */
export interface DashboardStats {
  score: number | null;
  scoreDelta: number | null;
  openIssues: number;
  criticalIssues: number;
  assetsCount: number;
  lastScanDate: string | null;
  recentActivity: DashboardActivity[];
}

export interface DashboardActivity {
  id: string;
  action: string;
  resourceType: string;
  resourceId: string | null;
  userId: string | null;
  userName: string | null;
  description: string;
  createdAt: string;
}

export async function getDashboardStats(token: string): Promise<DashboardStats> {
  const response = await apiFetch<ApiResponse<DashboardStats>>('/api/v1/dashboard/stats', token);
  return response.data;
}
