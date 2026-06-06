import { prisma } from "@/lib/db";
import { parseJsonField } from "@/lib/utils";
import AgentCard from "@/components/AgentCard";
import type { Agent, AgentCategory } from "@/types";

export const dynamic = "force-dynamic";
import { AGENT_CATEGORIES } from "@/types";
import Link from "next/link";
import { Search } from "lucide-react";

async function getAgents(category?: string): Promise<Agent[]> {
  const agents = await prisma.agent.findMany({
    where: category && category !== "All" ? { category } : undefined,
    orderBy: [{ featured: "desc" }, { rating: "desc" }],
    include: { seller: { select: { id: true, name: true } } },
  });
  return agents.map((a) => ({
    ...a,
    priceType: a.priceType as Agent["priceType"],
    techStack: parseJsonField<string>(a.techStack),
    features: parseJsonField<string>(a.features),
    useCases: parseJsonField<string>(a.useCases),
  }));
}

export default async function MarketplacePage({
  searchParams,
}: {
  searchParams: { category?: string };
}) {
  const activeCategory = (searchParams.category as AgentCategory) ?? "All";
  const agents = await getAgents(activeCategory === "All" ? undefined : activeCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold text-white mb-4">AI Agent Marketplace</h1>
        <p className="text-text-muted text-lg max-w-2xl mx-auto">
          Production-ready agents built on the latest foundation models. Buy once, deploy anywhere.
        </p>
      </div>

      {/* Search bar (visual — full search via API would hook up here) */}
      <div className="relative max-w-xl mx-auto mb-10">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
        <input
          type="text"
          placeholder="Search agents..."
          className="w-full bg-surface border border-border rounded-xl pl-12 pr-4 py-3 text-white placeholder:text-text-muted focus:outline-none focus:border-primary transition-colors"
        />
      </div>

      {/* Category filter */}
      <div className="flex flex-wrap gap-2 justify-center mb-10">
        {AGENT_CATEGORIES.map((cat) => (
          <Link
            key={cat}
            href={`/marketplace${cat !== "All" ? `?category=${encodeURIComponent(cat)}` : ""}`}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              activeCategory === cat
                ? "bg-primary text-white"
                : "bg-surface border border-border text-text-muted hover:border-primary/40 hover:text-white"
            }`}
          >
            {cat}
          </Link>
        ))}
      </div>

      {/* Agent grid */}
      {agents.length === 0 ? (
        <div className="text-center py-20 text-text-muted">
          No agents in this category yet. Check back soon.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {agents.map((agent) => (
            <AgentCard key={agent.id} agent={agent} featured={agent.featured} />
          ))}
        </div>
      )}
    </div>
  );
}
