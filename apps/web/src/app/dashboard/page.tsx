import Link from 'next/link';
import { redirect } from 'next/navigation';
import { Alert } from '@accessshield/ui';
import { getServerAuthContext } from '@/lib/auth/server';

export default async function DashboardPage() {
  const auth = await getServerAuthContext();

  if (!auth) {
    redirect('/login');
  }

  const { user, claims, hasRequiredClaims, claimsSource } = auth;

  return (
    <>
      <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
      <p className="mt-2 text-gray-600">Welcome back{user.email ? `, ${user.email}` : ''}.</p>

      {hasRequiredClaims && claimsSource === 'database' && (
        <Alert variant="info" title="Using database claims (local dev)" className="mt-6">
          Organisation and role were loaded from the local <code className="text-sm">users</code>{' '}
          table. For production, set Supabase App Metadata or enable the custom access token hook.
        </Alert>
      )}

      {!hasRequiredClaims && (
        <Alert variant="warning" title="Missing organisation claims" className="mt-6">
          No <code className="text-sm">user_role</code> / <code className="text-sm">org_id</code> in
          your JWT and no matching row in the local database. Run{' '}
          <code className="text-sm">pnpm db:seed</code> and ensure API Postgres is on port{' '}
          <code className="text-sm">5433</code>, or set Supabase App Metadata and sign in again.
        </Alert>
      )}

      <div className="mt-8">
        <Link
          href="/dashboard/scans/test"
          className="inline-flex min-h-11 items-center rounded-md bg-primary-600 px-4 py-2 text-base font-medium text-white hover:bg-primary-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 focus-visible:ring-offset-2"
        >
          Open scanner test lab
        </Link>
      </div>

      <dl className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="rounded-lg border border-gray-200 p-4">
          <dt className="text-sm font-medium text-gray-500">Organisation ID</dt>
          <dd className="mt-1 font-mono text-sm text-gray-900">{claims.org_id ?? '—'}</dd>
        </div>
        <div className="rounded-lg border border-gray-200 p-4">
          <dt className="text-sm font-medium text-gray-500">Role</dt>
          <dd className="mt-1 text-sm capitalize text-gray-900">
            {claims.user_role?.replace(/_/g, ' ') ?? '—'}
          </dd>
        </div>
        <div className="rounded-lg border border-gray-200 p-4 sm:col-span-2">
          <dt className="text-sm font-medium text-gray-500">Auth user ID</dt>
          <dd className="mt-1 font-mono text-xs text-gray-700">{user.id}</dd>
        </div>
      </dl>
    </>
  );
}
