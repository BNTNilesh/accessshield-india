import { redirect } from 'next/navigation';
import { SkipLink } from '@accessshield/ui';
import { createClient } from '@/lib/supabase/server';
import { Sidebar } from '@/components/dashboard/layout/Sidebar';
import { TopBar } from '@/components/dashboard/layout/TopBar';

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const supabase = createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session?.user) {
    redirect('/login');
  }

  return (
    <>
      <SkipLink href="#main-content" />
      <div className="flex h-screen overflow-hidden bg-gray-50">
        <Sidebar />
        <div className="flex flex-1 flex-col overflow-hidden">
          <TopBar />
          <main id="main-content" className="flex-1 overflow-y-auto p-6" aria-label="Main content">
            {children}
          </main>
        </div>
      </div>
    </>
  );
}
