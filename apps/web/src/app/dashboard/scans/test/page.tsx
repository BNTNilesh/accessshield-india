import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { ScannerTestLab } from '@/components/scanner-test-lab/ScannerTestLab';
import { createClient } from '@/lib/supabase/server';

export const metadata: Metadata = {
  title: 'Scanner test lab',
  description:
    'Development playground for end-to-end accessibility scan testing — configure inputs, queue scans, and inspect violations.',
};

export default async function ScannerTestPage() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login?redirectTo=/dashboard/scans/test');
  }

  return (
    <>
      <div className="space-y-2">
        <p className="text-sm font-medium uppercase tracking-wide text-primary-600">
          Dev playground
        </p>
        <h1 className="text-3xl font-bold text-text-primary">Scanner test lab</h1>
        <p className="max-w-3xl text-text-secondary">
          Create an asset, configure scan options, and inspect live progress plus violation output.
          Requires API + worker running locally.
        </p>
      </div>
      <div className="mt-8">
        <ScannerTestLab />
      </div>
    </>
  );
}
