import { SkipLink } from '@accessshield/ui';
import { Sidebar } from '@/components/dashboard/layout/Sidebar';
import { TopBar } from '@/components/dashboard/layout/TopBar';
import { DashboardActivityBar } from '@/components/dashboard/common/DashboardActivityBar';
import { DashboardProviders } from '@/providers/DashboardProviders';
import { getServerDashboardRole } from '@/lib/dashboard/session';

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const userRole = await getServerDashboardRole();

  return (
    <DashboardProviders>
      <SkipLink href="#main-content" />
      <div className="dashboard-shell flex h-screen overflow-hidden bg-gray-50">
        <Sidebar userRole={userRole} />
        <div className="flex flex-1 flex-col overflow-hidden">
          <TopBar />
          <DashboardActivityBar />
          <main
            id="main-content"
            className="flex-1 overflow-y-auto p-5 md:p-6"
            aria-label="Main content"
          >
            <div className="mx-auto max-w-6xl">{children}</div>
          </main>
        </div>
      </div>
    </DashboardProviders>
  );
}
