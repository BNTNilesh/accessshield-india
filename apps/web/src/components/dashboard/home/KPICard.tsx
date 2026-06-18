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
      className="group relative overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border-gray-200 hover:border-primary-300 bg-gradient-to-br from-white to-gray-50"
      role="listitem"
      aria-label={`${label}: ${value}${trend ? `, ${trend.direction === 'up' ? 'up' : 'down'} ${Math.abs(trend.value)}%` : ''}`}
    >
      <div className="flex items-start justify-between p-6">
        <div className="flex-1">
          <p className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-3">{label}</p>
          <p className="text-4xl font-extrabold text-gray-900 mb-3">{value}</p>
          {trend && (
            <div
              className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold border ${
                trend.value > 0
                  ? 'bg-green-50 text-green-700 border-green-200'
                  : 'bg-red-50 text-red-700 border-red-200'
              }`}
            >
              {trend.direction === 'up' ? (
                <TrendingUp className="h-3.5 w-3.5" aria-hidden="true" />
              ) : (
                <TrendingDown className="h-3.5 w-3.5" aria-hidden="true" />
              )}
              <span>{`${trend.value > 0 ? '+' : ''}${trend.value}%`}</span>
              <span className="opacity-75">vs last scan</span>
            </div>
          )}
        </div>
        {Icon && (
          <div className="rounded-2xl bg-gradient-to-br from-primary-500 to-primary-600 p-4 shadow-md">
            <Icon className="h-8 w-8 text-white" aria-hidden="true" />
          </div>
        )}
      </div>
      {href && (
        <div className="absolute inset-x-0 bottom-0 h-1.5 bg-gradient-to-r from-primary-500 via-primary-600 to-primary-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
      )}
    </Card>
  );

  if (href) {
    return (
      <Link
        href={href}
        className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 focus-visible:ring-offset-4 rounded-xl"
      >
        {content}
      </Link>
    );
  }

  return content;
}
