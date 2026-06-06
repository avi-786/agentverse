import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const seller = await prisma.user.upsert({
    where: { email: "demo@agentverse.ai" },
    update: {},
    create: {
      email: "demo@agentverse.ai",
      name: "AgentVerse Team",
      role: "seller",
    },
  });

  const agents = [
    {
      slug: "customer-support-pro",
      name: "CustomerSupport Pro",
      tagline: "24/7 AI customer support that actually resolves issues",
      description:
        "A production-ready AI agent that handles customer inquiries, resolves tickets, escalates complex issues, and integrates with your existing helpdesk. Built on Claude 4 with RAG over your knowledge base.",
      category: "Customer Service",
      price: 299,
      priceType: "monthly",
      techStack: JSON.stringify(["Claude 4", "LangChain", "Pinecone", "Zendesk API"]),
      features: JSON.stringify([
        "Multi-turn conversation memory",
        "RAG over your docs/FAQ",
        "Auto-escalation rules",
        "Sentiment analysis",
        "Ticket creation & tracking",
        "Analytics dashboard",
      ]),
      useCases: JSON.stringify([
        "SaaS product support",
        "E-commerce returns/queries",
        "Internal IT helpdesk",
      ]),
      imageUrl: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=800",
      sellerId: seller.id,
      featured: true,
      rating: 4.8,
      reviewCount: 124,
    },
    {
      slug: "research-analyst-agent",
      name: "Research Analyst",
      tagline: "Deep research on any topic in minutes",
      description:
        "Autonomous research agent that scours the web, synthesizes information from multiple sources, and produces structured reports. Ideal for market research, competitive intelligence, and due diligence.",
      category: "Research",
      price: 149,
      priceType: "monthly",
      techStack: JSON.stringify(["Claude 4 Opus", "Tavily Search", "LangGraph", "PostgreSQL"]),
      features: JSON.stringify([
        "Multi-source web research",
        "Automated report generation",
        "Citation tracking",
        "Competitor analysis",
        "Trend identification",
        "Export to PDF/Notion",
      ]),
      useCases: JSON.stringify([
        "Market research",
        "Investment due diligence",
        "Academic research",
      ]),
      imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800",
      sellerId: seller.id,
      featured: true,
      rating: 4.9,
      reviewCount: 89,
    },
    {
      slug: "code-review-bot",
      name: "CodeReview AI",
      tagline: "Senior engineer code reviews at 100x speed",
      description:
        "AI agent that performs thorough code reviews — catches bugs, security vulnerabilities, performance issues, and style violations. Integrates with GitHub PRs and posts inline comments.",
      category: "Development",
      price: 79,
      priceType: "monthly",
      techStack: JSON.stringify(["Claude 4 Sonnet", "GitHub API", "AST analysis", "Semgrep"]),
      features: JSON.stringify([
        "Bug & logic error detection",
        "Security vulnerability scanning",
        "Performance recommendations",
        "Style & convention checks",
        "Inline PR comments",
        "Custom rule configuration",
      ]),
      useCases: JSON.stringify([
        "Pull request reviews",
        "Legacy code audit",
        "Security hardening",
      ]),
      imageUrl: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800",
      sellerId: seller.id,
      featured: true,
      rating: 4.7,
      reviewCount: 203,
    },
    {
      slug: "sales-outreach-agent",
      name: "SalesFlow Agent",
      tagline: "Personalized cold outreach at scale",
      description:
        "AI sales development agent that researches prospects, writes hyper-personalized outreach emails, manages follow-up sequences, and books meetings directly to your calendar.",
      category: "Sales",
      price: 399,
      priceType: "monthly",
      techStack: JSON.stringify(["Claude 4", "Apollo.io API", "Gmail API", "Calendly API"]),
      features: JSON.stringify([
        "Prospect research & enrichment",
        "Personalized email generation",
        "Multi-step follow-up sequences",
        "Meeting booking automation",
        "Reply handling & classification",
        "CRM sync (Salesforce/HubSpot)",
      ]),
      useCases: JSON.stringify(["B2B lead generation", "SDR automation", "Partnership outreach"]),
      imageUrl: "https://images.unsplash.com/photo-1552581234-26160f608093?w=800",
      sellerId: seller.id,
      featured: false,
      rating: 4.6,
      reviewCount: 67,
    },
    {
      slug: "content-writer-agent",
      name: "ContentForge AI",
      tagline: "SEO-optimized content at editorial quality",
      description:
        "Full content creation pipeline: keyword research → outline → draft → edit → SEO optimization → publish. Produces long-form articles, social posts, and newsletters in your brand voice.",
      category: "Content",
      price: 199,
      priceType: "monthly",
      techStack: JSON.stringify([
        "Claude 4",
        "Ahrefs API",
        "WordPress API",
        "Brand voice training",
      ]),
      features: JSON.stringify([
        "Keyword research integration",
        "SEO-optimized outlines",
        "Long-form article generation",
        "Brand voice customization",
        "Auto-publish to WordPress/Ghost",
        "Internal linking suggestions",
      ]),
      useCases: JSON.stringify(["Content marketing", "SEO blogs", "Newsletter automation"]),
      imageUrl: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800",
      sellerId: seller.id,
      featured: false,
      rating: 4.5,
      reviewCount: 156,
    },
    {
      slug: "data-analyst-agent",
      name: "DataLens Agent",
      tagline: "Talk to your data in plain English",
      description:
        "Connect your databases, spreadsheets, or CSV files. Ask questions in natural language and get instant analysis, charts, and actionable insights. No SQL required.",
      category: "Analytics",
      price: 249,
      priceType: "monthly",
      techStack: JSON.stringify([
        "Claude 4 Opus",
        "DuckDB",
        "Recharts",
        "PostgreSQL",
        "BigQuery",
      ]),
      features: JSON.stringify([
        "Natural language SQL generation",
        "Multi-database connections",
        "Automated chart generation",
        "Anomaly detection",
        "Scheduled reports",
        "Slack/email delivery",
      ]),
      useCases: JSON.stringify([
        "Business intelligence",
        "Marketing analytics",
        "Financial reporting",
      ]),
      imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800",
      sellerId: seller.id,
      featured: false,
      rating: 4.8,
      reviewCount: 91,
    },
  ];

  for (const agent of agents) {
    await prisma.agent.upsert({
      where: { slug: agent.slug },
      update: agent,
      create: agent,
    });
  }

  const posts = [
    {
      slug: "agentic-ai-2025-complete-guide",
      title: "Agentic AI in 2025: The Complete Guide to AI Agents That Actually Work",
      excerpt:
        "AI agents have moved from research papers to production systems. Here's everything you need to know about building, buying, and deploying autonomous AI agents in 2025.",
      content: `# Agentic AI in 2025: The Complete Guide

The shift from AI assistants to AI agents is the most significant development in enterprise software since cloud computing. Where chatbots answer questions, agents **act** — browsing the web, writing code, managing files, calling APIs, and completing multi-step workflows without human intervention.

## What Makes an AI Agent Different?

A traditional AI model takes input and produces output. Done. An AI agent:

1. **Plans** — breaks a goal into steps
2. **Uses tools** — calls APIs, writes/reads files, runs code
3. **Iterates** — evaluates results and adjusts
4. **Persists** — maintains memory across sessions

The key ingredient is the **ReAct loop** (Reason + Act): the model thinks through what to do, takes an action, observes the result, and repeats until the task is complete.

## The Agent Stack in 2025

Modern production agents are built on:

**Foundation Models**: Claude 4 Opus/Sonnet, GPT-4o, Gemini 2.0 Pro. The choice matters — Claude 4 Opus leads on complex reasoning, Sonnet 4.6 hits the best speed/quality tradeoff for agentic tasks.

**Orchestration Frameworks**: LangGraph, CrewAI, AutoGen. LangGraph wins for production because it gives you explicit state machines — critical when you need to debug why your agent looped 47 times.

**Tool Calling**: The mechanism by which models invoke external functions. Every major model now supports parallel tool calling — agents can make multiple API calls simultaneously.

**Memory Systems**: In-context (conversation history), external (vector databases like Pinecone/Weaviate), and episodic (structured task logs).

## Where Agents Are Actually Working Today

### Customer Support
The most mature use case. Agents that can look up order status, process returns, answer questions about products, and escalate complex cases — handling 60-80% of tier-1 tickets without human intervention.

### Software Development
Code review bots, PR description generators, test writers. GitHub Copilot Workspace is the most visible example, but custom agents doing specialized tasks (security review, performance analysis) outperform generic tools.

### Research and Intelligence
Agents that autonomously search, read, synthesize, and report. A 2-hour analyst task becomes a 10-minute agent run.

### Sales Development
Prospect research, personalized outreach, follow-up sequencing. The best SDR agents research a prospect's recent activity and write emails that reference specific context — 3-5x better response rates than templates.

## The Biggest Mistake in Agent Development

**Trying to build a fully autonomous agent before understanding the failure modes.**

Agents fail in predictable ways:
- **Hallucinated tool calls** — calling APIs that don't exist or with wrong parameters
- **Infinite loops** — getting stuck retrying failed actions
- **Context blowout** — losing the original goal in a long tool-call chain
- **Scope creep** — doing more than asked because it seemed helpful

The fix: start with highly constrained agents (3-5 tools max), add human-in-the-loop checkpoints for irreversible actions, and log everything. Expand scope only after each constraint is proven stable.

## Building vs Buying in 2025

Custom agents make sense when:
- Your workflow is unique to your business
- You have proprietary data that must stay internal
- You need deep integration with internal systems
- You have engineering resources

Buy/subscribe when:
- The use case is generic (customer support, research, content)
- Speed to value matters more than customization
- You want someone else to handle reliability and model updates

The hybrid approach is increasingly common: buy a base agent, customize it with your data and workflows.

## What's Coming: 2026 Predictions

1. **Multi-agent coordination** becomes standard. Agents managing agents, each specialized, supervised by a planner model.
2. **Agent marketplaces** like app stores for capabilities — buy a "research module" and plug it into your agent stack.
3. **Persistent agent identities** — agents that remember your preferences and build institutional knowledge over time.
4. **Regulatory frameworks** — expect EU AI Act compliance requirements for agents making consequential decisions.

The companies building agent infrastructure today will have significant advantages. The window to become the "Salesforce of agents" is open right now.`,
      category: "Guides",
      tags: JSON.stringify(["AI Agents", "LLM", "Automation", "Guide"]),
      imageUrl: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=1200",
      authorName: "Aditya Sharma",
      authorAvatar: "https://avatars.githubusercontent.com/u/1?v=4",
      readTime: 12,
      featured: true,
    },
    {
      slug: "rag-vs-fine-tuning-2025",
      title: "RAG vs Fine-Tuning: When to Use Each in 2025",
      excerpt:
        "The RAG vs fine-tuning debate is often framed as binary. It isn't. Here's a practical decision framework based on 50+ production deployments.",
      content: `# RAG vs Fine-Tuning: A Practical Decision Framework

The question "should I use RAG or fine-tune?" misses the point. They solve different problems. Here's when to use each.

## RAG (Retrieval-Augmented Generation)

**Use RAG when:**
- Your knowledge changes frequently (docs, news, internal wikis)
- You need citations and source attribution
- Data is proprietary and can't leave your infrastructure
- You want to update knowledge without retraining
- Budget is constrained

**How it works:** At inference time, retrieve relevant chunks from a vector database and inject them into the prompt. The model reasons over retrieved context.

**Production considerations:**
- Embedding model choice matters more than most teams realize. text-embedding-3-large outperforms smaller models by 15-20% on retrieval tasks
- Chunk size is a dial: 256 tokens for precise retrieval, 1024 for better context coherence
- Reranking (Cohere Rerank, cross-encoders) adds 10-30% recall improvement with minimal latency cost

## Fine-Tuning

**Use fine-tuning when:**
- You need specific output formats the base model doesn't follow reliably
- You have a consistent, stable task (not changing data — changing *behavior*)
- You want to teach the model a unique style or voice
- Reducing prompt length and inference cost matters

**What fine-tuning cannot do:**
- Inject new factual knowledge reliably (models hallucinate fine-tuned facts under pressure)
- Replace RAG for dynamic information

## The Real Answer: Both

Production systems that perform best use fine-tuning for behavior + RAG for knowledge:
- Fine-tune on 1000 examples of "how you want the model to respond"
- RAG for "what the model knows about"

Cost breakdown for a typical customer support agent (10k queries/day):
- Base model only: $180/mo
- + RAG: $210/mo (+$30 for embeddings + vector DB)
- + Fine-tuned model: $165/mo (smaller fine-tuned model is cheaper per token)
- Fine-tuned + RAG: $195/mo — **best performance at reasonable cost**

The decision is mostly about your data's nature and rate of change, not a philosophical commitment to one approach.`,
      category: "Technical",
      tags: JSON.stringify(["RAG", "Fine-tuning", "LLM", "Vector DB"]),
      imageUrl: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=1200",
      authorName: "Priya Mehta",
      authorAvatar: "https://avatars.githubusercontent.com/u/2?v=4",
      readTime: 8,
      featured: true,
    },
    {
      slug: "monetizing-ai-agents-business-models",
      title: "5 Business Models for Selling AI Agents in 2025",
      excerpt:
        "From usage-based pricing to white-label licensing, the economics of selling AI agents are still being figured out. Here are the models that are working.",
      content: `# 5 Business Models for Selling AI Agents

The AI agent market is projected to hit $47B by 2030. The question is how to capture it. Here are five models with real-world examples.

## 1. SaaS Subscription (Most Common)
Monthly/annual flat fee per seat or per deployment. Works when: value is predictable and usage is relatively stable.

Examples: Cursor ($20/mo), GitHub Copilot ($19/mo)

**Margin profile:** 70-85% gross margin at scale. Churns if ROI isn't clear within 90 days.

## 2. Usage-Based / Consumption
Charge per task, per API call, or per output unit. Works when: usage varies widely across customers.

Examples: Anthropic API (per token), Make.com (per operation)

**Margin profile:** 60-75% gross. Predictable for you only when customers are predictable.

## 3. Outcome-Based
Charge only when the agent achieves the desired result. Works when: outcome is measurable (ticket resolved, meeting booked, lead qualified).

Examples: Klarna's AI (charges per resolved ticket vs cost of human agent)

**Margin profile:** Highest potential (charge a % of value delivered), highest risk (you absorb failed runs).

## 4. White-Label / OEM
Sell the agent as infrastructure that other companies rebrand. Works when: you want volume without customer acquisition costs.

**Margin profile:** Lower per-unit margin, but near-zero customer support overhead.

## 5. Marketplace + Commission
Build a platform where others list agents; take 20-30% commission. Works when: you have distribution but not depth in every vertical.

**Margin profile:** Platform margin of 20-30% on GMV, scales with curation.

## Which to Choose

Early stage: Start with flat-rate SaaS. Simplest billing, easiest sales conversation.

Once you have 50+ customers: Move to hybrid (base subscription + usage overage). Captures value from power users while maintaining predictability.

At scale: Outcome-based for your highest-value customers. White-label for distribution.

The market hasn't standardized yet — which means pricing power is available for agents that can clearly articulate and prove their ROI.`,
      category: "Business",
      tags: JSON.stringify(["Business Models", "Monetization", "AI Agents", "SaaS"]),
      imageUrl: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=1200",
      authorName: "Rahul Verma",
      authorAvatar: "https://avatars.githubusercontent.com/u/3?v=4",
      readTime: 7,
      featured: false,
    },
    {
      slug: "claude-api-production-guide",
      title: "Claude API in Production: Lessons from 6 Months of Scaling",
      excerpt:
        "Prompt caching, parallel tool calls, extended thinking, streaming — what actually matters for production Claude API deployments.",
      content: `# Claude API in Production

Six months, 200M tokens, 12 production agents. Here's what we learned.

## Prompt Caching Is Non-Negotiable

If your system prompt is >1000 tokens (most are), enable prompt caching. Results from our deployments:
- 60-80% cost reduction on repeat calls
- 3-5x latency improvement on cached portions

Implementation is one line — add \`"cache_control": {"type": "ephemeral"}\` to any content block. The cache lasts 5 minutes and refreshes on use.

## Extended Thinking Changes the Reliability Curve

For complex reasoning tasks (multi-step planning, code debugging, analysis), extended thinking (Claude 4 Opus) reduces error rates by 30-40%. Budget 2000-8000 thinking tokens depending on task complexity.

Not worth it for simple extraction, classification, or generation tasks. The cost/latency overhead doesn't pay off.

## Streaming in Production

Always stream for user-facing applications. Users tolerate 30+ seconds if they see progress; they abandon at 5 seconds of silence.

For agent pipelines where the output feeds another step: don't stream. Accumulate the full response, reduces complexity significantly.

## Rate Limits and Retry Logic

Tier 2+ limits are generous but you will hit them with parallel agents. Implement exponential backoff with jitter starting at 1 second. After 3 retries, fail fast and surface to your queue.

Never retry in a tight loop — you'll get banned faster than you think.

## Model Selection by Task

| Task | Model | Why |
|------|-------|-----|
| Complex reasoning | Opus 4 | Best accuracy, worth the cost |
| General agent tasks | Sonnet 4.6 | Best speed/quality ratio |
| High-volume extraction | Haiku 4.5 | 10x cheaper, good enough |
| Code generation | Sonnet 4.6 | Opus not materially better |

## What We'd Do Differently

1. Build observability first. LangSmith or Langfuse from day 0 — debugging agents without traces is miserable.
2. Separate the agent logic from the model calls. Testability and model switching get very hard otherwise.
3. Budget tokens explicitly per agent run. Unbounded agents can burn through monthly quotas in hours.`,
      category: "Technical",
      tags: JSON.stringify(["Claude API", "Anthropic", "Production", "LLM"]),
      imageUrl: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=1200",
      authorName: "Aditya Sharma",
      authorAvatar: "https://avatars.githubusercontent.com/u/1?v=4",
      readTime: 9,
      featured: false,
    },
  ];

  for (const post of posts) {
    await prisma.post.upsert({
      where: { slug: post.slug },
      update: post,
      create: post,
    });
  }

  console.log("Seed complete.");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
