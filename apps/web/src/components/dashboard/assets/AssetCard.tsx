'use client';

import Link from 'next/link';
import { ExternalLink, PlayCircle, Settings } from 'lucide-react';
import { Card, Badge, Button } from '@accessshield/ui';
import { formatRelativeTime } from '@/lib/utils';
import type { Asset } from '@/lib/api/types';
import { useTriggerScan } from '@/lib/hooks/useApi';

export interface AssetCardProps {
  asset: Asset;
}

export function AssetCard({ asset }: AssetCardProps) {
  const { mutate: triggerScan, isPending } = useTriggerScan();

  // Mock score - in reality would come from latest scan
  const score = Math.floor(Math.random() * 40) + 60;

  const getScoreColor = (s: number) => {
    if (s >= 80) return 'bg-success-100 text-success-700 border-success-200';
    if (s >= 50) return 'bg-warning-100 text-warning-700 border-warning-200';
    return 'bg-error-100 text-error-700 border-error-200';
  };

  return (
    <Card
      role="article"
      aria-labelledby={`asset-${asset.id}-name`}
      className="hover:shadow-md transition-shadow"
    >
      <div className="flex items-start justify-between mb-4">
        <h2 id={`asset-${asset.id}-name`} className="text-lg font-semibold text-text-primary">
          {asset.name}
        </h2>
        <div
          className={`flex h-12 w-12 items-center justify-center rounded-full border-2 text-lg font-bold ${getScoreColor(score)}`}
          role="meter"
          aria-valuenow={score}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`Score: ${score}`}
        >
          {score}
        </div>
      </div>

      <a
        href={asset.url}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-1 text-sm text-primary-600 hover:text-primary-700 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 focus-visible:ring-offset-2 rounded truncate mb-4"
        aria-label={`Visit ${asset.name} (opens in new tab)`}
      >
        {asset.url}
        <ExternalLink className="h-3 w-3 flex-shrink-0" aria-hidden="true" />
      </a>

      <div className="flex flex-wrap gap-2 mb-4">
        <Badge variant="secondary">WCAG 2.2 AA</Badge>
        <Badge variant="secondary">IS 17802</Badge>
      </div>

      {asset.lastScannedAt && (
        <p className="text-xs text-text-tertiary mb-4">
          Last scan: {formatRelativeTime(asset.lastScannedAt)}
        </p>
      )}

      <div className="flex gap-2">
        <Button
          size="sm"
          onClick={() => triggerScan({ asset_id: asset.id })}
          disabled={isPending}
          className="flex-1"
        >
          <PlayCircle className="mr-2 h-4 w-4" aria-hidden="true" />
          Scan Now
        </Button>
        <Button size="sm" variant="outline" asChild className="flex-1">
          <Link href={`/dashboard/assets/${asset.id}`}>
            <Settings className="mr-2 h-4 w-4" aria-hidden="true" />
            View
          </Link>
        </Button>
      </div>
    </Card>
  );
}
