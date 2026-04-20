import { getAllBlogPostsAllLocales } from "@/lib/blog";
import { BlogPageClient } from "@/components/blog/BlogPageClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog — Pulseia",
  description: "Articles sur l'IA, le SEO et la transformation digitale",
};

export default async function BlogPage() {
  const postsByLocale = getAllBlogPostsAllLocales();
  return <BlogPageClient postsByLocale={postsByLocale} />;
}