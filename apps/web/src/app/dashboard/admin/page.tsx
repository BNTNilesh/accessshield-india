'use client';

import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { fetchAdminStats } from '@/lib/api/admin';
import { getButtonStyle, getButtonThemeClassName } from '@accessshield/ui';
import { LoadingState } from '@/components/dashboard/common/LoadingState';

export default function AdminHomePage() {
  const {
    data: stats,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['admin', 'stats'],
    queryFn: fetchAdminStats,
  });

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-text-primary">Platform Admin</h1>
          <p className="mt-2 text-text-secondary">
            Manage organisations and users across AccessShield India.
          </p>
        </div>
        <Link
          href="/dashboard/admin/organisations"
          className={getButtonThemeClassName('primary', 'md')}
          data-as-btn="primary"
          style={getButtonStyle('primary')}
        >
          Manage organisations
        </Link>
      </div>

      {isLoading && <LoadingState message="Loading platform stats…" variant="inline" size="sm" />}
      {error && (
        <p className="text-error-700" role="alert">
          Failed to load stats.
        </p>
      )}

      {stats && (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          <div className="rounded-lg border border-border bg-white p-6 shadow-sm">
            <p className="text-sm font-medium text-text-secondary">Organisations</p>
            <p className="mt-2 text-3xl font-bold text-text-primary">{stats.organisations}</p>
          </div>
          <div className="rounded-lg border border-border bg-white p-6 shadow-sm">
            <p className="text-sm font-medium text-text-secondary">Users</p>
            <p className="mt-2 text-3xl font-bold text-text-primary">{stats.users}</p>
          </div>
          <div className="rounded-lg border border-border bg-white p-6 shadow-sm">
            <p className="text-sm font-medium text-text-secondary">Scans this month</p>
            <p className="mt-2 text-3xl font-bold text-text-primary">{stats.scansThisMonth}</p>
          </div>
        </div>
      )}
    </div>
  );
}
