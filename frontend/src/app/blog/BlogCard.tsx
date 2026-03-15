"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { BlogPost } from "@/types/blog";

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function BlogCard({
  post,
  index,
}: {
  post: Omit<BlogPost, "content">;
  index: number;
}) {
  return (
    <motion.article
      className="group flex flex-col rounded-2xl border border-[var(--color-border)] bg-[var(--color-ink-muted)]/50 p-6 transition-all duration-300 hover:border-[var(--color-border-hover)] hover:bg-[var(--color-ink-muted)]/70"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.4,
        delay: index * 0.06,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <span className="text-xs uppercase tracking-[0.15em] text-[var(--color-accent)]">
        {post.category ?? post.tags?.[0] ?? "Blog"}
      </span>
      <h2
        className="mt-2 text-xl font-normal tracking-tight text-[var(--color-paper)] transition-colors group-hover:text-[var(--color-accent)]"
        style={{ fontFamily: "var(--font-display)" }}
      >
        <Link href={`/blog/${post.slug}`} className="link-underline">
          {post.title}
        </Link>
      </h2>
      <p className="mt-3 line-clamp-3 flex-1 text-sm text-[var(--color-paper-muted)] leading-relaxed">
        {post.description}
      </p>
      <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[var(--color-paper-subtle)]">
        <span>{post.author}</span>
        <span>{formatDate(post.publish_date)}</span>
        <span>{post.reading_time} min read</span>
      </div>
      <Link
        href={`/blog/${post.slug}`}
        className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-[var(--color-accent)] transition-colors hover:text-[var(--color-paper)]"
      >
        Read →
      </Link>
    </motion.article>
  );
}
