"use client";

import Link from "next/link";
import { motion } from "framer-motion";

type ProjectCard = {
  title: string;
  problem: string;
  whyHard: string;
  techStack: string[];
  architecture: string;
};

const placeholderProjects: ProjectCard[] = [
  {
    title: "RAG-Powered Knowledge Base",
    problem:
      "Teams needed accurate, cited answers from internal docs without hallucination.",
    whyHard:
      "Balancing retrieval quality, context length, and latency for real-time chat.",
    techStack: ["LLM", "BGE-M3", "Qdrant", "LangChain", "FastAPI"],
    architecture:
      "User query → embedding → vector search (Qdrant) → top-k retrieval → LLM prompt with context → streamed response.",
  },
  {
    title: "AI Chat for Portfolio",
    problem:
      "Visitors wanted to ask questions about my work and get accurate, contextual answers.",
    whyHard:
      "Building a small, reliable RAG pipeline with minimal infra and clear observability.",
    techStack: ["Next.js", "Django REST", "OpenAI / Llama", "Qdrant", "PostgreSQL"],
    architecture:
      "Next.js frontend → Django API → embedding + vector search → LLM → response. Optional caching and rate limiting.",
  },
  {
    title: "Document Classification Pipeline",
    problem:
      "Large volumes of documents needed consistent tagging and routing for downstream workflows.",
    whyHard:
      "Throughput, cost control, and handling edge cases without manual review.",
    techStack: ["Python", "Transformers", "Celery", "PostgreSQL", "S3"],
    architecture:
      "Ingest → queue (Celery) → embedding + classifier → write labels and metadata → trigger workflows.",
  },
];

function ProjectCardComponent({
  project,
  index,
}: {
  project: ProjectCard;
  index: number;
}) {
  return (
    <motion.article
      className="group rounded-2xl border border-[var(--color-border)] bg-[var(--color-ink-muted)]/50 p-6 md:p-8 transition-colors hover:border-[var(--color-border-hover)]"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.4,
        delay: index * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <h2 className="text-xl font-medium text-[var(--color-paper)]" style={{ fontFamily: "var(--font-display)" }}>
        {project.title}
      </h2>
      <div className="mt-5 space-y-4 text-sm text-[var(--color-paper-muted)]">
        <div>
          <span className="text-[var(--color-paper-subtle)]">Problem — </span>
          {project.problem}
        </div>
        <div>
          <span className="text-[var(--color-paper-subtle)]">Why it was hard — </span>
          {project.whyHard}
        </div>
        <div>
          <span className="text-[var(--color-paper-subtle)]">Tech stack — </span>
          {project.techStack.join(", ")}
        </div>
        <div>
          <span className="text-[var(--color-paper-subtle)]">Architecture — </span>
          {project.architecture}
        </div>
      </div>
    </motion.article>
  );
}

export default function ProjectsPage() {
  return (
    <div className="py-16 md:py-24">
      <div className="mb-12 md:mb-16">
        <h1
          className="text-3xl font-normal tracking-tight text-[var(--color-paper)] md:text-4xl"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Production Systems
        </h1>
        <p className="mt-4 max-w-xl text-[var(--color-paper-muted)]">
          Shipped AI systems: problem, approach, tech stack, and architecture.
        </p>
      </div>
      <div className="space-y-8">
        {placeholderProjects.map((project, index) => (
          <ProjectCardComponent key={project.title} project={project} index={index} />
        ))}
      </div>
      <div className="mt-12">
        <Link href="/ai-lab" className="btn-secondary rounded-xl inline-flex">
          Try AI Demo
        </Link>
      </div>
    </div>
  );
}
