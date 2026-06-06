import Link from "next/link";
import { Zap, Target, Users, TrendingUp, ArrowRight, Mail } from "lucide-react";
import NewsletterSection from "@/components/NewsletterSection";

const values = [
  {
    icon: Target,
    title: "Production First",
    description:
      "Every agent on our platform has been deployed in real production environments. We don't sell demos.",
  },
  {
    icon: TrendingUp,
    title: "AI-Native",
    description:
      "We build for the AI-first era. Our agents use the latest foundation models and agentic patterns.",
  },
  {
    icon: Users,
    title: "Builder Community",
    description:
      "AgentVerse is built by AI engineers, for AI engineers. We speak the language of production systems.",
  },
  {
    icon: Zap,
    title: "Ship Fast",
    description:
      "The window to build AI advantage is open right now. We help you move from idea to deployed in days.",
  },
];

const team = [
  {
    name: "Aditya Sharma",
    role: "Co-founder & CEO",
    bio: "Former ML engineer at Google. Built AI systems at scale for 8 years.",
    avatar: "AS",
  },
  {
    name: "Priya Mehta",
    role: "Co-founder & CTO",
    bio: "LLM researcher turned builder. Ex-OpenAI research engineering.",
    avatar: "PM",
  },
  {
    name: "Rahul Verma",
    role: "Head of Product",
    bio: "Product leader focused on developer tools and AI workflows.",
    avatar: "RV",
  },
];

export default function AboutPage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-hero-gradient" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 text-primary-light text-sm font-medium px-4 py-2 rounded-full mb-8">
            <Zap className="w-4 h-4" /> Our Mission
          </div>
          <h1 className="text-5xl font-bold text-white mb-6">
            Making production AI accessible to every builder
          </h1>
          <p className="text-xl text-gray-400 leading-relaxed max-w-2xl mx-auto">
            AgentVerse is the marketplace where AI engineers sell their production agents and where
            businesses find the AI automation they need — without rebuilding everything from
            scratch.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-16 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-surface border border-border rounded-2xl p-10">
          <h2 className="text-3xl font-bold text-white mb-6">The story</h2>
          <div className="space-y-4 text-gray-400 leading-relaxed">
            <p>
              We started AgentVerse after noticing something: every company was building the same
              AI agents from scratch. Customer support bots, research agents, code reviewers — the
              wheel was being reinvented thousands of times across thousands of companies.
            </p>
            <p>
              The infrastructure was the same. The foundation models were the same. The integration
              patterns were the same. The only thing different was the business context.
            </p>
            <p>
              So we built a marketplace. A place where the best AI engineers could package their
              production systems and sell them to businesses that need them. Where you could buy a
              battle-tested customer support agent instead of spending 6 months building one.
            </p>
            <p>
              We also built the blog because we believe an informed community builds better
              agents. The AI landscape moves fast — we help you keep up with what matters.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-surface border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white text-center mb-12">What we stand for</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map(({ icon: Icon, title, description }) => (
              <div key={title} className="bg-background border border-border rounded-xl p-6">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5 text-primary-light" />
                </div>
                <h3 className="text-white font-semibold mb-2">{title}</h3>
                <p className="text-text-muted text-sm leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-white text-center mb-12">The team</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
          {team.map((member) => (
            <div
              key={member.name}
              className="bg-surface border border-border rounded-xl p-6 text-center"
            >
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-primary-light font-bold text-lg">{member.avatar}</span>
              </div>
              <h3 className="text-white font-semibold">{member.name}</h3>
              <p className="text-primary-light text-sm font-medium mt-0.5">{member.role}</p>
              <p className="text-text-muted text-sm mt-3 leading-relaxed">{member.bio}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section className="py-16 bg-surface border-t border-border">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Get in touch</h2>
          <p className="text-text-muted mb-8">
            Want to sell your agent on AgentVerse? Have a partnership idea? Just want to say hi?
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="mailto:hello@agentverse.ai" className="btn-primary justify-center">
              <Mail className="w-5 h-5" /> hello@agentverse.ai
            </a>
            <Link href="/marketplace" className="btn-secondary justify-center">
              Browse Marketplace <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      <NewsletterSection />
    </div>
  );
}
