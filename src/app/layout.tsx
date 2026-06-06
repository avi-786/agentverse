import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: {
    default: "AgentVerse — AI Agents Marketplace",
    template: "%s | AgentVerse",
  },
  description:
    "Buy production-ready AI agents, workflows, and automation tools. Plus in-depth coverage of the AI-first world.",
  keywords: ["AI agents", "AI automation", "LLM agents", "AI marketplace", "AI tools"],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://agentverse.ai",
    siteName: "AgentVerse",
    title: "AgentVerse — AI Agents Marketplace",
    description: "Buy production-ready AI agents, workflows, and automation tools.",
  },
  twitter: {
    card: "summary_large_image",
    title: "AgentVerse — AI Agents Marketplace",
    description: "Buy production-ready AI agents, workflows, and automation tools.",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen flex flex-col antialiased">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
