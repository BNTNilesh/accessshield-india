'use client';

import { AssetDetailPageContent } from '@/components/dashboard/assets/AssetDetailPageContent';

export default function AssetDetailPage({ params }: { params: { id: string } }) {
  return <AssetDetailPageContent id={params.id} />;
}
