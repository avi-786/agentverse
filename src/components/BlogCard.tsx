import Link from "next/link";
import Image from "next/image";
import { Clock, ArrowRight } from "lucide-react";
import type { Post } from "@/types";
import { formatDate } from "@/lib/utils";

interface BlogCardProps {
  post: Post;
  featured?: boolean;
}

export default function BlogCard({ post, featured = false }: BlogCardProps) {
  if (featured) {
    return (
      <Link href={`/blog/${post.slug}`} className="block group">
        <article className="bg-surface border border-border rounded-xl overflow-hidden card-hover flex flex-col lg:flex-row">
          <div className="relative lg:w-2/5 h-56 lg:h-auto bg-surface-2">
            {post.imageUrl ? (
              <Image
                src={post.imageUrl}
                alt={post.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/10" />
            )}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-surface/50 hidden lg:block" />
          </div>
          <div className="p-8 flex flex-col justify-center flex-1">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-xs font-semibold text-primary-light bg-primary/10 border border-primary/20 px-2.5 py-1 rounded-full">
                {post.category}
              </span>
              <span className="flex items-center gap-1 text-text-muted text-xs">
                <Clock className="w-3.5 h-3.5" /> {post.readTime} min read
              </span>
            </div>
            <h2 className="text-white font-bold text-2xl leading-snug group-hover:text-primary-light transition-colors">
              {post.title}
            </h2>
            <p className="text-text-muted mt-3 text-sm leading-relaxed line-clamp-3">
              {post.excerpt}
            </p>
            <div className="flex items-center justify-between mt-6">
              <div className="flex items-center gap-2.5">
                {post.authorAvatar && (
                  <Image
                    src={post.authorAvatar}
                    alt={post.authorName}
                    width={28}
                    height={28}
                    className="rounded-full"
                  />
                )}
                <div>
                  <p className="text-sm font-medium text-white">{post.authorName}</p>
                  <p className="text-xs text-text-muted">{formatDate(post.publishedAt)}</p>
                </div>
              </div>
              <span className="flex items-center gap-1 text-sm text-primary-light font-medium group-hover:gap-2 transition-all">
                Read <ArrowRight className="w-4 h-4" />
              </span>
            </div>
          </div>
        </article>
      </Link>
    );
  }

  return (
    <Link href={`/blog/${post.slug}`} className="block group">
      <article className="bg-surface border border-border rounded-xl overflow-hidden card-hover h-full flex flex-col">
        <div className="relative h-44 bg-surface-2">
          {post.imageUrl ? (
            <Image
              src={post.imageUrl}
              alt={post.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/10" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent" />
          <div className="absolute top-3 left-3">
            <span className="glass text-xs font-semibold text-primary-light px-2.5 py-1 rounded-full border border-primary/20">
              {post.category}
            </span>
          </div>
        </div>
        <div className="p-5 flex flex-col flex-1">
          <h3 className="text-white font-semibold text-base leading-snug group-hover:text-primary-light transition-colors line-clamp-2">
            {post.title}
          </h3>
          <p className="text-text-muted text-sm mt-2 line-clamp-2 flex-1">{post.excerpt}</p>
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
            <div className="flex items-center gap-2">
              {post.authorAvatar && (
                <Image
                  src={post.authorAvatar}
                  alt={post.authorName}
                  width={24}
                  height={24}
                  className="rounded-full"
                />
              )}
              <span className="text-xs text-text-muted">{post.authorName}</span>
            </div>
            <span className="flex items-center gap-1 text-xs text-text-muted">
              <Clock className="w-3 h-3" /> {post.readTime} min
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}
