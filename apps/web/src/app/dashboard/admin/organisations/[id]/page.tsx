'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Link from 'next/link';
import {
  createAdminOrgUser,
  fetchAdminOrganisation,
  fetchAdminOrgUsers,
  updateAdminOrganisation,
} from '@/lib/api/admin';
import { Button, Input, Select } from '@accessshield/ui';

const PLAN_OPTIONS = [
  { value: 'trial', label: 'Trial' },
  { value: 'starter', label: 'Starter' },
  { value: 'professional', label: 'Professional' },
  { value: 'enterprise', label: 'Enterprise' },
  { value: 'government', label: 'Government' },
];

const ROLE_OPTIONS = [
  { value: 'customer_admin', label: 'Customer Admin' },
  { value: 'accessibility_officer', label: 'Accessibility Officer' },
  { value: 'developer', label: 'Developer' },
  { value: 'auditor', label: 'Auditor' },
];

export default function AdminOrganisationDetailPage() {
  const params = useParams<{ id: string }>();
  const orgId = params.id;
  const queryClient = useQueryClient();

  const [userEmail, setUserEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [userRole, setUserRole] = useState('customer_admin');
  const [userError, setUserError] = useState('');

  const { data: org, isLoading: orgLoading } = useQuery({
    queryKey: ['admin', 'organisation', orgId],
    queryFn: () => fetchAdminOrganisation(orgId),
  });

  const { data: users = [], isLoading: usersLoading } = useQuery({
    queryKey: ['admin', 'organisation', orgId, 'users'],
    queryFn: () => fetchAdminOrgUsers(orgId),
  });

  const updateOrgMutation = useMutation({
    mutationFn: (input: { planTier?: string; isActive?: boolean }) =>
      updateAdminOrganisation(orgId, input),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['admin', 'organisation', orgId] }),
  });

  const createUserMutation = useMutation({
    mutationFn: () =>
      createAdminOrgUser(orgId, {
        email: userEmail,
        password: userPassword,
        fullName: userName,
        role: userRole,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'organisation', orgId, 'users'] });
      setUserEmail('');
      setUserName('');
      setUserPassword('');
      setUserError('');
    },
    onError: (err: Error) => setUserError(err.message),
  });

  if (orgLoading) {
    return <p className="text-text-secondary">Loading organisation...</p>;
  }

  if (!org) {
    return (
      <p className="text-error-700" role="alert">
        Organisation not found.
      </p>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <Link
          href="/dashboard/admin/organisations"
          className="text-sm text-primary-600 hover:text-primary-700"
        >
          ← Back to organisations
        </Link>
        <h1 className="mt-4 text-3xl font-bold text-text-primary">{org.name}</h1>
        <p className="mt-2 text-text-secondary">Slug: {org.slug}</p>
      </div>

      <section className="rounded-lg border border-border bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-text-primary">Organisation settings</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <Select
            label="Plan tier"
            options={PLAN_OPTIONS}
            value={org.planTier}
            onChange={(value) => updateOrgMutation.mutate({ planTier: value })}
          />
          <div className="flex items-end gap-3">
            <Button
              variant={org.isActive ? 'outline' : 'primary'}
              onClick={() => updateOrgMutation.mutate({ isActive: !org.isActive })}
            >
              {org.isActive ? 'Suspend organisation' : 'Activate organisation'}
            </Button>
          </div>
        </div>
      </section>

      <section className="rounded-lg border border-border bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-text-primary">Users</h2>

        {usersLoading ? (
          <p className="mt-4 text-text-secondary">Loading users...</p>
        ) : (
          <ul className="mt-4 divide-y divide-border">
            {users.map((user) => (
              <li key={user.id} className="flex items-center justify-between py-3 text-sm">
                <div>
                  <p className="font-medium text-text-primary">{user.fullName ?? user.email}</p>
                  <p className="text-text-secondary">
                    {user.email} · {user.role}
                  </p>
                </div>
                <span className="text-text-tertiary">{user.isActive ? 'Active' : 'Inactive'}</span>
              </li>
            ))}
          </ul>
        )}

        <div className="mt-6 space-y-4 border-t border-border pt-6">
          <h3 className="text-lg font-medium text-text-primary">Add user</h3>
          <Input label="Full name" value={userName} onChange={(e) => setUserName(e.target.value)} />
          <Input
            label="Email"
            type="email"
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
          />
          <Input
            label="Temporary password"
            type="password"
            value={userPassword}
            onChange={(e) => setUserPassword(e.target.value)}
          />
          <Select label="Role" options={ROLE_OPTIONS} value={userRole} onChange={setUserRole} />
          {userError && (
            <p className="text-sm text-error-700" role="alert">
              {userError}
            </p>
          )}
          <Button
            variant="primary"
            disabled={createUserMutation.isPending || !userEmail || !userPassword || !userName}
            onClick={() => createUserMutation.mutate()}
          >
            {createUserMutation.isPending ? 'Creating user...' : 'Create user'}
          </Button>
        </div>
      </section>
    </div>
  );
}
