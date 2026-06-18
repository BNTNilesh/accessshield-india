import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { type NextRequest, NextResponse } from 'next/server';
import { parseAccessShieldClaims } from './src/lib/auth/claims';
import { getSupabaseEnv } from './src/lib/supabase/env';

// Edge middleware cannot query Postgres — JWT claims only here; dashboard RSC reads forwarded headers.

const PROTECTED_PREFIXES = ['/dashboard'];
const AUTH_ROUTES = ['/login', '/signup', '/auth'];

function forwardRequestHeaders(request: NextRequest, extra: Record<string, string>): Headers {
  const requestHeaders = new Headers(request.headers);
  for (const [key, value] of Object.entries(extra)) {
    requestHeaders.set(key, value);
  }
  return requestHeaders;
}

function copyCookies(from: NextResponse, to: NextResponse): void {
  for (const cookie of from.cookies.getAll()) {
    to.cookies.set(cookie.name, cookie.value, cookie);
  }
}

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: { headers: request.headers },
  });

  const { url, anonKey } = getSupabaseEnv();

  const supabase = createServerClient(url, anonKey, {
    cookies: {
      get(name: string) {
        return request.cookies.get(name)?.value;
      },
      set(name: string, value: string, options: CookieOptions) {
        request.cookies.set({ name, value, ...options });
        response = NextResponse.next({ request: { headers: request.headers } });
        response.cookies.set({ name, value, ...options });
      },
      remove(name: string, options: CookieOptions) {
        request.cookies.set({ name, value: '', ...options });
        response = NextResponse.next({ request: { headers: request.headers } });
        response.cookies.set({ name, value: '', ...options });
      },
    },
    auth: {
      flowType: 'pkce',
      detectSessionInUrl: true,
    },
  });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const user = session?.user ?? null;
  const { pathname } = request.nextUrl;
  const isProtected = PROTECTED_PREFIXES.some((prefix) => pathname.startsWith(prefix));
  const isAuthRoute = AUTH_ROUTES.some((route) => pathname.startsWith(route));

  if (isProtected && !user) {
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = '/login';
    loginUrl.searchParams.set('redirectTo', pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (isAuthRoute && user) {
    const dashboardUrl = request.nextUrl.clone();
    dashboardUrl.pathname = '/dashboard';
    return NextResponse.redirect(dashboardUrl);
  }

  if (user && isProtected) {
    const { user_role: userRole, org_id: orgId } = parseAccessShieldClaims(
      session?.access_token,
      user.app_metadata as Record<string, unknown>,
    );

    const extra: Record<string, string> = {};
    if (userRole) extra['x-user-role'] = userRole;
    if (orgId) extra['x-org-id'] = orgId;

    const requestHeaders = forwardRequestHeaders(request, extra);
    const nextResponse = NextResponse.next({ request: { headers: requestHeaders } });
    copyCookies(response, nextResponse);

    if (userRole) nextResponse.headers.set('x-user-role', userRole);
    if (orgId) nextResponse.headers.set('x-org-id', orgId);

    response = nextResponse;
  }

  return response;
}

export const config = {
  matcher: ['/dashboard/:path*', '/login', '/signup', '/auth/:path*'],
};
