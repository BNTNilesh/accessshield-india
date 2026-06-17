'use client';

import { ExternalLink } from 'lucide-react';
import { Tabs, Skeleton, Badge } from '@accessshield/ui';
import { AssetOverview } from '@/components/dashboard/assets/AssetOverview';
import { AssetConfiguration } from '@/components/dashboard/assets/AssetConfiguration';
import { AssetWidget } from '@/components/dashboard/assets/AssetWidget';
import { useAssets } from '@/lib/hooks/useApi';

export default function AssetDetailPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const { data: assets = [], isLoading } = useAssets();
  const asset = assets.find((a) => a.id === id);

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-10 w-2/3" />
        <Skeleton className="h-96" />
      </div>
    );
  }

  if (!asset) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold text-text-primary">Asset not found</h1>
        <p className="mt-2 text-text-secondary">The asset you're looking for doesn't exist.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-text-primary">{asset.name}</h1>
        <a
          href={asset.url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 inline-flex items-center gap-1 text-primary-600 hover:text-primary-700 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 focus-visible:ring-offset-2 rounded"
          aria-label={`Visit ${asset.name} (opens in new tab)`}
        >
          {asset.url}
          <ExternalLink className="h-4 w-4" aria-hidden="true" />
        </a>
        <div className="flex gap-2 mt-3">
          <Badge variant="secondary">WCAG 2.2 AA</Badge>
          <Badge variant="secondary">IS 17802</Badge>
        </div>
      </div>

      <Tabs
        defaultValue="overview"
        ariaLabel="Asset sections"
        items={[
          {
            value: 'overview',
            label: 'Overview',
            content: <AssetOverview assetId={id} />,
          },
          {
            value: 'configuration',
            label: 'Configuration',
            content: <AssetConfiguration asset={asset} />,
          },
          {
            value: 'widget',
            label: 'Widget',
            content: <AssetWidget assetId={id} />,
          },
        ]}
      />
    </div>
  );
}
