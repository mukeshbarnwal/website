import Link from "next/link";
import { getAllPosts } from "@/lib/blog";
import BlogCard from "./BlogCard";

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <article className="py-16 md:py-24">
      <div className="mb-12 md:mb-16">
        <h1
          className="text-3xl font-normal tracking-tight text-[var(--color-paper)] md:text-4xl"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Blog
        </h1>
        <p className="mt-4 max-w-xl text-[var(--color-paper-muted)]">
          Insights on AI, data science, and AI systems—building a knowledge hub
          around meaningful AI.
        </p>
      </div>

      {posts.length === 0 ? (
        <p className="text-[var(--color-paper-muted)]">
          No posts yet. Check back soon.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, index) => (
            <BlogCard key={post.slug} post={post} index={index} />
          ))}
        </div>
      )}
    </article>
  );
}
