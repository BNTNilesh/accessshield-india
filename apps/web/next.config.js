/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@accessshield/ui', '@accessshield/types'],
  reactStrictMode: true,
  poweredByHeader: false,
};

module.exports = nextConfig;
