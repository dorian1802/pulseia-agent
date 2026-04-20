"use client";

import { useLanguage } from "@/lib/LanguageContext";
import { BlogShell } from "./BlogShell";
import { FeaturedCard, BlogCard } from "./BlogCard";
import type { BlogPostMeta } from "@/lib/blog";

function BlogList({ postsByLocale }: { postsByLocale: Record<string, BlogPostMeta[]> }) {
  const { locale, t } = useLanguage();
  const posts = postsByLocale[locale] || postsByLocale["fr"];
  const [featured, ...rest] = posts;

  return (
    <>
      {/* Blog Hero */}
      <section className="min-h-[60vh] relative z-10 flex items-center py-32">
        <div className="pointer-events-auto container mx-auto px-6 text-center">
          <p className="tag-animate text-xs tracking-[0.5em] uppercase text-accent font-medium mb-6">
            {t.blog.tag}
          </p>
          <h2 className="font-display text-6xl md:text-8xl font-light text-white mb-6 leading-[0.9]">
            {t.blog.title1}{" "}
            <span className="font-bold bg-gradient-to-r from-accent to-blue-400 bg-clip-text text-transparent italic">
              {t.blog.title2}
            </span>
          </h2>
        </div>
      </section>

      {/* Featured Post */}
      {featured && (
        <section className="relative z-10 pb-12">
          <div className="pointer-events-auto container mx-auto px-6">
            <FeaturedCard post={featured} />
          </div>
        </section>
      )}

      {/* Post Grid — masonry 12-col like Portfolio */}
      {rest.length > 0 && (
        <section className="relative z-10 py-12">
          <div className="pointer-events-auto container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
              {rest.map((post, i) => {
                const isLarge = i % 3 === 0;
                return (
                  <div
                    key={post.slug}
                    className={`${isLarge ? "md:col-span-7" : "md:col-span-5"}`}
                  >
                    <BlogCard post={post} index={i} />
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {posts.length === 0 && (
        <section className="min-h-[40vh] relative z-10 flex items-center py-32">
          <div className="pointer-events-auto container mx-auto px-6 text-center">
            <p className="text-white/30 text-lg">Aucun article pour le moment.</p>
          </div>
        </section>
      )}
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