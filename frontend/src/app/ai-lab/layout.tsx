import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Lab",
  description: "Ask me anything about my work and systems — RAG-powered AI demo.",
};

export default function AILabLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
