'use client';

import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@accessshield/ui';
import { AssetCard } from '@/components/dashboard/assets/AssetCard';
import { AddAssetModal } from '@/components/dashboard/assets/AddAssetModal';
import { LoadingState } from '@/components/dashboard/common/LoadingState';
import { useAssets } from '@/lib/hooks/useApi';

export function AssetsPageContent() {
  const [showAddModal, setShowAddModal] = useState(false);
  const { data: assets = [], isLoading } = useAssets();

  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-primary-50 to-white border border-gray-200 rounded-2xl p-8 shadow-lg flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-extrabold text-gray-900 mb-2">Assets</h1>
          <p className="text-lg text-gray-600 font-medium">
            Websites and applications being monitored for accessibility
          </p>
        </div>
        <Button
          variant="primary"
          size="lg"
          onClick={() => setShowAddModal(true)}
          className="shadow-lg"
        >
          <Plus className="mr-2 h-5 w-5" aria-hidden="true" />
          Add Asset
        </Button>
      </div>

      {isLoading ? (
        <LoadingState message="Loading assets…" variant="page" />
      ) : assets.length === 0 ? (
        <div className="rounded-2xl border-2 border-dashed border-gray-300 bg-gray-50 p-16 text-center shadow-sm">
          <div className="mx-auto w-24 h-24 bg-primary-100 rounded-full flex items-center justify-center mb-6">
            <Plus className="h-12 w-12 text-primary-600" aria-hidden="true" />
          </div>
          <p className="mb-6 text-xl font-semibold text-gray-700">No assets yet</p>
          <Button
            variant="primary"
            size="lg"
            onClick={() => setShowAddModal(true)}
            className="shadow-lg"
          >
            <Plus className="mr-2 h-5 w-5" aria-hidden="true" />
            Add your first asset
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {assets.map((asset) => (
            <AssetCard key={asset.id} asset={asset} />
          ))}
        </div>
      )}

      <AddAssetModal open={showAddModal} onClose={() => setShowAddModal(false)} />
    </div>
  );
}
