import Link from 'next/link';
import { Badge } from '@accessshield/ui';
import { getRecentPosts, type BlogPost } from '@/lib/sanity';

export async function BlogPreviewSection() {
  let posts: BlogPost[] = [];
  try {
    posts = await getRecentPosts(3);
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    posts = [];
  }

  if (posts.length === 0) {
    return null;
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  return (
    <section className="bg-gray-50 px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
              Latest from the compliance desk
            </h2>
            <p className="mt-4 text-lg leading-normal text-text-secondary">
              Stay updated on Indian accessibility laws and best practices
            </p>
          </div>
          <Link
            href="/blog"
            className="hidden text-base font-medium text-primary-600 hover:text-primary-700 sm:block"
          >
            View all articles →
          </Link>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <Link
              key={post._id}
              href={`/blog/${post.slug.current}`}
              className="group rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 focus-visible:ring-offset-2"
            >
              <div className="flex items-center gap-3">
                <Badge variant="secondary" size="sm">
                  {post.category}
                </Badge>
                <span className="text-sm text-text-tertiary">{post.readTime} min read</span>
              </div>
              <h3 className="mt-4 text-lg font-semibold leading-normal text-text-primary group-hover:text-primary-600">
                {post.title}
              </h3>
              <p className="mt-2 text-sm leading-normal text-text-tertiary">
                {formatDate(post.publishedAt)}
              </p>
            </Link>
          ))}
        </div>

        <div className="mt-8 text-center sm:hidden">
          <Link
            href="/blog"
            className="text-base font-medium text-primary-600 hover:text-primary-700"
          >
            View all articles →
          </Link>
        </div>
      </div>
    </section>
  );
}
