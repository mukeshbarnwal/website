import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { BlogPost, BlogPostFrontmatter } from "@/types/blog";

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

function getReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / wordsPerMinute));
}

function parseFile(filePath: string): BlogPost {
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  const frontmatter = data as BlogPostFrontmatter;
  const readingTime =
    frontmatter.reading_time ?? getReadingTime(content);
  return {
    ...frontmatter,
    content,
    reading_time: readingTime,
  };
}

export function getAllPosts(): Omit<BlogPost, "content">[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".md"));
  const posts = files.map((file) => {
    const fullPath = path.join(BLOG_DIR, file);
    const post = parseFile(fullPath);
    const { content: _, ...rest } = post;
    return rest;
  });
  posts.sort(
    (a, b) =>
      new Date(b.publish_date).getTime() - new Date(a.publish_date).getTime()
  );
  return posts;
}

export function getPostBySlug(slug: string): BlogPost | null {
  if (!fs.existsSync(BLOG_DIR)) return null;
  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".md"));
  for (const file of files) {
    const fullPath = path.join(BLOG_DIR, file);
    const post = parseFile(fullPath);
    if (post.slug === slug) return post;
  }
  return null;
}

export function getAllSlugs(): string[] {
  return getAllPosts().map((p) => p.slug);
}
