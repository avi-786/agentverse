import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/db";
import { parseJsonField, formatDate } from "@/lib/utils";
import type { Post } from "@/types";
import { ArrowLeft, Clock, Calendar } from "lucide-react";
import NewsletterSection from "@/components/NewsletterSection";

export const dynamic = "force-dynamic";

async function getPost(slug: string): Promise<Post | null> {
  const post = await prisma.post.findUnique({ where: { slug } });
  if (!post) return null;
  return { ...post, tags: parseJsonField<string>(post.tags) };
}

function renderContent(content: string) {
  const lines = content.split("\n");
  const html: string[] = [];

  for (const line of lines) {
    if (line.startsWith("# ")) {
      html.push(`<h1>${line.slice(2)}</h1>`);
    } else if (line.startsWith("## ")) {
      html.push(`<h2>${line.slice(3)}</h2>`);
    } else if (line.startsWith("### ")) {
      html.push(`<h3>${line.slice(4)}</h3>`);
    } else if (line.startsWith("#### ")) {
      html.push(`<h4>${line.slice(5)}</h4>`);
    } else if (line.startsWith("- ")) {
      html.push(`<li>${processInline(line.slice(2))}</li>`);
    } else if (/^\d+\./.test(line)) {
      html.push(`<li>${processInline(line.replace(/^\d+\.\s/, ""))}</li>`);
    } else if (line.startsWith("> ")) {
      html.push(`<blockquote>${processInline(line.slice(2))}</blockquote>`);
    } else if (line.startsWith("```")) {
      html.push(line === "```" ? "</pre>" : `<pre><code>`);
    } else if (line.trim() === "") {
      html.push("<br/>");
    } else if (line.startsWith("|")) {
      html.push(`<tr>${line.split("|").filter(Boolean).map(cell => `<td>${cell.trim()}</td>`).join("")}</tr>`);
    } else {
      html.push(`<p>${processInline(line)}</p>`);
    }
  }

  return html.join("\n");
}

function processInline(text: string): string {
  return text
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    .replace(/`(.+?)`/g, "<code>$1</code>")
    .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" class="text-primary-light hover:underline">$1</a>');
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug);
  if (!post) notFound();

  return (
    <div>
      {/* Hero */}
      <div className="relative">
        {post.imageUrl && (
          <div className="relative h-80 w-full overflow-hidden">
            <Image src={post.imageUrl} alt={post.title} fill className="object-cover" priority />
            <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-background/60 to-background" />
          </div>
        )}
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-text-muted hover:text-white text-sm mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Blog
        </Link>

        {/* Meta */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <span className="text-xs font-semibold text-primary-light bg-primary/10 border border-primary/20 px-2.5 py-1 rounded-full">
            {post.category}
          </span>
          <span className="flex items-center gap-1 text-text-muted text-sm">
            <Clock className="w-3.5 h-3.5" /> {post.readTime} min read
          </span>
          <span className="flex items-center gap-1 text-text-muted text-sm">
            <Calendar className="w-3.5 h-3.5" /> {formatDate(post.publishedAt)}
          </span>
        </div>

        <h1 className="text-4xl font-bold text-white leading-snug mb-6">{post.title}</h1>

        {/* Author */}
        <div className="flex items-center gap-3 pb-8 mb-8 border-b border-border">
          {post.authorAvatar && (
            <Image
              src={post.authorAvatar}
              alt={post.authorName}
              width={40}
              height={40}
              className="rounded-full"
            />
          )}
          <div>
            <p className="font-medium text-white text-sm">{post.authorName}</p>
            <p className="text-xs text-text-muted">AgentVerse Editorial</p>
          </div>
        </div>

        {/* Content */}
        <div
          className="prose-dark"
          dangerouslySetInnerHTML={{ __html: renderContent(post.content) }}
        />

        {/* Tags */}
        <div className="mt-12 pt-8 border-t border-border">
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs bg-surface border border-border text-text-muted px-3 py-1 rounded-full"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      <NewsletterSection />
    </div>
  );
}
