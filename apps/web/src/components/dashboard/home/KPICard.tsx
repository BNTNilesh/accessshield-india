'use client';

import Link from 'next/link';
import { TrendingUp, TrendingDown, type LucideIcon } from 'lucide-react';
import { Card } from '@accessshield/ui';

export interface KPICardProps {
  label: string;
  value: string | number;
  trend?: {
    value: number;
    direction: 'up' | 'down';
  };
  icon?: LucideIcon;
  href?: string;
}

export function KPICard({ label, value, trend, icon: Icon, href }: KPICardProps) {
  const content = (
    <Card
      className="hover:shadow-md transition-shadow"
      role="listitem"
      aria-label={`${label}: ${value}${trend ? `, ${trend.direction === 'up' ? 'up' : 'down'} ${Math.abs(trend.value)}%` : ''}`}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-text-secondary">{label}</p>
          <p className="mt-2 text-3xl font-bold text-text-primary">{value}</p>
          {trend && (
            <div className="mt-2 flex items-center gap-1 text-sm">
              {trend.direction === 'up' ? (
                <>
                  <TrendingUp
                    className={`h-4 w-4 ${trend.value > 0 ? 'text-success-700' : 'text-error-700'}`}
                    aria-hidden="true"
                  />
                  <span
                    className={trend.value > 0 ? 'text-success-700' : 'text-error-700'}
                  >{`${trend.value > 0 ? '+' : ''}${trend.value}%`}</span>
                </>
              ) : (
                <>
                  <TrendingDown
                    className={`h-4 w-4 ${trend.value < 0 ? 'text-error-700' : 'text-success-700'}`}
                    aria-hidden="true"
                  />
                  <span
                    className={trend.value < 0 ? 'text-error-700' : 'text-success-700'}
                  >{`${trend.value}%`}</span>
                </>
              )}
              <span className="text-text-tertiary">from last scan</span>
            </div>
          )}
        </div>
        {Icon && (
          <div className="rounded-lg bg-primary-100 p-2">
            <Icon className="h-6 w-6 text-primary-600" aria-hidden="true" />
          </div>
        )}
      </div>
    </Card>
  );

  if (href) {
    return (
      <Link
        href={href}
        className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 focus-visible:ring-offset-2 rounded-lg"
      >
        {content}
      </Link>
    );
  }

  return content;
}
