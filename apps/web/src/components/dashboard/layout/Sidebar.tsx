'use client';

import type { LucideIcon } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Globe,
  ScanSearch,
  AlertCircle,
  FileText,
  Award,
  Settings,
  Shield,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import type { UserRole } from '@accessshield/types';
import { useUIStore } from '@/lib/stores/uiStore';
import { cn } from '@/lib/utils';

interface NavItem {
  href: string;
  label: string;
  icon: LucideIcon;
}

const NAV_ITEMS: NavItem[] = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/dashboard/assets', label: 'Assets', icon: Globe },
  { href: '/dashboard/scans', label: 'Scans', icon: ScanSearch },
  { href: '/dashboard/issues', label: 'Issues', icon: AlertCircle },
  { href: '/dashboard/reports', label: 'Reports', icon: FileText },
  { href: '/dashboard/certs', label: 'Certificates', icon: Award },
  { href: '/dashboard/settings', label: 'Settings', icon: Settings },
];

interface SidebarProps {
  userRole?: UserRole;
}

export function Sidebar({ userRole }: SidebarProps) {
  const pathname = usePathname();
  const { sidebarCollapsed, toggleSidebar } = useUIStore();

  const navItems: NavItem[] =
    userRole === 'super_admin'
      ? [...NAV_ITEMS, { href: '/dashboard/admin', label: 'Platform Admin', icon: Shield }]
      : NAV_ITEMS;

  return (
    <aside
      className={cn(
        'flex flex-col border-r border-gray-200 bg-white shadow-xl transition-all duration-300',
        sidebarCollapsed ? 'w-20' : 'w-72',
      )}
      aria-label="Sidebar navigation"
    >
      {/* Logo */}
      <div className="flex h-20 items-center justify-between border-b border-gray-200 bg-gradient-to-r from-primary-50 to-white px-6 shadow-sm">
        {!sidebarCollapsed && (
          <Link
            href="/dashboard"
            className="text-xl font-extrabold bg-gradient-to-r from-primary-600 to-primary-700 bg-clip-text text-transparent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1A56A0] focus-visible:ring-offset-2 rounded"
          >
            AccessShield
          </Link>
        )}
        <button
          onClick={toggleSidebar}
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-gray-600 hover:bg-primary-100 hover:text-primary-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1A56A0] focus-visible:ring-offset-2 transition-colors shadow-sm border border-gray-200"
          aria-label={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          aria-expanded={!sidebarCollapsed}
        >
          {sidebarCollapsed ? (
            <ChevronRight className="h-5 w-5" aria-hidden="true" />
          ) : (
            <ChevronLeft className="h-5 w-5" aria-hidden="true" />
          )}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-2 p-4" aria-label="Main navigation">
        {navItems.map((item) => {
          const isActive =
            item.href === '/dashboard' ? pathname === '/dashboard' : pathname.startsWith(item.href);
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive ? 'page' : undefined}
              className={cn(
                'as-nav-item',
                isActive && 'as-nav-item-active',
                sidebarCollapsed && 'justify-center px-2',
              )}
              title={sidebarCollapsed ? item.label : undefined}
            >
              <Icon className="h-5 w-5 shrink-0 text-current" aria-hidden="true" />
              {!sidebarCollapsed && <span>{item.label}</span>}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
