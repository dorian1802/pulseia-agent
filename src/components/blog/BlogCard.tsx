"use client";

import Link from "next/link";
import Image from "next/image";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import type { BlogPostMeta } from "@/lib/blog";

export function FeaturedCard({ post }: { post: BlogPostMeta }) {
  return (
    <Link href={`/blog/${post.slug}`} className="block group">
      <div className="card-animate rounded-2xl border border-white/[0.06] overflow-hidden hover:border-accent/30 transition-all duration-700 relative">
        <div className="absolute inset-0 bg-accent/[0.03] opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-10" />
        {post.coverImage && (
          <div className="relative h-64 md:h-80 overflow-hidden">
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/60 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8 md:p-10">
              <div className="flex items-center gap-3 mb-4">
                <span className="px-3 py-1 rounded-full text-[10px] tracking-[0.2em] uppercase font-medium bg-accent/20 text-accent border border-accent/20 backdrop-blur-sm">
                  {post.category}
                </span>
              </div>
              <h3 className="font-display text-2xl md:text-4xl text-white mb-3 group-hover:text-accent transition-colors duration-500 leading-[1.1]">
                {post.title}
              </h3>
              <div className="flex items-center gap-5 text-sm text-white/40">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4" /> {post.date}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4" /> {post.readTime}
                </span>
                <span className="ml-auto flex items-center gap-2 text-white/30 group-hover:text-accent transition-colors duration-500">
                  Lire <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-500" />
                </span>
              </div>
            </div>
          </div>
        )}
        {!post.coverImage && (
          <div className="relative p-10 md:p-14 bg-white/[0.02]">
            <div className="h-px w-full bg-gradient-to-r from-accent/60 via-accent/20 to-transparent mb-8" />
            <div className="flex items-center gap-3 mb-6">
              <span className="px-3 py-1 rounded-full text-[10px] tracking-[0.2em] uppercase font-medium bg-accent/10 text-accent border border-accent/20">
                {post.category}
              </span>
            </div>
            <h3 className="font-display text-3xl md:text-4xl text-white mb-4 group-hover:text-accent transition-colors duration-500 leading-[1.1]">
              {post.title}
            </h3>
            <p className="text-block text-base text-white/50 leading-relaxed mb-8 max-w-2xl line-clamp-2">
              {post.excerpt}
            </p>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-5 text-sm text-white/30">
                <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" />{post.date}</span>
                <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" />{post.readTime}</span>
              </div>
              <span className="flex items-center gap-2 text-sm font-medium text-white/30 group-hover:text-accent transition-colors duration-500">
                Lire <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-500" />
              </span>
            </div>
          </div>
        )}
      </div>
    </Link>
  );
}

export function BlogCard({ post, index }: { post: BlogPostMeta; index: number }) {
  const isLarge = index % 3 === 0;

  return (
    <Link href={`/blog/${post.slug}`} className="block group">
      <div
        className="card-animate rounded-2xl border border-white/[0.06] overflow-hidden hover:border-accent/20 transition-all duration-500 relative"
      >
        <div className="absolute inset-0 bg-accent/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
        {post.coverImage && (
          <div className="relative h-40 md:h-48 overflow-hidden">
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/40 to-transparent" />
          </div>
        )}
        <div className={`relative bg-white/[0.02] group-hover:bg-white/[0.04] transition-colors duration-500 ${isLarge ? "p-8" : "p-6"}`}>
          <span className="inline-block px-3 py-1 rounded-full text-[10px] tracking-[0.2em] uppercase font-medium bg-accent/10 text-accent/80 border border-accent/10 mb-3">
            {post.category}
          </span>
          <h3 className={`font-display text-white mb-2 group-hover:text-accent transition-colors duration-500 leading-[1.1] ${isLarge ? "text-xl md:text-2xl" : "text-lg"}`}>
            {post.title}
          </h3>
          <p className="text-white/50 leading-relaxed mb-4 line-clamp-2 text-sm">
            {post.excerpt}
          </p>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 text-xs text-white/30">
              <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" />{post.date}</span>
              <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" />{post.readTime}</span>
            </div>
            <ArrowRight className="w-4 h-4 text-white/20 group-hover:text-accent group-hover:translate-x-1 transition-all duration-500" />
          </div>
        </div>
      </div>
    </Link>
  );
}