import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "AI Systems Engineer building production-grade AI with LLMs, vector databases, and scalable backend infrastructure.",
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
