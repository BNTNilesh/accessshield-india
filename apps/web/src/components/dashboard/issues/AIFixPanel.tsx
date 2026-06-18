'use client';

import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { getAccessToken } from '@/lib/api/client';
import type { IssueDetail } from '@/lib/api/types';
import { Tabs } from '@accessshield/ui';
import { CopyButton } from '@accessshield/ui';
import { Button } from '@accessshield/ui';
import { Skeleton } from '@accessshield/ui';
import { Lightbulb, Code, Type } from 'lucide-react';

async function fetchIssueDetail(token: string, issueId: string): Promise<IssueDetail> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/issues/${issueId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!response.ok) throw new Error('Failed to fetch issue detail');
  const json = await response.json();
  return json.data;
}

interface AIFixPanelProps {
  issueId: string;
}

export function AIFixPanel({ issueId }: AIFixPanelProps) {
  const [isPolling, setIsPolling] = useState(false);

  const { data: issue, refetch } = useQuery({
    queryKey: ['issue', issueId],
    queryFn: async () => {
      const token = await getAccessToken();
      return fetchIssueDetail(token, issueId);
    },
  });

  // Poll for AI fix if not yet available
  useEffect(() => {
    if (!issue?.aiFixSuggestion && !isPolling) {
      setIsPolling(true);
      const interval = setInterval(() => {
        refetch();
      }, 5000);

      return () => {
        clearInterval(interval);
        setIsPolling(false);
      };
    } else if (issue?.aiFixSuggestion && isPolling) {
      setIsPolling(false);
    }
  }, [issue?.aiFixSuggestion, isPolling, refetch]);

  if (!issue) {
    return <Skeleton className="h-64 rounded-lg" />;
  }

  const tabs = [
    {
      id: 'fix',
      label: 'AI Fix Suggestion',
      icon: <Code className="h-4 w-4" aria-hidden="true" />,
      content: <AIFixTab issue={issue} isPolling={isPolling} />,
    },
    {
      id: 'explanation',
      label: 'Plain English Explanation',
      icon: <Lightbulb className="h-4 w-4" aria-hidden="true" />,
      content: <ExplanationTab issue={issue} />,
    },
  ];

  // Add alt text tab only for image-alt violations
  if (issue.violation?.ruleId === 'image-alt') {
    tabs.push({
      id: 'alt-text',
      label: 'Alt Text',
      icon: <Type className="h-4 w-4" aria-hidden="true" />,
      content: <AltTextTab issue={issue} />,
    });
  }

  const tabItems = tabs.map((tab) => ({
    value: tab.id,
    label: tab.label,
    content: tab.content,
  }));

  return (
    <div className="rounded-lg border border-border bg-white p-6">
      <h2 className="text-lg font-semibold text-text-primary mb-4">AI-Powered Assistance</h2>
      <Tabs items={tabItems} defaultValue="fix" ariaLabel="AI assistance" />
    </div>
  );
}

function AIFixTab({ issue, isPolling }: { issue: IssueDetail; isPolling: boolean }) {
  if (!issue.aiFixSuggestion) {
    return (
      <div className="py-8 text-center" aria-live="polite" aria-busy={isPolling}>
        <div className="inline-flex h-12 w-12 animate-spin items-center justify-center rounded-full border-4 border-primary-200 border-t-primary-600" />
        <p className="mt-4 text-base text-text-secondary">Generating fix suggestion...</p>
        <p className="mt-2 text-sm text-text-tertiary">This usually takes 10–20 seconds</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="rounded-md border border-border bg-bg-secondary p-4">
        <h3 className="text-sm font-semibold text-text-primary mb-2">Suggested Fix</h3>
        <div className="relative">
          <pre
            className="overflow-x-auto rounded-md bg-gray-900 p-4 text-sm text-gray-100 font-mono"
            aria-label="Code diff showing before and after the accessibility fix"
          >
            <code>{issue.aiFixSuggestion}</code>
          </pre>
          <div className="absolute top-2 right-2">
            <CopyButton text={issue.aiFixSuggestion} label="Copy fixed HTML" variant="secondary" />
          </div>
        </div>
        <div className="sr-only">
          Hidden text alternative: Before: {issue.elementHtml}. After: {issue.aiFixSuggestion}.
        </div>
      </div>

      {issue.jiraIssueKey ? (
        <Button variant="outline" size="sm" disabled>
          Already synced to Jira
        </Button>
      ) : (
        <Button variant="primary" size="sm">
          Apply to Jira
        </Button>
      )}
    </div>
  );
}

function ExplanationTab({ issue }: { issue: IssueDetail }) {
  if (!issue.aiExplanation) {
    return (
      <div className="py-8 text-center text-text-tertiary">
        <p>Explanation not yet available</p>
      </div>
    );
  }

  return (
    <div className="prose prose-sm max-w-none">
      <div className="text-base text-text-primary leading-relaxed whitespace-pre-wrap">
        {issue.aiExplanation}
      </div>

      {issue.wcagCriterion && (
        <div className="mt-6 rounded-md border border-border bg-bg-secondary p-4">
          <h3 className="text-sm font-semibold text-text-primary">Legal Reference</h3>
          <p className="mt-2 text-sm text-text-secondary">
            Under WCAG 2.2 Level AA, Criterion {issue.wcagCriterion} requires accessible
            implementations. This is also mandated by IS 17802 (Indian Standard) and the Rights of
            Persons with Disabilities Act 2016.
          </p>
        </div>
      )}

      {issue.severity === 'critical' && (
        <div className="mt-4 rounded-md border border-error-200 bg-error-100 p-4">
          <h3 className="text-sm font-semibold text-error-700">Business Impact</h3>
          <p className="mt-2 text-sm text-error-700">
            Critical violations prevent users with disabilities from accessing core functionality.
            Immediate remediation is required to comply with Indian accessibility laws and avoid
            legal exposure.
          </p>
        </div>
      )}
    </div>
  );
}

function AltTextTab({ issue }: { issue: IssueDetail }) {
  const [isDecorative, setIsDecorative] = useState(false);

  if (!issue.aiAltText) {
    return (
      <div className="py-8 text-center text-text-tertiary">
        <p>Alt text suggestion not yet available</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="rounded-md border border-border bg-bg-secondary p-4">
        <h3 className="text-sm font-semibold text-text-primary mb-2">Suggested Alt Text</h3>
        <p className="text-base text-text-primary leading-relaxed">"{issue.aiAltText}"</p>
        <div className="mt-3">
          <CopyButton text={issue.aiAltText} label="Copy alt text" variant="outline" size="sm" />
        </div>
      </div>

      <div className="rounded-md border border-accent-600 bg-accent-100 p-4">
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={isDecorative}
            onChange={(e) => setIsDecorative(e.target.checked)}
            className="mt-0.5 h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-2 focus:ring-primary-600 focus:ring-offset-2"
          />
          <div className="flex-1">
            <span className="text-sm font-medium text-accent-700">Mark as decorative (alt="")</span>
            <p className="mt-1 text-sm text-accent-700">
              Only use this if the image is purely decorative and doesn't convey any information.
              Screen readers will skip decorative images.
            </p>
          </div>
        </label>
      </div>

      {isDecorative && (
        <div className="rounded-md border border-error-200 bg-error-100 p-4">
          <p className="text-sm text-error-700">
            <strong>Warning:</strong> Marking this image as decorative will cause screen readers to
            skip it entirely. Make sure the image truly doesn't convey any information before
            proceeding.
          </p>
        </div>
      )}
    </div>
  );
}
