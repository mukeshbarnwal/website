"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const DEFAULT_AUTHOR = "Mukesh Barnwal";

function NewBlogEditor() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [author, setAuthor] = useState(DEFAULT_AUTHOR);
  const [tagsStr, setTagsStr] = useState("");
  const [content, setContent] = useState("");
  const [published, setPublished] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [adminSecret, setAdminSecret] = useState("");

  const draftSlug = searchParams.get("draft");
  useEffect(() => {
    if (draftSlug) {
      setSuccess(`Draft saved as ${draftSlug}.md. It will not appear on the public blog until you publish.`);
      router.replace("/admin/blog/new", { scroll: false });
    }
  }, [draftSlug, router]);

  const tags = tagsStr
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);

  const handleSubmit = async (asDraft: boolean) => {
    setError(null);
    setLoading(true);
    try {
      const headers: Record<string, string> = {
        "Content-Type": "application/json",
      };
      if (adminSecret) headers["x-admin-secret"] = adminSecret;

      const res = await fetch("/api/blog", {
        method: "POST",
        headers,
        body: JSON.stringify({
          title: title.trim() || "Untitled",
          description: description.trim(),
          author: author.trim() || DEFAULT_AUTHOR,
          tags,
          content: content.trim(),
          published: !asDraft,
        }),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.error || `Request failed (${res.status})`);
        return;
      }
      if (data.published) {
        router.push(`/blog/${data.slug}`);
        router.refresh();
      } else {
        router.push(`/admin/blog/new?draft=${data.slug}`);
        router.refresh();
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "Request failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-16 md:py-24">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1
              className="text-3xl font-normal tracking-tight text-[var(--color-paper)] md:text-4xl"
              style={{ fontFamily: "var(--font-display)" }}
            >
              New blog post
            </h1>
            <p className="mt-2 text-sm text-[var(--color-paper-muted)]">
              Create a post; it will be saved as a Markdown file in the repo.
            </p>
          </div>
          <Link
            href="/blog"
            className="btn-secondary rounded-xl"
          >
            ← Blog
          </Link>
        </div>

        {error && (
          <div className="mb-6 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
            {error}
          </div>
        )}
        {success && (
          <div className="mb-6 rounded-xl border border-[var(--color-accent)]/30 bg-[var(--color-accent-dim)] px-4 py-3 text-sm text-[var(--color-paper)]">
            {success}
          </div>
        )}

        <div className="space-y-6">
          <div>
            <label className="mb-1.5 block text-xs uppercase tracking-wider text-[var(--color-paper-subtle)]">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Understanding LLM Architecture"
              className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-ink-muted)]/50 px-4 py-3 text-[var(--color-paper)] placeholder:text-[var(--color-paper-subtle)] focus:border-[var(--color-accent)] focus:outline-none focus:ring-1 focus:ring-[var(--color-accent)]"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-xs uppercase tracking-wider text-[var(--color-paper-subtle)]">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="A short summary for cards and SEO."
              rows={2}
              className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-ink-muted)]/50 px-4 py-3 text-[var(--color-paper)] placeholder:text-[var(--color-paper-subtle)] focus:border-[var(--color-accent)] focus:outline-none focus:ring-1 focus:ring-[var(--color-accent)]"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-xs uppercase tracking-wider text-[var(--color-paper-subtle)]">
                Author
              </label>
              <input
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder={DEFAULT_AUTHOR}
                className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-ink-muted)]/50 px-4 py-3 text-[var(--color-paper)] placeholder:text-[var(--color-paper-subtle)] focus:border-[var(--color-accent)] focus:outline-none focus:ring-1 focus:ring-[var(--color-accent)]"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs uppercase tracking-wider text-[var(--color-paper-subtle)]">
                Tags (comma-separated)
              </label>
              <input
                type="text"
                value={tagsStr}
                onChange={(e) => setTagsStr(e.target.value)}
                placeholder="AI, LLM, Engineering"
                className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-ink-muted)]/50 px-4 py-3 text-[var(--color-paper)] placeholder:text-[var(--color-paper-subtle)] focus:border-[var(--color-accent)] focus:outline-none focus:ring-1 focus:ring-[var(--color-accent)]"
              />
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-xs uppercase tracking-wider text-[var(--color-paper-subtle)]">
              Content (Markdown)
            </label>
            <div className="grid gap-4 lg:grid-cols-2">
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="# Heading&#10;&#10;Write your post in **Markdown**..."
                rows={20}
                className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-ink-muted)]/50 px-4 py-3 font-mono text-sm text-[var(--color-paper)] placeholder:text-[var(--color-paper-subtle)] focus:border-[var(--color-accent)] focus:outline-none focus:ring-1 focus:ring-[var(--color-accent)]"
              />
              <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-ink-muted)]/30 p-4">
                <p className="mb-2 text-xs uppercase tracking-wider text-[var(--color-paper-subtle)]">
                  Preview
                </p>
                <div className="blog-preview min-h-[200px] text-sm text-[var(--color-paper-muted)]">
                  {content ? (
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {content}
                    </ReactMarkdown>
                  ) : (
                    <span className="text-[var(--color-paper-subtle)]">
                      Preview will appear here.
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-xs uppercase tracking-wider text-[var(--color-paper-subtle)]">
              Admin secret (optional)
            </label>
            <input
              type="password"
              value={adminSecret}
              onChange={(e) => setAdminSecret(e.target.value)}
              placeholder="Only if ADMIN_SECRET is set in .env to protect the API"
              className="w-full max-w-md rounded-xl border border-[var(--color-border)] bg-[var(--color-ink-muted)]/50 px-4 py-3 text-[var(--color-paper)] placeholder:text-[var(--color-paper-subtle)] focus:border-[var(--color-accent)] focus:outline-none focus:ring-1 focus:ring-[var(--color-accent)]"
            />
          </div>

          <div className="flex flex-wrap items-center gap-4 border-t border-[var(--color-border)] pt-8">
            <button
              type="button"
              onClick={() => handleSubmit(false)}
              disabled={loading}
              className="btn-primary rounded-xl disabled:opacity-50"
            >
              {loading ? "Publishing…" : "Publish"}
            </button>
            <button
              type="button"
              onClick={() => handleSubmit(true)}
              disabled={loading}
              className="btn-secondary rounded-xl disabled:opacity-50"
            >
              Save draft
            </button>
            <label className="flex cursor-pointer items-center gap-2 text-sm text-[var(--color-paper-muted)]">
              <input
                type="checkbox"
                checked={published}
                onChange={(e) => setPublished(e.target.checked)}
                className="rounded border-[var(--color-border)]"
              />
              Publish by default
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function NewBlogPage() {
  return (
    <Suspense fallback={<div className="py-16 text-[var(--color-paper-muted)]">Loading editor…</div>}>
      <NewBlogEditor />
    </Suspense>
  );
}
