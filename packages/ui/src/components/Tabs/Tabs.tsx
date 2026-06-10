'use client';

import * as TabsPrimitive from '@radix-ui/react-tabs';
import type { ReactNode } from 'react';
import { cn, focusRing } from '../../lib/cn';

export interface TabItem {
  value: string;
  label: string;
  content: ReactNode;
  disabled?: boolean;
}

export interface TabsProps {
  items: TabItem[];
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  ariaLabel?: string;
  className?: string;
}

export function Tabs({
  items,
  defaultValue,
  value,
  onValueChange,
  ariaLabel = 'Tabs',
  className,
}: TabsProps) {
  const defaultTab = defaultValue ?? items[0]?.value;

  return (
    <TabsPrimitive.Root
      defaultValue={defaultTab}
      value={value}
      onValueChange={onValueChange}
      className={className}
    >
      <TabsPrimitive.List aria-label={ariaLabel} className="flex gap-1 border-b border-border">
        {items.map((item) => (
          <TabsPrimitive.Trigger
            key={item.value}
            value={item.value}
            disabled={item.disabled}
            className={cn(
              'inline-flex min-h-11 items-center px-4 py-2 text-sm font-medium text-text-tertiary',
              'data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-primary',
              'disabled:cursor-not-allowed disabled:opacity-50',
              focusRing,
            )}
          >
            {item.label}
          </TabsPrimitive.Trigger>
        ))}
      </TabsPrimitive.List>
      {items.map((item) => (
        <TabsPrimitive.Content
          key={item.value}
          value={item.value}
          className="pt-4 focus-visible:outline-none"
          tabIndex={0}
        >
          {item.content}
        </TabsPrimitive.Content>
      ))}
    </TabsPrimitive.Root>
  );
}

Tabs.displayName = 'Tabs';
