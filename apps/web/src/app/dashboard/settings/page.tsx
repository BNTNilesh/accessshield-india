import { Suspense } from 'react';
import { Tabs, Skeleton, type TabItem } from '@accessshield/ui';
import { OrgSettingsForm } from '@/components/dashboard/settings/OrgSettingsForm';
import { UserTable } from '@/components/dashboard/settings/UserTable';
import { JiraIntegrationCard } from '@/components/dashboard/settings/JiraIntegrationCard';
import { BillingCard } from '@/components/dashboard/settings/BillingCard';
import { NotificationSettings } from '@/components/dashboard/settings/NotificationSettings';
import { WidgetSettings } from '@/components/dashboard/settings/WidgetSettings';

export const metadata = {
  title: 'Settings | AccessShield India',
  description: 'Manage organisation settings, team, integrations, and billing',
};

const SETTINGS_TABS: TabItem[] = [
  {
    value: 'organisation',
    label: 'Organisation',
    content: (
      <Suspense fallback={<Skeleton className="h-96" />}>
        <OrgSettingsForm />
      </Suspense>
    ),
  },
  {
    value: 'team',
    label: 'Team & Roles',
    content: (
      <Suspense fallback={<Skeleton className="h-96" />}>
        <UserTable />
      </Suspense>
    ),
  },
  {
    value: 'integrations',
    label: 'Integrations',
    content: (
      <Suspense fallback={<Skeleton className="h-96" />}>
        <JiraIntegrationCard />
      </Suspense>
    ),
  },
  {
    value: 'billing',
    label: 'Billing',
    content: (
      <Suspense fallback={<Skeleton className="h-96" />}>
        <BillingCard />
      </Suspense>
    ),
  },
  {
    value: 'notifications',
    label: 'Notifications',
    content: (
      <Suspense fallback={<Skeleton className="h-96" />}>
        <NotificationSettings />
      </Suspense>
    ),
  },
  {
    value: 'widget',
    label: 'Widget',
    content: (
      <Suspense fallback={<Skeleton className="h-96" />}>
        <WidgetSettings />
      </Suspense>
    ),
  },
];

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-text-primary">Settings</h1>
        <p className="mt-2 text-base text-text-secondary">
          Manage your organisation settings, team members, and integrations
        </p>
      </div>

      <Tabs items={SETTINGS_TABS} defaultValue="organisation" ariaLabel="Settings sections" />
    </div>
  );
}
