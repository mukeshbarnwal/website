import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const contentClasses = "blog-content text-[var(--color-paper-muted)] leading-relaxed";

const components = {
  h2: ({ children }: { children?: React.ReactNode }) => (
    <h2
      className="mt-10 mb-4 text-xl font-normal tracking-tight text-[var(--color-paper)]"
      style={{ fontFamily: "var(--font-display)" }}
    >
      {children}
    </h2>
  ),
  h3: ({ children }: { children?: React.ReactNode }) => (
    <h3
      className="mt-6 mb-3 text-lg font-normal tracking-tight text-[var(--color-paper)]"
      style={{ fontFamily: "var(--font-display)" }}
    >
      {children}
    </h3>
  ),
  p: ({ children }: { children?: React.ReactNode }) => (
    <p className="mt-4">{children}</p>
  ),
  a: ({ href, children }: { href?: string; children?: React.ReactNode }) => (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-[var(--color-accent)] underline decoration-[var(--color-accent)]/50 underline-offset-2 transition-colors hover:decoration-[var(--color-accent)]"
    >
      {children}
    </a>
  ),
  strong: ({ children }: { children?: React.ReactNode }) => (
    <strong className="font-semibold text-[var(--color-paper)]">
      {children}
    </strong>
  ),
  ul: ({ children }: { children?: React.ReactNode }) => (
    <ul className="my-4 list-disc space-y-1 pl-6">{children}</ul>
  ),
  ol: ({ children }: { children?: React.ReactNode }) => (
    <ol className="my-4 list-decimal space-y-1 pl-6">{children}</ol>
  ),
  li: ({ children }: { children?: React.ReactNode }) => (
    <li>{children}</li>
  ),
  code: ({ children }: { children?: React.ReactNode }) => (
    <code className="rounded bg-[var(--color-ink-muted)] px-1.5 py-0.5 font-mono text-sm text-[var(--color-accent)]">
      {children}
    </code>
  ),
  pre: ({ children }: { children?: React.ReactNode }) => (
    <pre className="my-4 overflow-x-auto rounded-xl border border-[var(--color-border)] bg-[var(--color-ink-muted)] p-4">
      {children}
    </pre>
  ),
  blockquote: ({ children }: { children?: React.ReactNode }) => (
    <blockquote className="border-l-2 border-[var(--color-accent)]/50 pl-4 italic text-[var(--color-paper-subtle)]">
      {children}
    </blockquote>
  ),
  hr: () => <hr className="my-8 border-[var(--color-border)]" />,
};

export default function BlogContent({ content }: { content: string }) {
  return (
    <div className={contentClasses}>
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
        {content}
      </ReactMarkdown>
    </div>
  );
}
