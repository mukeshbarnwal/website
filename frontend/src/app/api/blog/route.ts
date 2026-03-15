import { NextResponse } from "next/server";
import { writePost, slugify } from "@/lib/blog";
import type { BlogPostPayload } from "@/types/blog";

function requireAdmin(request: Request): NextResponse | null {
  const secret = process.env.ADMIN_SECRET;
  if (!secret) return null; // no secret configured = allow (dev)
  const header = request.headers.get("x-admin-secret");
  if (header !== secret) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return null;
}

export async function POST(request: Request) {
  const auth = requireAdmin(request);
  if (auth) return auth;

  let body: BlogPostPayload;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON body" },
      { status: 400 }
    );
  }

  const { title, description, author, tags, content, published, slug: slugInput } = body;
  if (!title?.trim()) {
    return NextResponse.json(
      { error: "title is required" },
      { status: 400 }
    );
  }

  const slug = (slugInput?.trim() || slugify(title)).toLowerCase();
  if (!slug) {
    return NextResponse.json(
      { error: "Could not generate slug from title" },
      { status: 400 }
    );
  }

  const date = new Date().toISOString().slice(0, 10);

  try {
    writePost(
      slug,
      {
        title: title.trim(),
        description: (description ?? "").trim(),
        author: (author ?? "Mukesh Barnwal").trim(),
        date,
        tags: Array.isArray(tags) ? tags : [],
        published: published !== false,
      },
      (content ?? "").trim()
    );
  } catch (err) {
    console.error("Blog write error:", err);
    return NextResponse.json(
      { error: "Failed to save blog post. In production, ensure the app can write to content/blog (e.g. use a writable volume or GitHub API)." },
      { status: 500 }
    );
  }

  return NextResponse.json({ slug, published: published !== false });
}
