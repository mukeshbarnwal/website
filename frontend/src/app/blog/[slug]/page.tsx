import { notFound } from "next/navigation";
import Link from "next/link";
import { headers } from "next/headers";
import { getPostBySlug, getAllPosts, getAllSlugs } from "@/lib/blog";
import type { Metadata } from "next";
import BlogContent from "./BlogContent";

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const slugs = getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "Post not found" };
  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.publish_date,
      authors: [post.author],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
    },
    robots: { index: true, follow: true },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const allPosts = getAllPosts();
  const related = allPosts
    .filter((p) => p.slug !== post.slug)
    .slice(0, 3);

  const headersList = await headers();
  const host = headersList.get("host") ?? "";
  const protocol = headersList.get("x-forwarded-proto") ?? "https";
  const baseUrl = host ? `${protocol}://${host}` : "";
  const shareUrl = `${baseUrl}/blog/${slug}`;
  const shareTitle = encodeURIComponent(post.title);

  return (
    <article className="py-16 md:py-24">
      <header className="mx-auto max-w-2xl">
        <span className="text-xs uppercase tracking-[0.15em] text-[var(--color-accent)]">
          {post.category}
        </span>
        <h1
          className="mt-2 text-3xl font-normal tracking-tight text-[var(--color-paper)] md:text-4xl"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {post.title}
        </h1>
        <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-[var(--color-paper-muted)]">
          <span>{post.author}</span>
          <time dateTime={post.publish_date}>
            {formatDate(post.publish_date)}
          </time>
          <span>{post.reading_time} min read</span>
        </div>
        {post.tags.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-[var(--color-border)] px-3 py-1 text-xs text-[var(--color-paper-subtle)]"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </header>

      <div className="mx-auto mt-10 max-w-2xl">
        <BlogContent content={post.content} />
      </div>

      <div className="mx-auto mt-12 max-w-2xl border-t border-[var(--color-border)] pt-8">
        <p className="text-xs uppercase tracking-[0.15em] text-[var(--color-paper-subtle)]">
          Share
        </p>
        <div className="mt-3 flex gap-4">
          <a
            href={`https://twitter.com/intent/tweet?text=${shareTitle}&url=${encodeURIComponent(shareUrl)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-[var(--color-paper-muted)] transition-colors hover:text-[var(--color-accent)]"
          >
            Twitter
          </a>
          <a
            href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-[var(--color-paper-muted)] transition-colors hover:text-[var(--color-accent)]"
          >
            LinkedIn
          </a>
        </div>
      </div>

      {related.length > 0 && (
        <div className="mx-auto mt-16 max-w-2xl">
          <h2
            className="text-xl font-normal tracking-tight text-[var(--color-paper)]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Related articles
          </h2>
          <ul className="mt-4 space-y-3">
            {related.map((p) => (
              <li key={p.slug}>
                <Link
                  href={`/blog/${p.slug}`}
                  className="link-underline text-[var(--color-paper-muted)] transition-colors hover:text-[var(--color-paper)]"
                >
                  {p.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="mx-auto mt-12 max-w-2xl">
        <Link
          href="/blog"
          className="btn-secondary rounded-xl inline-flex"
        >
          ← Back to Blog
        </Link>
      </div>
    </article>
  );
}
