'use client';

import { Card, CopyButton } from '@accessshield/ui';

export interface AssetWidgetProps {
  assetId: string;
}

export function AssetWidget({ assetId }: AssetWidgetProps) {
  const widgetToken = `as_${assetId.slice(0, 8)}`;
  const embedCode = `<script
  src="https://cdn.accessshield.in/widget.js"
  data-token="${widgetToken}"
  async
></script>`;

  return (
    <div className="space-y-6">
      <Card>
        <h3 className="text-lg font-semibold text-text-primary mb-4">Embed Code</h3>
        <p className="text-sm text-text-secondary mb-4">
          Copy this code and paste it before the closing{' '}
          <code className="text-xs">&lt;/body&gt;</code> tag on your website.
        </p>
        <div className="relative">
          <pre className="rounded-md bg-gray-900 p-4 text-sm text-gray-100 overflow-x-auto">
            <code>{embedCode}</code>
          </pre>
          <div className="absolute top-2 right-2">
            <CopyButton text={embedCode} />
          </div>
        </div>
      </Card>

      <Card>
        <h3 className="text-lg font-semibold text-text-primary mb-4">Widget Preview</h3>
        <div className="rounded-lg border-2 border-gray-200 bg-gray-50 p-8">
          <p className="text-sm text-text-tertiary text-center">Widget preview will appear here</p>
        </div>
      </Card>

      <Card>
        <h3 className="text-lg font-semibold text-text-primary mb-4">Widget Position</h3>
        <div className="grid grid-cols-2 gap-4">
          {['bottom-right', 'bottom-left', 'top-right', 'top-left'].map((position) => (
            <button
              key={position}
              className="rounded-lg border-2 border-gray-200 p-4 hover:border-primary-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 focus-visible:ring-offset-2 transition-colors"
              aria-label={`Position: ${position.replace('-', ' ')}`}
            >
              <span className="text-sm capitalize">{position.replace('-', ' ')}</span>
            </button>
          ))}
        </div>
      </Card>
    </div>
  );
}
