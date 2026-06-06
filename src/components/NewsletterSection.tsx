"use client";

import { useState } from "react";
import { Send, CheckCircle } from "lucide-react";

export default function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        setStatus("success");
        setEmail("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <section className="py-20">
      <div className="max-w-2xl mx-auto px-4 text-center">
        <div className="bg-surface border border-border rounded-2xl p-10 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-radial from-primary/10 via-transparent to-transparent" />
          <div className="relative">
            <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 text-primary-light text-sm font-medium px-4 py-1.5 rounded-full mb-6">
              <Send className="w-3.5 h-3.5" /> Weekly AI Intelligence
            </div>
            <h2 className="text-3xl font-bold text-white mb-3">
              Stay ahead of the AI curve
            </h2>
            <p className="text-text-muted mb-8">
              Weekly digest: new agents, AI research that matters, and tactical guides for building
              in the AI-first world.
            </p>
            {status === "success" ? (
              <div className="flex items-center justify-center gap-2 text-green-400 font-medium">
                <CheckCircle className="w-5 h-5" /> You&apos;re in. Check your inbox.
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  className="flex-1 bg-background border border-border rounded-lg px-4 py-2.5 text-white placeholder:text-text-muted text-sm focus:outline-none focus:border-primary transition-colors"
                />
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="btn-primary whitespace-nowrap disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {status === "loading" ? "..." : "Subscribe"}
                </button>
              </form>
            )}
            {status === "error" && (
              <p className="text-red-400 text-sm mt-3">Something went wrong. Try again.</p>
            )}
            <p className="text-text-muted text-xs mt-4">No spam. Unsubscribe anytime.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
