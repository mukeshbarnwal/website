"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const services = [
  {
    title: "RAG & Knowledge Systems",
    description:
      "Design and build retrieval-augmented systems: embeddings, vector search, and LLM integration so your data powers accurate, cited answers.",
  },
  {
    title: "LLM Integration & APIs",
    description:
      "Production-ready APIs and pipelines for LLMs—prompt design, streaming, caching, and observability.",
  },
  {
    title: "AI Backend Architecture",
    description:
      "Scalable backend design for AI workloads: queues, batch processing, and integration with your existing stack.",
  },
];

export default function ServicesPage() {
  return (
    <motion.div
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
          Services
        </h1>
        <p className="mt-4 text-[var(--color-paper-muted)]">
          I help teams ship production-grade AI—from RAG and LLMs to backend
          architecture and APIs.
        </p>
        <ul className="mt-12 space-y-10">
          {services.map((service, index) => (
            <motion.li
              key={service.title}
              className="border-b border-[var(--color-border)] pb-10 last:border-0 last:pb-0"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.4,
                delay: 0.1 + index * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <h2 className="text-lg font-medium text-[var(--color-paper)]" style={{ fontFamily: "var(--font-display)" }}>
                {service.title}
              </h2>
              <p className="mt-2 text-[var(--color-paper-muted)] leading-relaxed">
                {service.description}
              </p>
            </motion.li>
          ))}
        </ul>
        <div className="mt-12">
          <Link href="/contact" className="btn-primary rounded-xl inline-flex">
            Contact
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
