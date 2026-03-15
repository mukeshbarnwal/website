"use client";

import { motion } from "framer-motion";

export default function AboutPage() {
  return (
    <motion.article
      className="py-16 md:py-24"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="mx-auto max-w-2xl">
        <h1
          className="text-3xl font-normal tracking-tight text-[var(--color-paper)] md:text-4xl"
          style={{ fontFamily: "var(--font-display)" }}
        >
          About
        </h1>
        <p className="mt-4 text-[var(--color-paper-muted)]">
          I focus on designing and building production-grade AI systems—from RAG
          pipelines and LLM integrations to vector search and scalable APIs. I
          work with modern backend infrastructure so AI solutions are reliable
          and maintainable in production.
        </p>
        <p className="mt-6 text-[var(--color-paper-muted)] leading-relaxed">
          This portfolio is both a showcase of shipped systems and a live AI
          lab. You can explore projects, see how problems were solved, and try
          the Ask Me Anything demo to see retrieval-augmented generation in
          action.
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          <a href="/projects" className="btn-primary rounded-xl">
            View Production Systems
          </a>
          <a href="/contact" className="btn-secondary rounded-xl">
            Get in Touch
          </a>
        </div>
      </div>
    </motion.article>
  );
}
