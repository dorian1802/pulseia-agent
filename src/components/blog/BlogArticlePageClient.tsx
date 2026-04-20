"use client";

import { useLanguage } from "@/lib/LanguageContext";
import { useReadArticles } from "@/lib/useReadArticles";
import { BlogShell } from "./BlogShell";
import { BlogArticle } from "./BlogArticle";
import { ArrowLeft, Calendar, Clock, User, Sparkles, CheckCircle2, Mail, MapPin } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
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
    <div className="rounded-2xl border border-white/[0.06] bg-white/[0.03] backdrop-blur-xl overflow-hidden">
      <div className="h-px w-full bg-gradient-to-r from-accent/50 via-accent/20 to-transparent" />
      <div className="p-6">
        {/* Contact info */}
        <div className="mb-5 pb-5 border-b border-white/[0.06]">
          <div className="flex items-center gap-2.5 text-white/50 text-xs mb-3">
            <Mail className="w-3.5 h-3.5 text-accent flex-shrink-0" />
            <a href={`mailto:${t.cta.email}`} className="hover:text-accent transition-colors">{t.cta.email}</a>
          </div>
          <div className="flex items-center gap-2.5 text-white/50 text-xs">
            <MapPin className="w-3.5 h-3.5 text-accent flex-shrink-0" />
            <span>{t.cta.location}</span>
          </div>
        </div>

        <div className="flex items-center gap-3 mb-5">
          <div className="w-9 h-9 rounded-xl bg-accent/10 flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-accent" />
          </div>
          <h3 className="font-display text-lg text-white leading-snug">{t.audit.formTitle}</h3>
        </div>

        <ul className="space-y-2.5 mb-6">
          {t.audit.benefits.slice(0, 3).map((b) => (
            <li key={b} className="flex items-start gap-2 text-white/50 text-xs leading-relaxed">
              <CheckCircle2 className="w-3.5 h-3.5 text-accent flex-shrink-0 mt-0.5" />
              {b}
            </li>
          ))}
        </ul>

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
            <input
              type="text"
              name="name"
              required
              placeholder={t.cta.formName}
              className="w-full px-3 py-2.5 rounded-lg border border-white/10 bg-white/5 text-white placeholder-white/30 focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-colors text-sm"
            />
            <input
              type="email"
              name="email"
              required
              placeholder={t.cta.formEmail}
              className="w-full px-3 py-2.5 rounded-lg border border-white/10 bg-white/5 text-white placeholder-white/30 focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-colors text-sm"
            />
            <input
              type="text"
              name="website"
              placeholder={t.audit.website}
              className="w-full px-3 py-2.5 rounded-lg border border-white/10 bg-white/5 text-white placeholder-white/30 focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-colors text-sm"
            />
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent-dark text-white rounded-lg px-6 py-2.5 text-xs font-semibold tracking-wider uppercase transition-colors w-full"
            >
              {t.audit.submit} <ArrowLeft className="w-3.5 h-3.5 rotate-180" />
            </button>
          </form>
        )}
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
    window.scrollTo(0, 0);
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
      <section className="relative z-10 pt-40 pb-16">
        <div className="pointer-events-auto container mx-auto px-6 max-w-3xl text-center">
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
                    <h4 className="font-display text-base text-white mt-2 mb-2 group-hover:text-accent transition-colors leading-snug">
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