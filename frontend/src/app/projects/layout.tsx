import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Production Systems",
  description:
    "Production-grade AI systems: problem, approach, tech stack, and architecture.",
};

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
