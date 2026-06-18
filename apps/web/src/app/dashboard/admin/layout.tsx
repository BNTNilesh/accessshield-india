import { redirect } from 'next/navigation';
import { getDashboardRole } from '@/lib/dashboard/session';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const userRole = getDashboardRole();

  if (userRole !== 'super_admin') {
    redirect('/dashboard');
  }

  return <>{children}</>;
}
