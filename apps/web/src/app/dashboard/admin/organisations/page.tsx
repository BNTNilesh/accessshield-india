'use client';

import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Link from 'next/link';
import {
  createAdminOrganisation,
  fetchAdminOrganisations,
  type AdminOrganisation,
} from '@/lib/api/admin';
import { Button, Input, Modal, Select } from '@accessshield/ui';
import { LoadingState } from '@/components/dashboard/common/LoadingState';

const PLAN_OPTIONS = [
  { value: 'trial', label: 'Trial' },
  { value: 'starter', label: 'Starter' },
  { value: 'widget', label: 'Widget' },
  { value: 'professional', label: 'Professional' },
  { value: 'enterprise', label: 'Enterprise' },
  { value: 'government', label: 'Government' },
];

export default function AdminOrganisationsPage() {
  const queryClient = useQueryClient();
  const [modalOpen, setModalOpen] = useState(false);
  const [name, setName] = useState('');
  const [billingEmail, setBillingEmail] = useState('');
  const [planTier, setPlanTier] = useState('starter');
  const [error, setError] = useState('');

  const { data, isLoading } = useQuery({
    queryKey: ['admin', 'organisations'],
    queryFn: () => fetchAdminOrganisations(),
  });

  const createMutation = useMutation({
    mutationFn: () =>
      createAdminOrganisation({
        name,
        planTier,
        billingEmail: billingEmail || undefined,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'organisations'] });
      setModalOpen(false);
      setName('');
      setBillingEmail('');
      setPlanTier('starter');
      setError('');
    },
    onError: (err: Error) => setError(err.message),
  });

  const orgs: AdminOrganisation[] = data?.data ?? [];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-text-primary">Organisations</h1>
          <p className="mt-2 text-text-secondary">Create and manage customer tenants.</p>
        </div>
        <Button variant="primary" onClick={() => setModalOpen(true)}>
          Create organisation
        </Button>
      </div>

      {isLoading ? (
        <LoadingState message="Loading organisations…" variant="card" />
      ) : (
        <div className="overflow-hidden rounded-lg border border-border bg-white shadow-sm">
          <table className="min-w-full divide-y divide-border">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold text-text-primary">
                  Name
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-text-primary">
                  Plan
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-text-primary">
                  Status
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-text-primary">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {orgs.map((org) => (
                <tr key={org.id}>
                  <td className="px-4 py-3 text-sm text-text-primary">{org.name}</td>
                  <td className="px-4 py-3 text-sm text-text-secondary">{org.planTier}</td>
                  <td className="px-4 py-3 text-sm text-text-secondary">
                    {org.isActive ? 'Active' : 'Suspended'}
                  </td>
                  <td className="px-4 py-3 text-sm">
                    <Link
                      href={`/dashboard/admin/organisations/${org.id}`}
                      className="font-medium text-primary-600 hover:text-primary-700"
                    >
                      Manage
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="Create organisation">
        <div className="space-y-4">
          <Input
            label="Organisation name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <Input
            label="Billing email"
            type="email"
            value={billingEmail}
            onChange={(e) => setBillingEmail(e.target.value)}
          />
          <Select label="Plan" options={PLAN_OPTIONS} value={planTier} onChange={setPlanTier} />
          {error && (
            <p className="text-sm text-error-700" role="alert">
              {error}
            </p>
          )}
          <Button
            variant="primary"
            className="w-full"
            disabled={!name.trim()}
            isLoading={createMutation.isPending}
            onClick={() => createMutation.mutate()}
          >
            Create
          </Button>
        </div>
      </Modal>
    </div>
  );
}
