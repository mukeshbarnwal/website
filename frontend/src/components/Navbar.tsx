"use client";

import Link from "next/link";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/services", label: "Services" },
  { href: "/contact", label: "Contact" },
  { href: "/ai-lab", label: "AI Lab" },
];

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 flex justify-between items-center py-6 md:py-8">
      <Link
        href="/"
        className="flex items-center gap-2 rounded-2xl border border-[var(--color-border)] bg-[var(--color-ink-muted)]/80 px-4 py-2.5 backdrop-blur-xl transition-colors hover:border-[var(--color-border-hover)]"
      >
        <span
          className="text-lg font-medium tracking-tight text-[var(--color-paper)]"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Mukesh Barnwal
        </span>
      </Link>

      <div className="flex items-center gap-1 rounded-2xl border border-[var(--color-border)] bg-[var(--color-ink-muted)]/80 px-2 py-2 backdrop-blur-xl">
        {navLinks.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className="link-underline rounded-xl px-3 py-2.5 text-sm text-[var(--color-paper-muted)] transition-colors hover:text-[var(--color-paper)] md:px-4"
          >
            {label}
          </Link>
        ))}
        <a
          href="/resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="link-underline rounded-xl px-3 py-2.5 text-sm text-[var(--color-accent)] transition-colors hover:text-[var(--color-paper)] md:px-4"
        >
          Resume
        </a>
      </div>
    </nav>
  );
}
