import { createClient, type SanityClient } from 'next-sanity';

function getSanityProjectId(): string | undefined {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID?.trim();
  return projectId || undefined;
}

/** True when Sanity CMS env vars are set (blog content available). */
export function isSanityConfigured(): boolean {
  return Boolean(getSanityProjectId());
}

let sanityClient: SanityClient | null = null;

function getSanityClient(): SanityClient | null {
  const projectId = getSanityProjectId();
  if (!projectId) {
    return null;
  }

  if (!sanityClient) {
    sanityClient = createClient({
      projectId,
      dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
      apiVersion: '2024-01-01',
      useCdn: true,
    });
  }

  return sanityClient;
}

export interface BlogPost {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt: string;
  category: 'RPwD Act' | 'IS 17802' | 'SEBI' | 'GIGW 3.0' | 'Tutorial' | 'Case Study';
  publishedAt: string;
  readTime: number;
  author: {
    name: string;
    role?: string;
  };
  heroImage?: {
    asset: {
      _ref: string;
      url: string;
    };
    alt: string;
  };
  body?: unknown[];
  seoDescription?: string;
}

export async function getAllPosts(): Promise<BlogPost[]> {
  const client = getSanityClient();
  if (!client) {
    return [];
  }

  try {
    return await client.fetch(
      `*[_type == "post"] | order(publishedAt desc) {
        _id,
        title,
        slug,
        excerpt,
        category,
        publishedAt,
        readTime,
        author->{name, role},
        heroImage {
          asset->{_ref, url},
          alt
        }
      }`,
    );
  } catch (error) {
    console.error('Sanity getAllPosts failed:', error);
    return [];
  }
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const client = getSanityClient();
  if (!client) {
    return null;
  }

  try {
    return await client.fetch(
      `*[_type == "post" && slug.current == $slug][0] {
        _id,
        title,
        slug,
        excerpt,
        body,
        category,
        publishedAt,
        readTime,
        author->{name, role},
        heroImage {
          asset->{_ref, url},
          alt
        },
        seoDescription
      }`,
      { slug },
    );
  } catch (error) {
    console.error('Sanity getPostBySlug failed:', error);
    return null;
  }
}

export async function getRecentPosts(limit: number = 3): Promise<BlogPost[]> {
  const client = getSanityClient();
  if (!client) {
    return [];
  }

  try {
    return await client.fetch(
      `*[_type == "post"] | order(publishedAt desc) [0...${limit}] {
        _id,
        title,
        slug,
        excerpt,
        category,
        publishedAt,
        readTime,
        author->{name, role},
        heroImage {
          asset->{_ref, url},
          alt
        }
      }`,
    );
  } catch (error) {
    console.error('Sanity getRecentPosts failed:', error);
    return [];
  }
}

export async function getPostsByCategory(
  category: string,
  excludeSlug?: string,
): Promise<BlogPost[]> {
  const client = getSanityClient();
  if (!client) {
    return [];
  }

  const query = excludeSlug
    ? `*[_type == "post" && category == $category && slug.current != $excludeSlug] | order(publishedAt desc) [0...3]`
    : `*[_type == "post" && category == $category] | order(publishedAt desc)`;

  try {
    return await client.fetch(
      `${query} {
        _id,
        title,
        slug,
        excerpt,
        category,
        publishedAt,
        readTime,
        author->{name, role},
        heroImage {
          asset->{_ref, url},
          alt
        }
      }`,
      { category, excludeSlug },
    );
  } catch (error) {
    console.error('Sanity getPostsByCategory failed:', error);
    return [];
  }
}
