const { existsSync } = require('node:fs');
const { dirname, resolve } = require('node:path');
const { config } = require('dotenv');

/** Monorepo root — .env.local lives here, not under apps/web */
function findMonorepoRoot(startDir) {
  let dir = startDir;
  while (dir !== dirname(dir)) {
    if (existsSync(resolve(dir, 'pnpm-workspace.yaml'))) {
      return dir;
    }
    dir = dirname(dir);
  }
  return startDir;
}

const monorepoRoot = findMonorepoRoot(__dirname);
config({ path: resolve(monorepoRoot, '.env.local') });
config({ path: resolve(monorepoRoot, '.env') });

const apiProxyTarget =
  process.env.API_URL ?? process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000';

/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@accessshield/ui', '@accessshield/types', '@accessshield/db'],
  reactStrictMode: true,
  poweredByHeader: false,
  // .env.local lives at monorepo root — expose to Next.js client, server, and edge middleware
  env: {
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL ?? '',
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? '',
    // Empty = browser uses same-origin /api/v1/* (rewritten to Express API below)
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL ?? '',
    NEXT_PUBLIC_WIDGET_ENABLED: process.env.NEXT_PUBLIC_WIDGET_ENABLED ?? '',
    NEXT_PUBLIC_WIDGET_TOKEN: process.env.NEXT_PUBLIC_WIDGET_TOKEN ?? '',
    NEXT_PUBLIC_CDN_URL: process.env.NEXT_PUBLIC_CDN_URL ?? '',
    NEXT_PUBLIC_SANITY_PROJECT_ID: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? '',
    NEXT_PUBLIC_SANITY_DATASET: process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/api/v1/:path*',
        destination: `${apiProxyTarget.replace(/\/$/, '')}/api/v1/:path*`,
      },
    ];
  },
  async redirects() {
    return [
      {
        source: '/pricing',
        destination: '/services',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
