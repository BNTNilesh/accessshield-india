'use client';

import { QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'sonner';
import { UiProviders } from '@/providers/UiProviders';
import { getQueryClient } from '@/lib/query-client';

/** Dashboard-only providers — keeps marketing JS bundle lean. */
export function DashboardProviders({ children }: { children: React.ReactNode }) {
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <UiProviders>
        {children}
        <Toaster position="top-right" />
      </UiProviders>
    </QueryClientProvider>
  );
}
