"use client";

import Link from "next/link";
import Image from "next/image";
import { Calendar, Clock, ArrowRight, BookOpen, CheckCircle2 } from "lucide-react";
import type { BlogPostMeta } from "@/lib/blog";
import { useLanguage } from "@/lib/LanguageContext";

function formatDate(dateStr: string): string {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  return d.toLocaleDateString("fr-FR", { day: "numeric", month: "short", year: "numeric" });
}

function CategoryBadge({ category }: { category: string }) {
  const colors: Record<string, string> = {
    IA: "bg-violet-500/10 text-violet-400 border-violet-500/20",
    Automation: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    SEO: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  };
  const color = colors[category] || "bg-accent/10 text-accent border-accent/20";
  return (
    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[10px] tracking-[0.15em] uppercase font-medium border ${color}`}>
      {category}
    </span>
  );
}

function ReadTimeBadge({ readTime }: { readTime: string }) {
  return (
    <span className="inline-flex items-center gap-1 text-white/25 text-xs">
      <Clock className="w-3 h-3" />
      {readTime}
    </span>
  );
}

export function BlogCard({ post, index, isFeatured, isRead }: { post: BlogPostMeta; index: number; isFeatured?: boolean; isRead?: boolean }) {
  const { locale } = useLanguage();
  const blogBase = `/${locale}/blog`;
  if (isFeatured) {
    return (
      <Link href={`${blogBase}/${post.slug}`} className="block group">
        <div className="rounded-2xl border border-white/[0.06] overflow-hidden hover:border-accent/20 transition-all duration-500 relative bg-white/[0.02] hover:bg-white/[0.04]">
          <div className="flex flex-col lg:flex-row">
            {/* Cover or placeholder */}
            <div className="relative lg:w-1/2 h-56 lg:h-auto min-h-[280px] overflow-hidden">
              {post.coverImage ? (
                <Image
                  src={post.coverImage}
                  alt={post.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority={isFeatured}
                  className="object-cover group-hover:scale-[1.02] transition-transform duration-700"
                />
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-blue-500/5 to-transparent flex items-center justify-center">
                  <BookOpen className="w-16 h-16 text-white/[0.06]" />
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-dark/80 hidden lg:block" />
              <div className="absolute inset-0 bg-gradient-to-t from-dark/60 to-transparent lg:hidden" />
            </div>
            {/* Content */}
            <div className="relative lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center">
              <div className="flex items-center gap-3 mb-5">
                <CategoryBadge category={post.category} />
                <ReadTimeBadge readTime={post.readTime} />
                {isRead && (
                  <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-[10px] tracking-[0.1em] uppercase font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    <CheckCircle2 className="w-3 h-3" />Lu
                  </span>
                )}
              </div>
              <h3 className="font-display text-2xl lg:text-3xl text-white mb-4 leading-[1.1]">
                {post.title}
              </h3>
              <p className="text-white/45 leading-relaxed mb-6 line-clamp-3 text-sm lg:text-base">
                {post.excerpt}
              </p>
              <div className="flex items-center justify-between mt-auto">
                <span className="flex items-center gap-1.5 text-xs text-white/25">
                  <Calendar className="w-3 h-3" />
                  {formatDate(post.date)}
                </span>
                <span className="flex items-center gap-2 text-sm font-medium text-white/30 group-hover:text-accent transition-colors duration-500">
                  Lire l&apos;article
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-500" />
                </span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link href={`${blogBase}/${post.slug}`} className="block group">
      <article className="h-full rounded-2xl border border-white/[0.06] overflow-hidden hover:border-white/10 transition-all duration-500 relative bg-white/[0.02] hover:bg-white/[0.04] flex flex-col">
        {/* Cover or gradient placeholder */}
        <div className="relative h-44 overflow-hidden flex-shrink-0">
          {post.coverImage ? (
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 25vw"
              className="object-cover group-hover:scale-[1.03] transition-transform duration-700"
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-accent/8 via-blue-500/4 to-transparent flex items-center justify-center">
              <BookOpen className="w-12 h-12 text-white/[0.06]" />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/30 to-transparent" />
          <div className="absolute top-3 left-3 flex items-center gap-2">
            <CategoryBadge category={post.category} />
            {isRead && (
              <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-[10px] tracking-[0.1em] uppercase font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <CheckCircle2 className="w-3 h-3" />Lu
              </span>
            )}
          </div>
        </div>
        {/* Content */}
        <div className="relative p-6 flex flex-col flex-1">
          <h3 className="font-display text-lg text-white mb-2.5 leading-[1.2] line-clamp-2">
            {post.title}
          </h3>
          <p className="text-white/40 leading-relaxed mb-4 line-clamp-2 text-sm flex-1">
            {post.excerpt}
          </p>
          <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/[0.04]">
            <span className="flex items-center gap-1.5 text-xs text-white/25">
              <Calendar className="w-3 h-3" />
              {formatDate(post.date)}
            </span>
            <div className="flex items-center gap-3">
              <ReadTimeBadge readTime={post.readTime} />
              <ArrowRight className="w-4 h-4 text-white/15 group-hover:text-accent group-hover:translate-x-0.5 transition-all duration-500" />
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}