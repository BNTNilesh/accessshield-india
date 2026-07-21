'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Save } from 'lucide-react';
import { getAccessToken } from '@/lib/api/client';
import { Button } from '@accessshield/ui';
import { Select } from '@accessshield/ui';
import { Input } from '@accessshield/ui';
import { LoadingState } from '@/components/dashboard/common/LoadingState';

const AI_PROVIDER_OPTIONS = [
  { value: 'deepinfra', label: 'DeepInfra (Hugging Face Cloud)' },
  { value: 'local', label: 'Local (Mac/PC via Llama)' },
];

async function fetchOrganisation(token: string) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/organisation`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!response.ok) throw new Error('Failed to fetch organisation');
  const json = await response.json();
  return json.data;
}

async function updateOrganisation(token: string, input: any) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/organisation`, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(input),
  });
  if (!response.ok) throw new Error('Failed to update organisation');
  return response.json();
}

export function AISettingsForm() {
  const queryClient = useQueryClient();

  const { data: org, isLoading } = useQuery({
    queryKey: ['organisation'],
    queryFn: async () => {
      const token = await getAccessToken();
      return fetchOrganisation(token);
    },
  });

  const updateMutation = useMutation({
    mutationFn: async (input: any) => {
      const token = await getAccessToken();
      return updateOrganisation(token, input);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['organisation'] });
    },
  });

  if (isLoading || !org) {
    return <LoadingState message="Loading AI settings…" variant="card" />;
  }

  return (
    <div className="space-y-6 max-w-2xl">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.currentTarget);
          updateMutation.mutate({
            aiProvider: formData.get('aiProvider') as string,
            aiModel: formData.get('aiModel') as string,
          });
        }}
        className="space-y-4 bg-white p-6 rounded-lg shadow-sm border border-border"
      >
        <h3 className="text-lg font-medium text-text-primary mb-4">AI Model Configuration</h3>

        <Select
          name="aiProvider"
          label="AI Inference Provider"
          options={AI_PROVIDER_OPTIONS}
          defaultValue={org.aiProvider ?? 'deepinfra'}
        />

        <Input
          name="aiModel"
          label="Model Identifier"
          defaultValue={org.aiModel ?? 'google/gemma-4-31B-it:deepinfra'}
          required
          helpText="For DeepInfra: 'google/gemma-4-31B-it:deepinfra'. For Local: 'bartowski/Qwen2.5-Coder-3B-Instruct-GGUF'"
        />

        <div className="pt-4">
          <Button type="submit" variant="primary" isLoading={updateMutation.isPending}>
            <Save className="mr-2 h-4 w-4" aria-hidden="true" />
            Save changes
          </Button>
        </div>
      </form>
    </div>
  );
}
