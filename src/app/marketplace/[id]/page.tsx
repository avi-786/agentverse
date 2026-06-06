import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/db";
import { parseJsonField, formatPrice } from "@/lib/utils";
import type { Agent } from "@/types";
import {
  Star,
  CheckCircle,
  ArrowLeft,
  Zap,
  Code2,
  Globe,
  Package,
  ShoppingCart,
} from "lucide-react";
import BuyButton from "@/components/BuyButton";

async function getAgent(slug: string): Promise<Agent | null> {
  const agent = await prisma.agent.findUnique({
    where: { slug },
    include: { seller: { select: { id: true, name: true } } },
  });
  if (!agent) return null;
  return {
    ...agent,
    priceType: agent.priceType as Agent["priceType"],
    techStack: parseJsonField<string>(agent.techStack),
    features: parseJsonField<string>(agent.features),
    useCases: parseJsonField<string>(agent.useCases),
  };
}

export default async function AgentDetailPage({ params }: { params: { id: string } }) {
  const agent = await getAgent(params.id);
  if (!agent) notFound();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Back */}
      <Link
        href="/marketplace"
        className="inline-flex items-center gap-2 text-text-muted hover:text-white text-sm mb-8 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Marketplace
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Main content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Hero image */}
          {agent.imageUrl && (
            <div className="relative h-72 rounded-2xl overflow-hidden bg-surface-2">
              <Image src={agent.imageUrl} alt={agent.name} fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
            </div>
          )}

          {/* Title */}
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="text-xs font-semibold text-primary-light bg-primary/10 border border-primary/20 px-2.5 py-1 rounded-full">
                {agent.category}
              </span>
              {agent.featured && (
                <span className="text-xs font-semibold text-yellow-400 bg-yellow-400/10 border border-yellow-400/20 px-2.5 py-1 rounded-full">
                  Featured
                </span>
              )}
            </div>
            <h1 className="text-4xl font-bold text-white">{agent.name}</h1>
            <p className="text-xl text-gray-400 mt-2">{agent.tagline}</p>

            {/* Rating */}
            <div className="flex items-center gap-3 mt-4">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(agent.rating)
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-gray-600"
                    }`}
                  />
                ))}
              </div>
              <span className="text-white font-medium">{agent.rating}</span>
              <span className="text-text-muted text-sm">({agent.reviewCount} reviews)</span>
            </div>
          </div>

          {/* Description */}
          <div>
            <h2 className="text-xl font-semibold text-white mb-3">About this agent</h2>
            <p className="text-gray-400 leading-relaxed">{agent.description}</p>
          </div>

          {/* Features */}
          <div>
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <Package className="w-5 h-5 text-primary-light" /> What&apos;s included
            </h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {agent.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2.5">
                  <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-300 text-sm">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Use cases */}
          <div>
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <Globe className="w-5 h-5 text-primary-light" /> Use cases
            </h2>
            <div className="flex flex-wrap gap-2">
              {agent.useCases.map((uc) => (
                <span
                  key={uc}
                  className="bg-surface-2 border border-border text-gray-300 text-sm px-3 py-1.5 rounded-lg"
                >
                  {uc}
                </span>
              ))}
            </div>
          </div>

          {/* Tech stack */}
          <div>
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <Code2 className="w-5 h-5 text-primary-light" /> Tech stack
            </h2>
            <div className="flex flex-wrap gap-2">
              {agent.techStack.map((tech) => (
                <span
                  key={tech}
                  className="bg-surface border border-border text-gray-300 text-sm px-3 py-1.5 rounded-lg font-mono"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar — purchase */}
        <div className="lg:col-span-1">
          <div className="bg-surface border border-border rounded-2xl p-6 sticky top-24">
            <div className="flex items-center gap-2 mb-1">
              <Zap className="w-5 h-5 text-primary-light" />
              <span className="text-text-muted text-sm">AgentVerse Verified</span>
            </div>
            <div className="mt-4">
              <span className="text-4xl font-bold text-white">
                {formatPrice(agent.price, agent.priceType)}
              </span>
              <span className="text-text-muted text-sm ml-2">
                {agent.priceType === "one-time" ? "one-time license" : `billed ${agent.priceType}`}
              </span>
            </div>

            <div className="mt-6 space-y-3">
              <BuyButton agentId={agent.id} agentName={agent.name} price={agent.price} />
              {agent.demoUrl && (
                <a
                  href={agent.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary w-full justify-center"
                >
                  Live Demo
                </a>
              )}
            </div>

            <div className="mt-6 space-y-2.5 border-t border-border pt-6">
              {[
                "Full source code included",
                "Deployment guide",
                "6 months support",
                "Free updates for 1 year",
                "Money-back guarantee (14 days)",
              ].map((item) => (
                <div key={item} className="flex items-center gap-2 text-sm text-gray-400">
                  <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                  {item}
                </div>
              ))}
            </div>

            <div className="mt-6 pt-6 border-t border-border">
              <p className="text-xs text-text-muted">
                Sold by{" "}
                <span className="text-white">{agent.seller?.name ?? "AgentVerse"}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
