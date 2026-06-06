export interface Agent {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  category: string;
  price: number;
  priceType: "one-time" | "monthly" | "yearly";
  techStack: string[];
  features: string[];
  useCases: string[];
  demoUrl?: string | null;
  imageUrl?: string | null;
  featured: boolean;
  rating: number;
  reviewCount: number;
  createdAt: Date;
  seller?: {
    id: string;
    name: string | null;
  };
}

export interface Post {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  imageUrl?: string | null;
  authorName: string;
  authorAvatar?: string | null;
  readTime: number;
  featured: boolean;
  publishedAt: Date;
}

export const AGENT_CATEGORIES = [
  "All",
  "Customer Service",
  "Research",
  "Development",
  "Sales",
  "Content",
  "Analytics",
] as const;

export const POST_CATEGORIES = [
  "All",
  "Guides",
  "Technical",
  "Business",
  "News",
  "Tutorials",
] as const;

export type AgentCategory = (typeof AGENT_CATEGORIES)[number];
export type PostCategory = (typeof POST_CATEGORIES)[number];
