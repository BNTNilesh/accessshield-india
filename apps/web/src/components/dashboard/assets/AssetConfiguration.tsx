'use client';

import { Card } from '@accessshield/ui';
import type { Asset } from '@/lib/api/types';

export interface AssetConfigurationProps {
  asset: Asset;
}

export function AssetConfiguration({ asset }: AssetConfigurationProps) {
  return (
    <div className="space-y-6">
      <Card>
        <h3 className="text-lg font-semibold text-text-primary mb-4">Scan Settings</h3>
        <dl className="space-y-4">
          <div>
            <dt className="text-sm font-medium text-text-secondary">Asset Type</dt>
            <dd className="mt-1 text-sm text-text-primary capitalize">{asset.type}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-text-secondary">Status</dt>
            <dd className="mt-1 text-sm text-text-primary">
              {asset.isActive ? 'Active' : 'Inactive'}
            </dd>
          </div>
          {asset.description && (
            <div>
              <dt className="text-sm font-medium text-text-secondary">Description</dt>
              <dd className="mt-1 text-sm text-text-primary">{asset.description}</dd>
            </div>
          )}
        </dl>
      </Card>

      <Card>
        <h3 className="text-lg font-semibold text-text-primary mb-4">Excluded Paths</h3>
        <p className="text-sm text-text-tertiary">No paths excluded from scanning</p>
      </Card>
    </div>
  );
}
