import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { BlogPost, BlogPostFrontmatter } from "@/types/blog";

/** Resolve blog content dir: prefer content/blog under cwd; if missing, try frontend/content/blog (when running from repo root). */
function getBlogDir(): string {
  const cwd = process.cwd();
  const primary = path.join(cwd, "content", "blog");
  if (fs.existsSync(primary)) return primary;
  const fromRoot = path.join(cwd, "frontend", "content", "blog");
  if (fs.existsSync(path.join(cwd, "frontend"))) return fromRoot;
  return primary;
}

const BLOG_DIR = getBlogDir();

function getReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / wordsPerMinute));
}

/** Normalize date from frontmatter (PRD uses date, legacy uses publish_date). */
function getDate(fm: BlogPostFrontmatter): string {
  return fm.date ?? fm.publish_date ?? new Date().toISOString().slice(0, 10);
}

/** Normalize published flag; default true for backward compat. */
function isPublished(fm: BlogPostFrontmatter): boolean {
  return fm.published !== false;
}

function parseFile(filePath: string): BlogPost {
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  const frontmatter = data as BlogPostFrontmatter;
  const readingTime =
    frontmatter.reading_time ?? getReadingTime(content);
  const date = getDate(frontmatter);
  return {
    ...frontmatter,
    publish_date: date,
    content,
    reading_time: readingTime,
  };
}

/** Get all posts for public listing (published only), sorted by date descending. */
export function getAllPosts(): Omit<BlogPost, "content">[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".md"));
  const posts = files.map((file) => {
    const fullPath = path.join(BLOG_DIR, file);
    const post = parseFile(fullPath);
    const { content: _, ...rest } = post;
    return rest;
  });
  const published = posts.filter((p) => isPublished(p));
  published.sort(
    (a, b) =>
      new Date(b.publish_date).getTime() - new Date(a.publish_date).getTime()
  );
  return published;
}

/** Get a single post by slug (published or draft). */
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

/** Get all slugs for static params (published posts only for public routes). */
export function getAllSlugs(): string[] {
  return getAllPosts().map((p) => p.slug);
}

/** Slugify a string for URL-safe filenames. */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

/** Write a blog post to content/blog as .md. Used by admin API. */
export function writePost(
  slug: string,
  frontmatter: Omit<BlogPostFrontmatter, "slug"> & { slug?: string },
  content: string
): void {
  if (!fs.existsSync(BLOG_DIR)) {
    fs.mkdirSync(BLOG_DIR, { recursive: true });
  }
  const date = frontmatter.date ?? frontmatter.publish_date ?? new Date().toISOString().slice(0, 10);
  const fm: Record<string, unknown> = {
    title: frontmatter.title,
    slug,
    description: frontmatter.description,
    author: frontmatter.author,
    date,
    tags: frontmatter.tags ?? [],
    published: frontmatter.published !== false,
  };
  if (frontmatter.category != null) fm.category = frontmatter.category;
  const yaml = matter.stringify(content, fm);
  const filePath = path.join(BLOG_DIR, `${slug}.md`);
  fs.writeFileSync(filePath, yaml, "utf-8");
}
