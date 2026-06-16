'use client';

import { User, Settings, LogOut } from 'lucide-react';
import { DropdownMenu } from '@accessshield/ui';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';

export function UserMenu() {
  const router = useRouter();
  const supabase = createClient();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  const menuItems = [
    {
      id: 'profile',
      label: 'Profile',
      icon: User,
      onClick: () => router.push('/dashboard/settings/profile'),
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: Settings,
      onClick: () => router.push('/dashboard/settings'),
    },
    {
      id: 'divider',
      label: '',
      divider: true,
    },
    {
      id: 'logout',
      label: 'Sign out',
      icon: LogOut,
      onClick: handleSignOut,
    },
  ];

  return (
    <DropdownMenu
      trigger={
        <button
          className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary-100 text-primary-700 hover:bg-primary-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 focus-visible:ring-offset-2"
          aria-label="User menu"
        >
          <User className="h-5 w-5" aria-hidden="true" />
        </button>
      }
      items={menuItems}
      align="end"
    />
  );
}
