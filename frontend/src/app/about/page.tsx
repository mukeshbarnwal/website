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

        {/* IIT Kharagpur Alumni Initiative */}
        <motion.div
          className="mt-12 rounded-2xl border border-[var(--color-border)] bg-[var(--color-ink-muted)]/50 p-6 md:p-8"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-xs uppercase tracking-[0.2em] text-[var(--color-paper-subtle)]">
            Alumni
          </p>
          <h2
            className="mt-2 text-xl font-normal tracking-tight text-[var(--color-paper)] md:text-2xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            IIT Kharagpur Alumni Initiative
          </h2>
          <p className="mt-3 text-[var(--color-paper-muted)] leading-relaxed">
            I’m an alumnus of the Indian Institute of Technology Kharagpur, passionate about building meaningful AI systems. 
            Through Neatcraft.ai, I aim to share deep insights and contribute to high-impact work in the AI ecosystem.
          </p>
        </motion.div>

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
