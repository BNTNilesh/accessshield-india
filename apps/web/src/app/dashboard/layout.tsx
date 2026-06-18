import { SkipLink } from '@accessshield/ui';
import { Sidebar } from '@/components/dashboard/layout/Sidebar';
import { TopBar } from '@/components/dashboard/layout/TopBar';
import { DashboardProviders } from '@/providers/DashboardProviders';
import { getDashboardRole } from '@/lib/dashboard/session';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const userRole = getDashboardRole();

  return (
    <DashboardProviders>
      <SkipLink href="#main-content" />
      <div className="dashboard-shell flex h-screen overflow-hidden bg-gradient-to-br from-gray-50 via-gray-100 to-gray-50">
        <Sidebar userRole={userRole} />
        <div className="flex flex-1 flex-col overflow-hidden">
          <TopBar />
          <main
            id="main-content"
            className="flex-1 overflow-y-auto p-8 md:p-10"
            aria-label="Main content"
          >
            <div className="mx-auto max-w-7xl">{children}</div>
          </main>
        </div>
      </div>
    </DashboardProviders>
  );
}
