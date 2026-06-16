'use client';

import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { FileText, X, Download, Loader } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { getAccessToken } from '@/lib/api/client';
import type {
  Asset,
  ScanDetail,
  ReportType,
  ReportFormat,
  GenerateReportInput,
} from '@/lib/api/types';
import { Button } from '@accessshield/ui';
import { Select } from '@accessshield/ui';
import { RadioGroup } from '@accessshield/ui';
import { Input } from '@accessshield/ui';
import { Badge } from '@accessshield/ui';
import { Tooltip } from '@accessshield/ui';

const REPORT_TYPES = [
  {
    value: 'executive' as const,
    label: 'Executive Summary',
    description: 'High-level summary for leadership. 5-6 pages.',
  },
  {
    value: 'technical' as const,
    label: 'Technical Report',
    description: 'Full violation list with code. For developers.',
  },
  {
    value: 'wcag_compliance' as const,
    label: 'WCAG Compliance',
    description: 'Conformance table for all 50 WCAG 2.2 AA criteria.',
  },
  {
    value: 'legal_rpwd' as const,
    label: 'RPwD Legal',
    description: 'Legal compliance evidence for regulatory submission.',
  },
  {
    value: 'sebi' as const,
    label: 'SEBI Report',
    description: 'Format required by SEBI for financial service entities.',
    enterprise: true,
  },
  {
    value: 'accessibility_statement' as const,
    label: 'Accessibility Statement',
    description: 'Public-facing HTML statement.',
  },
];

const FORMAT_OPTIONS = [
  { value: 'pdf', label: 'PDF' },
  { value: 'html', label: 'HTML' },
];

async function fetchAssets(token: string): Promise<Asset[]> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/assets`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!response.ok) throw new Error('Failed to fetch assets');
  const json = await response.json();
  return json.data;
}

async function fetchScansForAsset(token: string, assetId: string): Promise<ScanDetail[]> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/scans?assetId=${assetId}&status=completed`,
    { headers: { Authorization: `Bearer ${token}` } },
  );
  if (!response.ok) throw new Error('Failed to fetch scans');
  const json = await response.json();
  return json.data;
}

