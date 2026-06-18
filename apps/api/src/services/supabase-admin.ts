import type { UserRole } from '@accessshield/types';
import { logger } from '../lib/logger';

export interface SupabaseAdminConfig {
  supabaseUrl: string;
  serviceRoleKey: string;
}

export interface CreateAuthUserInput {
  email: string;
  password: string;
  emailConfirm?: boolean;
  userMetadata?: Record<string, unknown>;
}

export interface AuthUserResult {
  id: string;
  email: string;
}

function adminHeaders(serviceRoleKey: string): HeadersInit {
  return {
    apikey: serviceRoleKey,
    Authorization: `Bearer ${serviceRoleKey}`,
    'Content-Type': 'application/json',
  };
}

export class SupabaseAdminService {
  constructor(private readonly config: SupabaseAdminConfig) {}

  private get baseUrl(): string {
    return `${this.config.supabaseUrl.replace(/\/$/, '')}/auth/v1`;
  }

  async findUserByEmail(email: string): Promise<AuthUserResult | null> {
    const normalizedEmail = email.trim().toLowerCase();

    // Supabase ignores `email=` — use `filter` (partial/full email search) then match exactly.
    const url = new URL(`${this.baseUrl}/admin/users`);
    url.searchParams.set('filter', normalizedEmail);
    url.searchParams.set('per_page', '10');

    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: adminHeaders(this.config.serviceRoleKey),
    });

    if (!response.ok) {
      const body = await response.text();
      logger.error({ status: response.status, body }, 'Supabase list users by email failed');
      throw new Error('Failed to look up auth user');
    }

    const data = (await response.json()) as { users?: Array<{ id: string; email?: string }> };
    const user = data.users?.find((u) => u.email?.trim().toLowerCase() === normalizedEmail);
    if (!user?.id) {
      return null;
    }

    return { id: user.id, email: user.email ?? normalizedEmail };
  }

  async createUser(input: CreateAuthUserInput): Promise<AuthUserResult> {
    const response = await fetch(`${this.baseUrl}/admin/users`, {
      method: 'POST',
      headers: adminHeaders(this.config.serviceRoleKey),
      body: JSON.stringify({
        email: input.email,
        password: input.password,
        email_confirm: input.emailConfirm ?? true,
        user_metadata: input.userMetadata ?? {},
      }),
    });

    if (!response.ok) {
      const body = await response.text();
      logger.error({ status: response.status, email: input.email }, 'Supabase create user failed');
      if (response.status === 422 || body.includes('already')) {
        throw new Error('EMAIL_ALREADY_REGISTERED');
      }
      throw new Error(`Failed to create auth user: ${body}`);
    }

    const data = (await response.json()) as { id: string; email?: string };
    return { id: data.id, email: data.email ?? input.email };
  }

  async deleteUser(authUserId: string): Promise<void> {
    const response = await fetch(`${this.baseUrl}/admin/users/${authUserId}`, {
      method: 'DELETE',
      headers: adminHeaders(this.config.serviceRoleKey),
    });

    if (!response.ok) {
      logger.warn({ authUserId, status: response.status }, 'Supabase delete user failed');
    }
  }

  async setUserAppMetadata(
    authUserId: string,
    metadata: { user_role: UserRole; org_id: string },
  ): Promise<void> {
    const response = await fetch(`${this.baseUrl}/admin/users/${authUserId}`, {
      method: 'PUT',
      headers: adminHeaders(this.config.serviceRoleKey),
      body: JSON.stringify({
        app_metadata: metadata,
      }),
    });

    if (!response.ok) {
      const body = await response.text();
      logger.error(
        { authUserId, status: response.status, body },
        'Supabase update app_metadata failed',
      );
      throw new Error('Failed to set user app metadata');
    }
  }

  async updateUserPassword(authUserId: string, password: string): Promise<void> {
    const response = await fetch(`${this.baseUrl}/admin/users/${authUserId}`, {
      method: 'PUT',
      headers: adminHeaders(this.config.serviceRoleKey),
      body: JSON.stringify({ password }),
    });

    if (!response.ok) {
      throw new Error('Failed to update user password');
    }
  }
}

export function createSupabaseAdminService(config: SupabaseAdminConfig): SupabaseAdminService {
  return new SupabaseAdminService(config);
}
