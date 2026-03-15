import "./globals.css";
import type { Metadata } from "next";
import { Instrument_Serif, DM_Sans } from "next/font/google";
import Navbar from "@/components/Navbar";

const instrumentSerif = Instrument_Serif({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: {
    default: "Mukesh Barnwal | AI Systems Engineer",
    template: "%s | Mukesh Barnwal",
  },
  description:
    "Building production-grade AI systems using LLMs, vector databases, and scalable backend infrastructure.",
  openGraph: {
    title: "Mukesh Barnwal | AI Systems Engineer",
    description:
      "Building production-grade AI systems using LLMs, vector databases, and scalable backend infrastructure.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mukesh Barnwal | AI Systems Engineer",
    description:
      "Building production-grade AI systems using LLMs, vector databases, and scalable backend infrastructure.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${instrumentSerif.variable} ${dmSans.variable}`}>
      <body className="min-h-screen bg-[var(--color-ink)] text-[var(--color-paper)] antialiased">

        {/* Subtle grid */}
        <div className="fixed inset-0 -z-20 bg-grid opacity-40" />

        {/* Ambient glow */}
        <div className="fixed inset-0 -z-10 flex justify-center pointer-events-none">
          <div className="w-[900px] h-[500px] bg-[var(--color-accent)]/8 blur-[160px] rounded-full mt-[-120px]" />
        </div>

        <div className="max-w-5xl mx-auto px-6 md:px-10 lg:px-12">
          <Navbar />
          <main>{children}</main>
        </div>

      </body>
    </html>
  );
}