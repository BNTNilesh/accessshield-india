'use client';

import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Modal, Input, Select, Button, Checkbox } from '@accessshield/ui';
import { useCreateAsset } from '@/lib/hooks/useApi';

const assetSchema = z.object({
  name: z.string().min(2, 'Asset name must be at least 2 characters'),
  url: z
    .string()
    .url('Please enter a valid HTTPS URL')
    .startsWith('https://', 'URL must use HTTPS'),
  type: z.enum(['website', 'web_app', 'mobile_app', 'document', 'pdf']),
  description: z.string().optional(),
  standards: z.object({
    wcag22: z.boolean(),
    is17802: z.boolean(),
    gigw3: z.boolean(),
    sebi: z.boolean(),
  }),
  maxPages: z.number().min(5).max(500),
  scanSchedule: z.enum(['manual', 'weekly', 'monthly']),
});

type AssetFormData = z.infer<typeof assetSchema>;

export interface AddAssetModalProps {
  open: boolean;
  onClose: () => void;
}

export function AddAssetModal({ open, onClose }: AddAssetModalProps) {
  const { mutate: createAsset, isPending } = useCreateAsset();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<AssetFormData>({
    resolver: zodResolver(assetSchema),
    defaultValues: {
      type: 'website',
      standards: {
        wcag22: true,
        is17802: true,
        gigw3: false,
        sebi: false,
      },
      maxPages: 50,
      scanSchedule: 'manual',
    },
  });

  const onSubmit = (data: AssetFormData) => {
    createAsset(
      {
        name: data.name,
        url: data.url,
        type: data.type,
        description: data.description,
      },
      {
        onSuccess: () => {
          reset();
          onClose();
        },
      },
    );
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Add New Asset"
      description="Register a new website or application to monitor for accessibility compliance"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input
          label="Asset Name"
          required
          {...register('name')}
          error={errors.name?.message}
          placeholder="My Website"
        />

        <Input
          label="Website URL"
          type="url"
          required
          {...register('url')}
          error={errors.url?.message}
          placeholder="https://example.com"
        />

        <Controller
          name="type"
          control={control}
          render={({ field }) => (
            <Select
              label="Asset Type"
              required
              value={field.value}
              onValueChange={field.onChange}
              options={[
                { value: 'website', label: 'Website' },
                { value: 'web_app', label: 'Web Application' },
                { value: 'mobile_app', label: 'Mobile App' },
                { value: 'document', label: 'Document' },
                { value: 'pdf', label: 'PDF' },
              ]}
            />
          )}
        />

        <div>
          <label className="text-sm font-medium text-text-primary block mb-2">
            Compliance Standards
          </label>
          <div className="space-y-2">
            <Checkbox {...register('standards.wcag22')} label="WCAG 2.2 AA" />
            <Checkbox {...register('standards.is17802')} label="IS 17802 (India)" />
            <Checkbox {...register('standards.gigw3')} label="GIGW 3.0 (Government)" />
            <Checkbox {...register('standards.sebi')} label="SEBI Guidelines" />
          </div>
        </div>

        <Input
          label="Maximum Pages to Scan"
          type="number"
          required
          {...register('maxPages', { valueAsNumber: true })}
          error={errors.maxPages?.message}
          min={5}
          max={500}
        />

        <Controller
          name="scanSchedule"
          control={control}
          render={({ field }) => (
            <Select
              label="Scan Schedule"
              required
              value={field.value}
              onValueChange={field.onChange}
              options={[
                { value: 'manual', label: 'Manual (on-demand)' },
                { value: 'weekly', label: 'Weekly' },
                { value: 'monthly', label: 'Monthly' },
              ]}
            />
          )}
        />

        <div className="flex gap-3 pt-4">
          <Button type="button" variant="outline" onClick={onClose} className="flex-1">
            Cancel
          </Button>
          <Button type="submit" variant="primary" isLoading={isPending} className="flex-1">
            Create Asset
          </Button>
        </div>
      </form>
    </Modal>
  );
}
