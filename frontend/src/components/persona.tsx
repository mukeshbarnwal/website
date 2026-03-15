"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function Persona() {
  return (
    <section className="relative py-28 md:py-36 text-center">
      {/* Decorative line */}
      <div className="absolute left-1/2 top-24 h-px w-12 -translate-x-1/2 bg-[var(--color-border-hover)]" />

      <motion.div
        className="mx-auto max-w-4xl"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Name */}
        <p className="text-sm uppercase tracking-[0.2em] text-[var(--color-paper-subtle)]">
          Mukesh Barnwal
        </p>
        {/* Title */}
        <p className="mt-2 text-lg text-[var(--color-paper-muted)]">
          AI Systems Engineer
        </p>

        {/* Strong positioning line */}
        <h1
          className="mt-6 text-4xl font-normal leading-[1.15] tracking-tight text-[var(--color-paper)] sm:text-5xl md:text-6xl lg:text-7xl"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Building{" "}
          <span className="text-[var(--color-accent)]">Production-Grade</span>{" "}
          AI Systems
        </h1>

        <motion.p
          className="mt-8 text-lg text-[var(--color-paper-muted)] max-w-xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          I design scalable AI architectures using LLMs, vector databases, and
          modern backend infrastructure.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          className="mt-12 flex flex-wrap justify-center gap-4"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          <Link href="/projects" className="btn-primary rounded-xl">
            View Systems
          </Link>
          <Link href="/ai-lab" className="btn-secondary rounded-xl">
            Explore AI Lab
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
