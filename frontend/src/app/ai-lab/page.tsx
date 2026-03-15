"use client";

import { motion } from "framer-motion";
import { useState } from "react";

type Message = { role: "user" | "assistant"; content: string };

const placeholderResponse =
  "This is the AI Demo section. Ask me anything about my work or systems. (Backend will be connected in Phase 5 — responses will come from RAG + LLM.)";

export default function AILabPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const text = input.trim();
    if (!text || loading) return;
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: text }]);
    setLoading(true);
    // Static demo: fake delay then placeholder response
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: placeholderResponse },
      ]);
      setLoading(false);
    }, 800);
  }

  return (
    <motion.div
      className="flex flex-col py-16 md:py-24 min-h-[60vh]"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="mb-8">
        <h1
          className="text-3xl font-normal tracking-tight text-[var(--color-paper)] md:text-4xl"
          style={{ fontFamily: "var(--font-display)" }}
        >
          AI Lab
        </h1>
        <p className="mt-4 text-[var(--color-paper-muted)]">
          Ask me anything about my work or systems. Responses will be generated
          via RAG + LLM once the backend is connected.
        </p>
        {/* Model indicator (static for now) */}
        <p className="mt-2 text-xs text-[var(--color-paper-subtle)]">
          Model: Demo mode (static) — backend in Phase 5
        </p>
      </div>

      {/* Chat area */}
      <div className="flex-1 rounded-2xl border border-[var(--color-border)] bg-[var(--color-ink-muted)]/50 flex flex-col min-h-[320px]">
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {messages.length === 0 && (
            <p className="text-center text-[var(--color-paper-subtle)] text-sm">
              Type a question and press Enter to start.
            </p>
          )}
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className={
                msg.role === "user"
                  ? "ml-auto max-w-[85%] rounded-2xl rounded-br-md bg-[var(--color-accent)]/20 px-4 py-3 text-[var(--color-paper)]"
                  : "max-w-[85%] rounded-2xl rounded-bl-md border border-[var(--color-border)] bg-[var(--color-ink)]/80 px-4 py-3 text-[var(--color-paper-muted)]"
              }
            >
              {msg.content}
            </motion.div>
          ))}
          {loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex max-w-[85%] gap-1.5 rounded-2xl rounded-bl-md border border-[var(--color-border)] bg-[var(--color-ink)]/80 px-4 py-3"
            >
              <span className="h-2 w-2 rounded-full bg-[var(--color-paper-subtle)] animate-bounce [animation-delay:0ms]" />
              <span className="h-2 w-2 rounded-full bg-[var(--color-paper-subtle)] animate-bounce [animation-delay:150ms]" />
              <span className="h-2 w-2 rounded-full bg-[var(--color-paper-subtle)] animate-bounce [animation-delay:300ms]" />
            </motion.div>
          )}
        </div>

        {/* Input box */}
        <form onSubmit={handleSubmit} className="p-4 border-t border-[var(--color-border)]">
          <div className="flex gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask anything about my systems or experience…"
              className="flex-1 rounded-xl border border-[var(--color-border)] bg-[var(--color-ink)] px-4 py-3 text-[var(--color-paper)] placeholder:text-[var(--color-paper-subtle)] focus:border-[var(--color-accent)] focus:outline-none focus:ring-1 focus:ring-[var(--color-accent)]"
              disabled={loading}
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="btn-primary rounded-xl px-6 disabled:opacity-50"
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  );
}
