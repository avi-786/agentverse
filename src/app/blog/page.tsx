import { prisma } from "@/lib/db";
import { parseJsonField } from "@/lib/utils";
import BlogCard from "@/components/BlogCard";
import type { Post, PostCategory } from "@/types";
import { POST_CATEGORIES } from "@/types";
import Link from "next/link";
import NewsletterSection from "@/components/NewsletterSection";

async function getPosts(category?: string): Promise<Post[]> {
  const posts = await prisma.post.findMany({
    where: category && category !== "All" ? { category } : undefined,
    orderBy: [{ featured: "desc" }, { publishedAt: "desc" }],
  });
  return posts.map((p) => ({ ...p, tags: parseJsonField<string>(p.tags) }));
}

export default async function BlogPage({
  searchParams,
}: {
  searchParams: { category?: string };
}) {
  const activeCategory = (searchParams.category as PostCategory) ?? "All";
  const posts = await getPosts(activeCategory === "All" ? undefined : activeCategory);
  const [featuredPost, ...restPosts] = posts;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold text-white mb-4">AI Intelligence Blog</h1>
        <p className="text-text-muted text-lg max-w-2xl mx-auto">
          Guides, research, and tactics for navigating the AI-first world.
        </p>
      </div>

      {/* Category filter */}
      <div className="flex flex-wrap gap-2 justify-center mb-12">
        {POST_CATEGORIES.map((cat) => (
          <Link
            key={cat}
            href={`/blog${cat !== "All" ? `?category=${encodeURIComponent(cat)}` : ""}`}
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

      {/* Featured post */}
      {featuredPost && (
        <div className="mb-10">
          <BlogCard post={featuredPost} featured />
        </div>
      )}

      {/* Post grid */}
      {restPosts.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {restPosts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      )}

      {posts.length === 0 && (
        <div className="text-center py-20 text-text-muted">
          No posts in this category yet.
        </div>
      )}

      <NewsletterSection />
    </div>
  );
}
