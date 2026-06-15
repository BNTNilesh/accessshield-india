import type {
  ApiResponse,
  IssueSeverity,
  PaginationMeta,
  ProblemDetails,
} from '@accessshield/types';

/** Compliance standards supported by the scanner */
export type ComplianceStandard = 'WCAG22' | 'IS17802' | 'GIGW3' | 'SEBI';

export type WcagLevel = 'A' | 'AA' | 'AAA';

export type ScanType = 'full' | 'incremental' | 'single_page';

export interface Asset {
  id: string;
  name: string;
  url: string;
  type: string;
  description?: string | null;
  isActive?: boolean;
  lastScannedAt?: string | null;
  createdAt: string;
}

export interface CreateAssetInput {
  name: string;
  url: string;
  type?: 'website' | 'web_app' | 'mobile_app' | 'document' | 'pdf';
  description?: string;
}

export interface CreateScanInput {
  asset_id: string;
  scan_type?: ScanType;
  wcag_level?: WcagLevel;
  standards?: ComplianceStandard[];
  max_pages?: number;
  exclude_paths?: string[];
}

export interface CreateScanResult {
  scanId: string;
  status: string;
  message: string;
  previousScanId?: string;
}

export interface ScanProgress {
  pagesScanned: number;
  pagesTotal: number;
  currentUrl: string;
}

export interface ScanDetail {
  id: string;
  status: 'pending' | 'running' | 'completed' | 'failed';
  wcagLevel: string;
  wcagVersion: string;
  pagesScanned: number;
  violationCount: number;
  score: number | null;
  startedAt: string | null;
  completedAt: string | null;
  errorMessage: string | null;
  createdAt: string;
  assetId: string;
  progress?: ScanProgress;
}

export interface ViolationRow {
  id: string;
  ruleId: string;
  impact: IssueSeverity;
  description: string;
  helpUrl: string;
  wcagCriteria: string[];
  selector: string;
  html: string;
  pageUrl: string;
  createdAt: string;
}

export class ApiError extends Error {
  constructor(public readonly problem: ProblemDetails) {
    super(problem.detail ?? problem.title);
    this.name = 'ApiError';
  }
}

export type { ApiResponse, PaginationMeta, ProblemDetails };
