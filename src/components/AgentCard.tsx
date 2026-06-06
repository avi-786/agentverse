import Link from "next/link";
import Image from "next/image";
import { Star, ArrowRight, Zap } from "lucide-react";
import type { Agent } from "@/types";
import { formatPrice } from "@/lib/utils";

interface AgentCardProps {
  agent: Agent;
  featured?: boolean;
}

export default function AgentCard({ agent, featured = false }: AgentCardProps) {
  return (
    <Link href={`/marketplace/${agent.slug}`} className="block group">
      <article
        className={`bg-surface border border-border rounded-xl overflow-hidden card-hover h-full flex flex-col ${
          featured ? "ring-1 ring-primary/30" : ""
        }`}
      >
        {/* Image */}
        <div className="relative h-44 bg-surface-2 overflow-hidden">
          {agent.imageUrl ? (
            <Image
              src={agent.imageUrl}
              alt={agent.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <Zap className="w-12 h-12 text-primary/30" />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent" />
          {featured && (
            <div className="absolute top-3 left-3">
              <span className="bg-primary text-white text-xs font-semibold px-2 py-1 rounded-full">
                Featured
              </span>
            </div>
          )}
          <div className="absolute top-3 right-3">
            <span className="glass text-xs font-medium text-gray-300 px-2 py-1 rounded-full border border-border">
              {agent.category}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 flex flex-col flex-1">
          <h3 className="text-white font-semibold text-lg group-hover:text-primary-light transition-colors">
            {agent.name}
          </h3>
          <p className="text-text-muted text-sm mt-1 line-clamp-2 flex-1">{agent.tagline}</p>

          {/* Rating */}
          <div className="flex items-center gap-2 mt-3">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-3.5 h-3.5 ${
                    i < Math.floor(agent.rating)
                      ? "text-yellow-400 fill-yellow-400"
                      : "text-gray-600"
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-gray-400">
              {agent.rating} ({agent.reviewCount})
            </span>
          </div>

          {/* Tech stack preview */}
          <div className="flex flex-wrap gap-1.5 mt-3">
            {agent.techStack.slice(0, 3).map((tech) => (
              <span
                key={tech}
                className="text-xs bg-surface-2 text-gray-400 px-2 py-0.5 rounded border border-border"
              >
                {tech}
              </span>
            ))}
            {agent.techStack.length > 3 && (
              <span className="text-xs text-text-muted">+{agent.techStack.length - 3}</span>
            )}
          </div>

          {/* Price + CTA */}
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
            <div>
              <span className="text-white font-bold text-lg">
                {formatPrice(agent.price, agent.priceType)}
              </span>
            </div>
            <span className="flex items-center gap-1 text-sm text-primary-light font-medium group-hover:gap-2 transition-all">
              View Agent <ArrowRight className="w-4 h-4" />
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}
