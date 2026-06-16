'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import type { ScanDetail } from '@/lib/api/types';

export interface ScanProgress {
  status: string;
  pagesScanned: number;
  pagesTotal: number;
  currentUrl: string;
  score: number | null;
}

/**
 * Subscribe to real-time scan progress updates
 */
export function useScanProgress(scanId: string | null): ScanProgress | null {
  const [progress, setProgress] = useState<ScanProgress | null>(null);

  useEffect(() => {
    if (!scanId) return;

    const supabase = createClient();

    const channel = supabase
      .channel(`scan:${scanId}`)
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'scans',
          filter: `id=eq.${scanId}`,
        },
        (payload) => {
          const scan = payload.new as ScanDetail;
          setProgress({
            status: scan.status,
            pagesScanned: scan.pagesScanned,
            pagesTotal: scan.progress?.pagesTotal ?? 0,
            currentUrl: scan.progress?.currentUrl ?? '',
            score: scan.score,
          });
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [scanId]);

  return progress;
}

export interface Notification {
  id: string;
  action: string;
  resourceType: string;
  description: string;
  createdAt: string;
}

/**
 * Subscribe to real-time notifications for the organization
 */
export function useNotifications(orgId: string | null): Notification[] {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    if (!orgId) return;

    const supabase = createClient();

    const channel = supabase
      .channel(`org:${orgId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'audit_logs',
          filter: `organisation_id=eq.${orgId}`,
        },
        (payload) => {
          const log = payload.new as any;
          const notification: Notification = {
            id: log.id,
            action: log.action,
            resourceType: log.resource_type,
            description: formatAuditLogDescription(log),
            createdAt: log.created_at,
          };
          setNotifications((prev) => [notification, ...prev].slice(0, 10));
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [orgId]);

  return notifications;
}

function formatAuditLogDescription(log: any): string {
  const { action, resource_type, metadata } = log;

  const descriptions: Record<string, string> = {
    'scan.completed': `Scan completed on ${metadata?.assetName ?? 'asset'}`,
    'scan.failed': `Scan failed on ${metadata?.assetName ?? 'asset'}`,
    'asset.created': `New asset created: ${metadata?.assetName ?? 'Unknown'}`,
    'issue.assigned': `Issue assigned to ${metadata?.assigneeName ?? 'user'}`,
    'certificate.issued': `Certificate issued for ${metadata?.assetName ?? 'asset'}`,
    'report.generated': `Report generated for ${metadata?.assetName ?? 'asset'}`,
  };

  const key = `${resource_type}.${action}`;
  return descriptions[key] || `${action} on ${resource_type}`;
}

/**
 * Subscribe to real-time issue updates for the organization
 */
export function useIssueUpdates(orgId: string | null, onUpdate: (issue: any) => void): void {
  useEffect(() => {
    if (!orgId) return;

    const supabase = createClient();

    const channel = supabase
      .channel(`issues:${orgId}`)
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'issues',
          filter: `organisation_id=eq.${orgId}`,
        },
        (payload) => {
          onUpdate(payload.new);
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [orgId, onUpdate]);
}
