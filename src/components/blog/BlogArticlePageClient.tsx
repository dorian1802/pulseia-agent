"use client";

import { useLanguage } from "@/lib/LanguageContext";
import { useReadArticles } from "@/lib/useReadArticles";
import { BlogShell } from "./BlogShell";
import { BlogArticle } from "./BlogArticle";
import { ArrowLeft, Calendar, Clock, User, Sparkles, CheckCircle2, Mail, MapPin } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import type { BlogPost } from "@/lib/blog";

function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const el = document.documentElement;
      const scrollTop = window.scrollY;
      const scrollHeight = el.scrollHeight - el.clientHeight;
      setProgress(scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0);
    };
    window.addEventListener("scroll", update, { passive: true });
    update();
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-[2px] bg-transparent">
      <div
        className="h-full bg-gradient-to-r from-accent to-blue-400 transition-[width] duration-150 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}

function AuditForm() {
  const { t } = useLanguage();
  const [sent, setSent] = useState(false);

  return (
    <div className="rounded-2xl overflow-hidden border border-white/[0.08] bg-white/[0.03] backdrop-blur-2xl shadow-[0_0_60px_-15px_rgba(124,58,237,0.15)] relative">
      {/* Glow line top */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-accent/60 to-transparent" />
      {/* Subtle accent glow behind */}
      <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[200px] h-[200px] bg-accent/10 rounded-full blur-[80px] pointer-events-none" />

      <div className="p-6 relative">
        {/* Header */}
        <div className="flex items-center gap-3 mb-5">
          <div className="w-9 h-9 rounded-xl bg-accent/15 flex items-center justify-center shadow-[0_0_20px_-5px_rgba(124,58,237,0.3)]">
            <Sparkles className="w-4 h-4 text-accent" />
          </div>
          <h3 className="font-display text-lg text-white leading-snug">{t.audit.formTitle}</h3>
        </div>

        {/* Benefits */}
        <ul className="space-y-2.5 mb-6">
          {t.audit.benefits.slice(0, 3).map((b) => (
            <li key={b} className="flex items-start gap-2 text-white/50 text-xs leading-relaxed">
              <CheckCircle2 className="w-3.5 h-3.5 text-accent flex-shrink-0 mt-0.5" />
              {b}
            </li>
          ))}
        </ul>

        {/* Divider */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-white/[0.06] to-transparent mb-5" />

        {sent ? (
          <div className="text-center py-4 text-sm text-accent font-medium">{t.cta.formSent}</div>
        ) : (
          <form
            action={`https://formsubmit.co/${t.cta.email}`}
            method="POST"
            onSubmit={() => setSent(true)}
            className="space-y-3"
          >
            <input type="hidden" name="_subject" value="Demande d'audit IA gratuit (blog)" />
            <input type="hidden" name="_captcha" value="false" />
            <div className="space-y-1">
              <label htmlFor="audit-name" className="text-[10px] tracking-[0.1em] uppercase text-white/30 font-medium">{t.cta.formName}</label>
              <input
                id="audit-name"
                type="text"
                name="name"
                required
                placeholder={t.cta.formName}
                className="w-full px-3 py-2.5 rounded-xl border border-white/[0.08] bg-white/[0.04] text-white placeholder-white/20 focus:border-accent/40 focus:bg-white/[0.06] focus:ring-1 focus:ring-accent/30 outline-none transition-all duration-300 text-sm"
              />
            </div>
            <div className="space-y-1">
              <label htmlFor="audit-email" className="text-[10px] tracking-[0.1em] uppercase text-white/30 font-medium">{t.cta.formEmail}</label>
              <input
                id="audit-email"
                type="email"
                name="email"
                required
                placeholder={t.cta.formEmail}
                className="w-full px-3 py-2.5 rounded-xl border border-white/[0.08] bg-white/[0.04] text-white placeholder-white/20 focus:border-accent/40 focus:bg-white/[0.06] focus:ring-1 focus:ring-accent/30 outline-none transition-all duration-300 text-sm"
              />
            </div>
            <div className="space-y-1">
              <label htmlFor="audit-website" className="text-[10px] tracking-[0.1em] uppercase text-white/30 font-medium">{t.audit.website}</label>
              <input
                id="audit-website"
                type="text"
                name="website"
                placeholder={t.audit.website}
                className="w-full px-3 py-2.5 rounded-xl border border-white/[0.08] bg-white/[0.04] text-white placeholder-white/20 focus:border-accent/40 focus:bg-white/[0.06] focus:ring-1 focus:ring-accent/30 outline-none transition-all duration-300 text-sm"
              />
            </div>
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 w-full bg-accent hover:bg-accent-dark text-white rounded-xl px-6 py-3 text-xs font-semibold tracking-wider uppercase transition-all duration-300 shadow-[0_0_30px_-10px_rgba(124,58,237,0.4)] hover:shadow-[0_0_40px_-8px_rgba(124,58,237,0.5)] mt-1"
            >
              {t.audit.submit} <ArrowLeft className="w-3.5 h-3.5 rotate-180" />
            </button>
          </form>
        )}

        {/* Contact info */}
        <div className="mt-5 pt-4 border-t border-white/[0.06] flex items-center justify-between text-white/30 text-[10px]">
          <a href={`mailto:${t.cta.email}`} className="flex items-center gap-1.5 hover:text-accent transition-colors">
            <Mail className="w-3 h-3" />
            {t.cta.email}
          </a>
          <span className="flex items-center gap-1.5">
            <MapPin className="w-3 h-3" />
            {t.cta.location}
          </span>
        </div>
      </div>
    </div>
  );
}

function ArticleContent({ postsByLocale, allPostsByLocale }: { postsByLocale: Record<string, BlogPost>; allPostsByLocale: Record<string, { slug: string; title: string; excerpt: string; category: string }[]> }) {
  const { locale, t } = useLanguage();
  const { markAsRead } = useReadArticles();
  const post = postsByLocale[locale] || postsByLocale["fr"];

  useEffect(() => {
    markAsRead(post.slug);
    const lenis = (window as unknown as { __lenis?: { scrollTo: (target: number, options?: { immediate: boolean }) => void } }).__lenis;
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
  }, [post.slug, markAsRead]);
  const relatedPosts = (allPostsByLocale[locale] || allPostsByLocale["fr"])
    .filter((p) => p.slug !== post.slug)
    .slice(0, 3);

  const titleWords = post.title.split(" ");
  const mid = Math.ceil(titleWords.length / 2);
  const titleFirst = titleWords.slice(0, mid).join(" ");
  const titleSecond = titleWords.slice(mid).join(" ");

  return (
    <>
      <ReadingProgress />

      {/* Article Hero */}
      <section className="relative z-10 pt-40 pb-16 overflow-hidden">
        {post.coverImage && (
          <div className="absolute inset-0 z-0">
            <img
              src={post.coverImage}
              alt=""
              className="w-full h-full object-cover opacity-20 blur-sm scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-dark/60 via-dark/80 to-dark" />
          </div>
        )}
        <div className="relative z-10 pointer-events-auto container mx-auto px-6 max-w-3xl text-center">
          <Link
            href={`/${locale}/blog`}
            className="tag-animate inline-flex items-center gap-2 text-sm text-white/40 hover:text-accent transition-colors mb-12"
          >
            <ArrowLeft className="w-4 h-4" />
            {t.blog.backToBlog}
          </Link>

          <span className="tag-animate inline-block px-3 py-1 rounded-full text-[10px] tracking-[0.2em] uppercase font-medium bg-accent/10 text-accent border border-accent/10 mb-6">
            {post.category}
          </span>

          <h1 className="font-display text-4xl md:text-6xl text-white mt-4 mb-8 leading-[0.95]">
            {titleFirst}{" "}
            <span className="bg-gradient-to-r from-accent to-blue-400 bg-clip-text text-transparent italic">
              {titleSecond}
            </span>
          </h1>

          <div className="text-block flex items-center justify-center gap-6 text-sm text-white/30">
            <span className="flex items-center gap-2">
              <User className="w-4 h-4" /> {post.author}
            </span>
            <span className="flex items-center gap-2">
              <Calendar className="w-4 h-4" /> {new Date(post.date).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}
            </span>
            <span className="flex items-center gap-2">
              <Clock className="w-4 h-4" /> {post.readTime}
            </span>
          </div>
        </div>
      </section>

      {/* Article — centered, with fixed form on the right */}
      <section className="relative z-10 pb-32">
        <div className="pointer-events-auto container mx-auto px-6">
          <div className="max-w-2xl mx-auto">
            {post.fallback && locale !== "fr" && (
              <div className="text-block mb-8 px-4 py-3 rounded-lg border border-accent/20 bg-accent/5 text-sm text-white/60">
                {t.blog.translationUnavailable}
              </div>
            )}
            <BlogArticle content={post.content} />
          </div>
        </div>
      </section>

      {/* Desktop: fixed audit form sliding on the right */}
      <div className="hidden lg:block fixed top-24 right-8 z-40 w-[300px] pointer-events-auto">
        <AuditForm />
      </div>

      {/* Mobile: audit form below article */}
      <section className="relative z-10 pb-20 lg:hidden">
        <div className="pointer-events-auto container mx-auto px-6">
          <AuditForm />
        </div>
      </section>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="relative z-10 pb-32">
          <div className="pointer-events-auto container mx-auto px-6 max-w-3xl">
            <div className="h-px w-full bg-gradient-to-r from-accent/20 via-white/5 to-transparent mb-12" />
            <p className="tag-animate text-xs tracking-[0.3em] uppercase text-accent font-medium mb-8">
              {t.blog.readMore}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {relatedPosts.map((rel) => (
                <Link key={rel.slug} href={`/${locale}/blog/${rel.slug}`} className="block group">
                  <div className="stat-animate rounded-xl border border-white/[0.06] p-6 bg-white/[0.02] hover:bg-white/[0.04] hover:border-accent/20 transition-all duration-500">
                    <span className="text-[10px] tracking-[0.2em] uppercase text-accent/70">{rel.category}</span>
                    <h4 className="font-display text-base text-white mt-2 mb-2 leading-snug">
                      {rel.title}
                    </h4>
                    <p className="text-xs text-white/40 line-clamp-2">{rel.excerpt}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}

export function BlogArticlePageClient({ postsByLocale, allPostsByLocale }: { postsByLocale: Record<string, BlogPost>; allPostsByLocale: Record<string, { slug: string; title: string; excerpt: string; category: string }[]> }) {
  return (
    <BlogShell>
      <ArticleContent postsByLocale={postsByLocale} allPostsByLocale={allPostsByLocale} />
    </BlogShell>
  );
}