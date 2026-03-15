import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services",
  description:
    "AI systems design, RAG pipelines, LLM integration, and production backend infrastructure.",
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
