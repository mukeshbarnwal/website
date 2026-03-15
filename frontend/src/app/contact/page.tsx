"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const socialLinks = [
  { label: "Email", href: "mailto:mukeshbarnwal.iit@gmail.com", value: "mukeshbarnwal.iit@gmail.com" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/mukesh-barnwal-017782324/", value: "LinkedIn" },
  { label: "GitHub", href: "https://github.com/mukeshbarnwal", value: "GitHub" },
];

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    // Static form – no backend yet (Phase 2)
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 600);
  }

  return (
    <motion.div
      className="py-16 md:py-24"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="mx-auto max-w-xl">
        <h1
          className="text-3xl font-normal tracking-tight text-[var(--color-paper)] md:text-4xl"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Contact
        </h1>
        <p className="mt-4 text-[var(--color-paper-muted)]">
          Email, LinkedIn, GitHub — or send a message below.
        </p>

        {/* Email, LinkedIn, GitHub */}
        <ul className="mt-10 space-y-3">
          {socialLinks.map((link) => (
            <li key={link.label}>
              <span className="text-sm text-[var(--color-paper-subtle)]">{link.label}: </span>
              <a
                href={link.href}
                target={link.label === "Email" ? undefined : "_blank"}
                rel={link.label === "Email" ? undefined : "noopener noreferrer"}
                className="link-underline text-[var(--color-accent)] hover:text-[var(--color-paper)]"
              >
                {link.value}
              </a>
            </li>
          ))}
        </ul>

        {/* Contact form */}
        <div className="mt-12 rounded-2xl border border-[var(--color-border)] bg-[var(--color-ink-muted)]/50 p-6 md:p-8">
          <h2 className="text-lg font-medium text-[var(--color-paper)]" style={{ fontFamily: "var(--font-display)" }}>
            Send a message
          </h2>
          {submitted ? (
            <p className="mt-4 text-[var(--color-paper-muted)]">
              Thanks. I’ll get back to you soon. (Form is static for now — connect backend in Phase 5.)
            </p>
          ) : (
            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm text-[var(--color-paper-subtle)]">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  className="mt-1.5 w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-ink)] px-4 py-3 text-[var(--color-paper)] placeholder:text-[var(--color-paper-subtle)] focus:border-[var(--color-accent)] focus:outline-none focus:ring-1 focus:ring-[var(--color-accent)]"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm text-[var(--color-paper-subtle)]">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="mt-1.5 w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-ink)] px-4 py-3 text-[var(--color-paper)] placeholder:text-[var(--color-paper-subtle)] focus:border-[var(--color-accent)] focus:outline-none focus:ring-1 focus:ring-[var(--color-accent)]"
                  placeholder="you@example.com"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm text-[var(--color-paper-subtle)]">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  required
                  className="mt-1.5 w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-ink)] px-4 py-3 text-[var(--color-paper)] placeholder:text-[var(--color-paper-subtle)] focus:border-[var(--color-accent)] focus:outline-none focus:ring-1 focus:ring-[var(--color-accent)] resize-none"
                  placeholder="Your message"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="btn-primary rounded-xl disabled:opacity-60"
              >
                {loading ? "Sending…" : "Send"}
              </button>
            </form>
          )}
        </div>
      </div>
    </motion.div>
  );
}