async function generateReport(token: string, input: GenerateReportInput) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/reports`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(input),
  });
  if (!response.ok) throw new Error('Failed to generate report');
  return response.json();
}

export function GenerateReportPanel() {
  const queryClient = useQueryClient();
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [reportType, setReportType] = useState<ReportType>('executive');
  const [assetId, setAssetId] = useState('');
  const [scanId, setScanId] = useState('');
  const [format, setFormat] = useState<ReportFormat>('pdf');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [generatedReportUrl, setGeneratedReportUrl] = useState<string | null>(null);

  const { data: assets = [] } = useQuery({
    queryKey: ['assets'],
    queryFn: async () => {
      const token = await getAccessToken();
      return fetchAssets(token);
    },
  });

  const { data: scans = [] } = useQuery({
    queryKey: ['scans', assetId],
    queryFn: async () => {
      if (!assetId) return [];
      const token = await getAccessToken();
      return fetchScansForAsset(token, assetId);
    },
    enabled: !!assetId,
  });

  const generateMutation = useMutation({
    mutationFn: async (input: GenerateReportInput) => {
      const token = await getAccessToken();
      return generateReport(token, input);
    },
    onSuccess: (data) => {
      setGeneratedReportUrl(data.data.downloadUrl);
      queryClient.invalidateQueries({ queryKey: ['reports'] });
    },
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!assetId || !scanId) return;

    generateMutation.mutate({
      reportType,
      assetId,
      scanId,
      format,
      dateFrom: dateFrom || undefined,
      dateTo: dateTo || undefined,
    });
  }

  function handleClose() {
    setIsPanelOpen(false);
    setGeneratedReportUrl(null);
    generateMutation.reset();
  }

  const assetOptions = assets.map((asset) => ({
    value: asset.id,
    label: asset.name,
  }));

  const scanOptions = scans.map((scan) => ({
    value: scan.id,
    label: `Scan from ${new Date(scan.createdAt).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    })} — Score: ${scan.score ?? 'N/A'}/100`,
  }));

  return (
    <>
      <Button
        variant="primary"
        size="lg"
        onClick={() => setIsPanelOpen(true)}
        className="w-full sm:w-auto"
      >
        <FileText className="mr-2 h-5 w-5" aria-hidden="true" />
        Generate New Report
      </Button>

      <AnimatePresence>
        {isPanelOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleClose}
              className="fixed inset-0 z-40 bg-black/50"
              aria-hidden="true"
            />

            {/* Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed right-0 top-0 z-50 h-full w-full max-w-2xl overflow-y-auto bg-white shadow-2xl"
              role="dialog"
              aria-modal="true"
              aria-labelledby="generate-report-title"
            >
              <div className="sticky top-0 z-10 flex items-center justify-between border-b border-border bg-white px-6 py-4">
                <h2 id="generate-report-title" className="text-xl font-bold text-text-primary">
                  Generate Report
                </h2>
                <button
                  onClick={handleClose}
                  className="rounded-md p-2 text-text-secondary hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 focus-visible:ring-offset-2"
                  aria-label="Close panel"
                >
                  <X className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>

              <div className="p-6">
                {generatedReportUrl ? (
                  <div className="space-y-4 text-center py-8">
                    <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-success-100">
                      <Download className="h-8 w-8 text-success-700" aria-hidden="true" />
                    </div>
                    <h3 className="text-lg font-semibold text-text-primary">
                      Report Generated Successfully!
                    </h3>
                    <p className="text-base text-text-secondary">
                      Your report is ready to download
                    </p>
                    <div className="flex gap-3 justify-center">
                      <Button asChild variant="primary" size="lg">
                        <a href={generatedReportUrl} download>
                          <Download className="mr-2 h-5 w-5" aria-hidden="true" />
                          Download Report
                        </a>
                      </Button>
                      <Button
                        variant="outline"
                        size="lg"
                        onClick={() => {
                          setGeneratedReportUrl(null);
                          generateMutation.reset();
                        }}
                      >
                        Generate Another
                      </Button>
                    </div>
                  </div>
                ) : generateMutation.isPending ? (
                  <div className="space-y-4 text-center py-8" aria-live="polite" aria-busy="true">
                    <Loader
                      className="mx-auto h-12 w-12 animate-spin text-primary-600"
                      aria-hidden="true"
                    />
                    <h3 className="text-lg font-semibold text-text-primary">
                      Generating your {REPORT_TYPES.find((t) => t.value === reportType)?.label}...
                    </h3>
                    <p className="text-base text-text-secondary">
                      This takes about 30–60 seconds for large scans
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Report Type */}
                    <div>
                      <label className="block text-sm font-semibold text-text-primary mb-3">
                        Report Type{' '}
                        <span className="text-error-700" aria-label="required">
                          *
                        </span>
                      </label>
                      <div className="space-y-2">
                        {REPORT_TYPES.map((type) => (
                          <label
                            key={type.value}
                            className={`flex items-start gap-3 rounded-lg border p-4 cursor-pointer transition-colors ${
                              reportType === type.value
                                ? 'border-primary-600 bg-primary-50'
                                : 'border-border hover:bg-gray-50'
                            } ${type.enterprise ? 'opacity-50' : ''}`}
                          >
                            <input
                              type="radio"
                              name="reportType"
                              value={type.value}
                              checked={reportType === type.value}
                              onChange={(e) => setReportType(e.target.value as ReportType)}
                              disabled={type.enterprise}
                              className="mt-1 h-4 w-4 shrink-0 text-primary-600 focus:ring-2 focus:ring-primary-600 focus:ring-offset-2"
                              required
                            />
                            <div className="flex-1">
                              <div className="flex items-center gap-2">
                                <span className="font-medium text-text-primary">{type.label}</span>
                                {type.enterprise && (
                                  <Tooltip content="Available on Enterprise plan only">
                                    <Badge variant="secondary" className="text-xs">
                                      Enterprise
                                    </Badge>
                                  </Tooltip>
                                )}
                              </div>
                              <p className="mt-1 text-sm text-text-secondary">{type.description}</p>
                            </div>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Asset */}
                    <Select
                      label="Asset"
                      options={assetOptions}
                      value={assetId}
                      onChange={(value) => {
                        setAssetId(value);
                        setScanId('');
                      }}
                      required
                    />

                    {/* Scan */}
                    {assetId && (
                      <Select
                        label="Scan"
                        options={scanOptions}
                        value={scanId}
                        onChange={setScanId}
                        required
                      />
                    )}

                    {/* Format */}
                    <RadioGroup
                      label="Report Format"
                      options={FORMAT_OPTIONS}
                      value={format}
                      onChange={(value) => setFormat(value as ReportFormat)}
                      aria-label="Report format"
                      required
                    />

                    {/* Date Range (Optional) */}
                    <div className="grid gap-4 sm:grid-cols-2">
                      <Input
                        type="date"
                        label="From Date (optional)"
                        value={dateFrom}
                        onChange={(e) => setDateFrom(e.target.value)}
                        pattern="\d{2}/\d{2}/\d{4}"
                      />
                      <Input
                        type="date"
                        label="To Date (optional)"
                        value={dateTo}
                        onChange={(e) => setDateTo(e.target.value)}
                        pattern="\d{2}/\d{2}/\d{4}"
                      />
                    </div>

                    <Button
                      type="submit"
                      variant="primary"
                      size="lg"
                      className="w-full"
                      disabled={!assetId || !scanId || generateMutation.isPending}
                    >
                      <FileText className="mr-2 h-5 w-5" aria-hidden="true" />
                      Generate Report
                    </Button>
                  </form>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
