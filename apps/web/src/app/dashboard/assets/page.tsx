'use client';

import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button, Skeleton } from '@accessshield/ui';
import { AssetCard } from '@/components/dashboard/assets/AssetCard';
import { AddAssetModal } from '@/components/dashboard/assets/AddAssetModal';
import { useAssets } from '@/lib/hooks/useApi';

export default function AssetsPage() {
  const [showAddModal, setShowAddModal] = useState(false);
  const { data: assets = [], isLoading } = useAssets();

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Skeleton className="h-8 w-32" />
          <Skeleton className="h-10 w-32" />
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <Skeleton key={i} className="h-64" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-text-primary">Assets</h1>
          <p className="mt-2 text-text-secondary">
            Websites and applications being monitored for accessibility
          </p>
        </div>
        <Button onClick={() => setShowAddModal(true)}>
          <Plus className="mr-2 h-4 w-4" aria-hidden="true" />
          Add Asset
        </Button>
      </div>

      {assets.length === 0 ? (
        <div className="rounded-lg border-2 border-dashed border-gray-300 p-12 text-center">
          <p className="text-text-secondary mb-4">No assets yet</p>
          <Button onClick={() => setShowAddModal(true)}>
            <Plus className="mr-2 h-4 w-4" aria-hidden="true" />
            Add your first asset
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {assets.map((asset) => (
            <AssetCard key={asset.id} asset={asset} />
          ))}
        </div>
      )}

      <AddAssetModal open={showAddModal} onClose={() => setShowAddModal(false)} />
    </div>
  );
}
