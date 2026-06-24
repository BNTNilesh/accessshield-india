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
  PanelLeftClose,
  PanelLeft,
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
        'flex flex-col border-r border-gray-200/90 bg-white transition-all duration-200',
        sidebarCollapsed ? 'w-[4.5rem]' : 'w-60',
      )}
      aria-label="Sidebar navigation"
    >
      <div className="flex h-14 items-center justify-between border-b border-gray-100 px-4">
        {!sidebarCollapsed && (
          <Link
            href="/dashboard"
            className="text-base font-semibold text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 focus-visible:ring-offset-2 rounded"
          >
            AccessShield
          </Link>
        )}
        <button
          onClick={toggleSidebar}
          className="inline-flex h-9 w-9 items-center justify-center rounded-md text-text-tertiary hover:bg-gray-100 hover:text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 focus-visible:ring-offset-2"
          aria-label={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          aria-expanded={!sidebarCollapsed}
        >
          {sidebarCollapsed ? (
            <PanelLeft className="h-4 w-4" aria-hidden="true" />
          ) : (
            <PanelLeftClose className="h-4 w-4" aria-hidden="true" />
          )}
        </button>
      </div>

      <nav className="flex-1 space-y-0.5 p-2" aria-label="Main navigation">
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
              <Icon className="h-4 w-4 shrink-0 text-current" aria-hidden="true" />
              {!sidebarCollapsed && <span>{item.label}</span>}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
