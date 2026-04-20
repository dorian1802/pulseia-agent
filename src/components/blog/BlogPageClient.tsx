"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import { useLanguage } from "@/lib/LanguageContext";
import { useReadArticles, consumeLastVisitedSlug } from "@/lib/useReadArticles";
import { BlogShell } from "./BlogShell";
import { BlogCard } from "./BlogCard";
import type { BlogPostMeta } from "@/lib/blog";
import { Search, Filter, X, TrendingUp, Sparkles, Cpu } from "lucide-react";

const CATEGORIES = [
  { key: "all", label: "Tous", icon: Sparkles },
  { key: "IA", label: "IA", icon: Cpu },
  { key: "Automation", label: "Automation", icon: TrendingUp },
  { key: "SEO", label: "SEO", icon: TrendingUp },
] as const;

function formatDate(dateStr: string): string {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  return d.toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });
}

function BlogList({ postsByLocale }: { postsByLocale: Record<string, BlogPostMeta[]> }) {
  const { locale, t } = useLanguage();
  const { readSlugs, mounted } = useReadArticles();
  const posts = postsByLocale[locale] || postsByLocale["fr"];
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const lastSlugRef = useRef<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mounted) return;
    const slug = consumeLastVisitedSlug();
    if (slug) {
      lastSlugRef.current = slug;
      requestAnimationFrame(() => {
        const el = document.getElementById(`blog-card-${slug}`);
        if (el) el.scrollIntoView({ block: "center", behavior: "smooth" });
      });
    }
  }, [mounted]);

  const filteredPosts = useMemo(() => {
    let result = posts;
    if (activeCategory !== "all") {
      result = result.filter((p) => p.category === activeCategory);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.excerpt.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      );
    }
    if (mounted && readSlugs.size > 0) {
      const read = result.filter((p) => readSlugs.has(p.slug));
      const unread = result.filter((p) => !readSlugs.has(p.slug));
      result = [...read, ...unread];
    }
    return result;
  }, [posts, activeCategory, searchQuery, readSlugs, mounted]);

  const { featured, rest } = useMemo(() => {
    const unread = filteredPosts.filter((p) => !mounted || !readSlugs.has(p.slug));
    const read = filteredPosts.filter((p) => mounted && readSlugs.has(p.slug));
    const sorted = [...unread, ...read];
    return { featured: sorted[0], rest: sorted.slice(1) };
  }, [filteredPosts, mounted, readSlugs]);

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: posts.length };
    posts.forEach((p) => {
      counts[p.category] = (counts[p.category] || 0) + 1;
    });
    return counts;
  }, [posts]);

  return (
    <>
      {/* Blog Hero */}
      <section className="relative z-10 pt-32 pb-16">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl">
            <p className="text-xs tracking-[0.4em] uppercase text-accent font-medium mb-6 flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              {t.blog.tag}
            </p>
            <h2 className="font-display text-5xl md:text-7xl font-light text-white mb-6 leading-[0.95]">
              {t.blog.title1}{" "}
              <span className="font-bold bg-gradient-to-r from-accent to-blue-400 bg-clip-text text-transparent italic">
                {t.blog.title2}
              </span>
            </h2>
            <p className="text-white/50 text-lg md:text-xl leading-relaxed max-w-2xl">
              Guides, comparatifs et tutoriels pour automatiser votre PME avec l&apos;intelligence artificielle.
            </p>
          </div>
        </div>
      </section>

      {/* Search & Filters */}
      <section className="relative z-10 pb-8 sticky top-0 z-30 bg-dark/80 backdrop-blur-xl border-b border-white/[0.04]">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4 py-4">
            {/* Search */}
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
              <input
                type="text"
                placeholder="Rechercher un article..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.06] text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-accent/40 focus:bg-white/[0.06] transition-all duration-300"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Category Filters */}
            <div className="flex items-center gap-2 flex-wrap">
              <Filter className="w-4 h-4 text-white/20 hidden md:block" />
              {CATEGORIES.map(({ key, label, icon: Icon }) => {
                const count = categoryCounts[key] || 0;
                if (key !== "all" && count === 0) return null;
                const isActive = activeCategory === key;
                return (
                  <button
                    key={key}
                    onClick={() => setActiveCategory(key)}
                    className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-medium tracking-wide uppercase transition-all duration-300 ${
                      isActive
                        ? "bg-accent/20 text-accent border border-accent/30"
                        : "bg-white/[0.03] text-white/40 border border-white/[0.06] hover:text-white/60 hover:border-white/10"
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    {label}
                    <span className={`ml-1 text-[10px] ${isActive ? "text-accent/60" : "text-white/20"}`}>
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Results count */}
      {(searchQuery || activeCategory !== "all") && (
        <section className="relative z-10 py-4">
          <div className="container mx-auto px-6">
            <p className="text-white/30 text-sm">
              {filteredPosts.length} article{filteredPosts.length !== 1 ? "s" : ""} trouv&eacute;{filteredPosts.length !== 1 ? "s" : ""}
              {activeCategory !== "all" && (
                <> dans <span className="text-accent">{activeCategory}</span></>
              )}
              {searchQuery && (
                <> pour &laquo;&nbsp;<span className="text-white/50">{searchQuery}</span>&nbsp;&raquo;</>
              )}
            </p>
          </div>
        </section>
      )}

      {/* Featured Post */}
      {featured && (
        <section className="relative z-10 pb-8">
          <div className="container mx-auto px-6">
            <div id={`blog-card-${featured.slug}`}>
              <BlogCard post={featured} index={-1} isFeatured isRead={mounted && readSlugs.has(featured.slug)} />
            </div>
          </div>
        </section>
      )}

      {/* Post Grid */}
      {rest.length > 0 && (
        <section className="relative z-10 pb-20">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {rest.map((post, i) => (
                <div key={post.slug} id={`blog-card-${post.slug}`}>
                  <BlogCard post={post} index={i} isRead={mounted && readSlugs.has(post.slug)} />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* No results */}
      {filteredPosts.length === 0 && (
        <section className="min-h-[30vh] relative z-10 flex items-center py-20">
          <div className="container mx-auto px-6 text-center">
            <Search className="w-12 h-12 text-white/10 mx-auto mb-4" />
            <p className="text-white/30 text-lg mb-2">Aucun article trouv&eacute;</p>
            <button
              onClick={() => {
                setActiveCategory("all");
                setSearchQuery("");
              }}
              className="text-accent text-sm hover:text-accent-light transition-colors"
            >
              R&eacute;initialiser les filtres
            </button>
          </div>
        </section>
      )}

      {/* Newsletter CTA */}
      <section className="relative z-10 py-16 border-t border-white/[0.04]">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="font-display text-2xl md:text-3xl text-white mb-3">
              Restez inform&eacute; des nouveaut&eacute;s IA
            </h3>
            <p className="text-white/40 text-sm mb-6">
              Recevez nos derniers guides et comparatifs directement dans votre bo&icirc;te mail.
            </p>
            <div className="flex gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="votre@email.com"
                className="flex-1 px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.06] text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-accent/40 transition-all duration-300"
              />
              <button className="px-6 py-3 rounded-xl bg-accent text-white text-sm font-medium hover:bg-accent-dark transition-colors duration-300 whitespace-nowrap">
                S&apos;abonner
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export function BlogPageClient({ postsByLocale }: { postsByLocale: Record<string, BlogPostMeta[]> }) {
  return (
    <BlogShell>
      <BlogList postsByLocale={postsByLocale} />
    </BlogShell>
  );
}