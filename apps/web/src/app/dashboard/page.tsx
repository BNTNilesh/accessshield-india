import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import type { AccessShieldJwtClaims } from '@accessshield/types';

export default async function DashboardPage() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  const claims = user.app_metadata as Partial<AccessShieldJwtClaims>;

  return (
    <main id="main-content" className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
      <p className="mt-2 text-gray-600">Welcome back{user.email ? `, ${user.email}` : ''}.</p>

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
      </dl>
    </main>
  );
}
