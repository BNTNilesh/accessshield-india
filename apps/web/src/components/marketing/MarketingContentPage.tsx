import type { ReactNode } from 'react';

export interface MarketingContentPageProps {
  title: string;
  description?: string;
  children: ReactNode;
}

/** Standard inner layout for marketing text pages (legal, company, docs). */
export function MarketingContentPage({ title, description, children }: MarketingContentPageProps) {
  return (
    <div className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">{title}</h1>
        {description && (
          <p className="mt-4 text-lg leading-normal text-text-secondary">{description}</p>
        )}
        <div className="mt-10 space-y-6 text-base leading-normal text-text-secondary">
          {children}
        </div>
      </div>
    </div>
  );
}
