import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Insights on AI, data science, and AI systems—thought leadership and educational content from Neatcraft.",
  openGraph: {
    title: "Blog | Neatcraft",
    description:
      "Insights on AI, data science, and AI systems—thought leadership and educational content from Neatcraft.",
    type: "website",
  },
  robots: { index: true, follow: true },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
