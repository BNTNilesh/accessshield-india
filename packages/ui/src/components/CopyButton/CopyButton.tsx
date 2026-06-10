'use client';

import { useCallback, useState } from 'react';
import { cn, focusRing } from '../../lib/cn';
import { CheckIcon, CopyIcon } from '../../lib/icons';

export interface CopyButtonProps {
  text: string;
  label?: string;
  className?: string;
}

export function CopyButton({ text, label = 'Copy to clipboard', className }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }, [text]);

  return (
    <div className="inline-flex items-center gap-2">
      <button
        type="button"
        onClick={() => void handleCopy()}
        aria-label={label}
        className={cn(
          'inline-flex min-h-11 min-w-11 items-center justify-center rounded-md',
          'border border-border bg-white text-text-secondary hover:bg-primary-light hover:text-primary',
          focusRing,
          className,
        )}
      >
        {copied ? (
          <CheckIcon size={16} aria-hidden="true" />
        ) : (
          <CopyIcon size={16} aria-hidden="true" />
        )}
      </button>
      <span role="status" aria-live="polite" className="sr-only">
        {copied ? 'Copied!' : ''}
      </span>
    </div>
  );
}

CopyButton.displayName = 'CopyButton';
