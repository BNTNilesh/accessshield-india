import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/auth/', '/dashboard/', '/onboarding/', '/studio/', '/verify/'],
    },
    sitemap: 'https://accessshield.in/sitemap.xml',
  };
}
