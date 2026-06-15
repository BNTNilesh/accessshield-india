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

/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@accessshield/ui', '@accessshield/types', '@accessshield/db'],
  reactStrictMode: true,
  poweredByHeader: false,
};

module.exports = nextConfig;
