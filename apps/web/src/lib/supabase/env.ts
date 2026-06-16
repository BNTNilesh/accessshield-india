/** Supabase env — must be set in monorepo root `.env.local` (see next.config.js). */
export function getSupabaseEnv(): { url: string; anonKey: string } {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim();

  if (!url || !/^https?:\/\//.test(url)) {
    throw new Error(
      'NEXT_PUBLIC_SUPABASE_URL is missing or invalid. Copy .env.example to .env.local at the monorepo root and set your Supabase project URL.',
    );
  }

  if (!anonKey) {
    throw new Error(
      'NEXT_PUBLIC_SUPABASE_ANON_KEY is missing. Copy .env.example to .env.local at the monorepo root and set your Supabase anon key.',
    );
  }

  return { url, anonKey };
}
