import Link from "next/link";
import { ArrowRight, Zap, Bot, BookOpen, TrendingUp, Shield, Code2, Users } from "lucide-react";
import { prisma } from "@/lib/db";
import { parseJsonField } from "@/lib/utils";
import AgentCard from "@/components/AgentCard";
import BlogCard from "@/components/BlogCard";
import NewsletterSection from "@/components/NewsletterSection";
import type { Agent, Post } from "@/types";

export const dynamic = "force-dynamic";

async function getFeaturedAgents(): Promise<Agent[]> {
  const agents = await prisma.agent.findMany({
    where: { featured: true },
    take: 3,
    orderBy: { rating: "desc" },
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

async function getLatestPosts(): Promise<Post[]> {
  const posts = await prisma.post.findMany({
    take: 4,
    orderBy: { publishedAt: "desc" },
  });
  return posts.map((p) => ({
    ...p,
    tags: parseJsonField<string>(p.tags),
  }));
}

const stats = [
  { value: "50+", label: "AI Agents", icon: Bot },
  { value: "10k+", label: "Active Users", icon: Users },
  { value: "99.9%", label: "Uptime SLA", icon: Shield },
  { value: "4.8★", label: "Avg Rating", icon: TrendingUp },
];

const categories = [
  { name: "Customer Service", icon: Users, description: "24/7 support that resolves, not just responds" },
  { name: "Research", icon: BookOpen, description: "Deep intelligence on any topic in minutes" },
  { name: "Development", icon: Code2, description: "Code review, generation, and debugging agents" },
  { name: "Analytics", icon: TrendingUp, description: "Talk to your data in plain English" },
];

export default async function HomePage() {
  const [featuredAgents, latestPosts] = await Promise.all([getFeaturedAgents(), getLatestPosts()]);
  const [featuredPost, ...restPosts] = latestPosts;

  return (
    <div className="relative">
      {/* Hero */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 bg-hero-gradient" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute top-20 right-20 w-64 h-64 bg-accent/5 rounded-full blur-3xl" />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20">
          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 text-primary-light text-sm font-medium px-4 py-2 rounded-full mb-8 animate-fade-in">
            <Zap className="w-4 h-4" fill="currentColor" />
            The AI-First Marketplace is here
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-[1.1] tracking-tight animate-slide-up">
            Production-Ready{" "}
            <span className="gradient-text">AI Agents</span>
            <br />
            Built to Deploy
          </h1>

          <p className="mt-6 text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed animate-fade-in">
            Buy battle-tested AI agents for customer support, research, sales, development, and
            more. Deploy in hours, not months. Plus deep coverage of the AI-first world.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10 animate-slide-up">
            <Link href="/marketplace" className="btn-primary text-base py-3 px-8">
              Explore Agents <ArrowRight className="w-5 h-5" />
            </Link>
            <Link href="/blog" className="btn-secondary text-base py-3 px-8">
              Read the Blog
            </Link>
          </div>

          {/* Social proof */}
          <p className="mt-8 text-text-muted text-sm">
            Trusted by 10,000+ developers and businesses
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-border bg-surface py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map(({ value, label, icon: Icon }) => (
              <div key={label} className="text-center">
                <div className="flex justify-center mb-2">
                  <Icon className="w-5 h-5 text-primary-light" />
                </div>
                <div className="text-3xl font-bold text-white">{value}</div>
                <div className="text-text-muted text-sm mt-1">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Agents */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-primary-light text-sm font-semibold uppercase tracking-widest mb-2">
              Marketplace
            </p>
            <h2 className="text-4xl font-bold text-white">Featured Agents</h2>
            <p className="text-text-muted mt-2">
              Hand-picked agents with proven production deployments
            </p>
          </div>
          <Link
            href="/marketplace"
            className="hidden sm:flex items-center gap-2 text-sm text-primary-light hover:text-white transition-colors font-medium"
          >
            View all <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredAgents.map((agent) => (
            <AgentCard key={agent.id} agent={agent} featured />
          ))}
        </div>

        <div className="text-center mt-8 sm:hidden">
          <Link href="/marketplace" className="btn-secondary">
            View all agents <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 bg-surface border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white">Agents for every workflow</h2>
            <p className="text-text-muted mt-2">Browse by category or use the search</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {categories.map(({ name, icon: Icon, description }) => (
              <Link
                key={name}
                href={`/marketplace?category=${encodeURIComponent(name)}`}
                className="group bg-background border border-border rounded-xl p-6 hover:border-primary/40 hover:bg-primary/5 transition-all"
              >
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <Icon className="w-5 h-5 text-primary-light" />
                </div>
                <h3 className="text-white font-semibold">{name}</h3>
                <p className="text-text-muted text-sm mt-1">{description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Blog */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-primary-light text-sm font-semibold uppercase tracking-widest mb-2">
              Intelligence
            </p>
            <h2 className="text-4xl font-bold text-white">From the Blog</h2>
            <p className="text-text-muted mt-2">
              Guides, research, and tactics for the AI-first world
            </p>
          </div>
          <Link
            href="/blog"
            className="hidden sm:flex items-center gap-2 text-sm text-primary-light hover:text-white transition-colors font-medium"
          >
            All posts <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="space-y-6">
          {featuredPost && <BlogCard post={featuredPost} featured />}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {restPosts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <NewsletterSection />

      {/* CTA Banner */}
      <section className="py-16 bg-surface border-t border-border">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready to deploy your first agent?
          </h2>
          <p className="text-text-muted text-lg mb-8">
            Browse 50+ production-ready agents. Deploy today, see ROI this week.
          </p>
          <Link href="/marketplace" className="btn-primary text-base py-3 px-10">
            Browse Marketplace <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
