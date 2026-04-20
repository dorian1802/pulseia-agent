import { getBlogSlugs, getBlogPost, getBlogPostAllLocales, getAllBlogPostsAllLocales } from "@/lib/blog";
import { BlogArticlePageClient } from "@/components/blog/BlogArticlePageClient";
import type { Metadata } from "next";

export async function generateStaticParams() {
  return getBlogSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug, "fr");
  return {
    title: `${post.title} — Pulseia Blog`,
    description: post.excerpt,
  };
}

export default async function BlogArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const postsByLocale = getBlogPostAllLocales(slug);
  const allPosts = getAllBlogPostsAllLocales();
  const relatedByLocale: Record<string, { slug: string; title: string; excerpt: string; category: string }[]> = {};
  for (const [loc, posts] of Object.entries(allPosts)) {
    relatedByLocale[loc] = posts.map(({ slug: s, title, excerpt, category }) => ({ slug: s, title, excerpt, category }));
  }
  return <BlogArticlePageClient postsByLocale={postsByLocale} allPostsByLocale={relatedByLocale} />;
}