import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { Locale } from "./i18n";

const BLOG_DIR = path.join(process.cwd(), "content/blog");
const VALID_LOCALES: Locale[] = ["fr", "en", "nl", "es", "de", "ma", "pt", "it", "tr", "zh", "ja", "ko", "ru", "hi", "ar"];

export interface BlogPostMeta {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  category: string;
  readTime: string;
  coverImage?: string;
  locale: Locale;
  fallback: boolean;
}

export interface BlogPost extends BlogPostMeta {
  content: string;
}

export function getBlogSlugs(): string[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs.readdirSync(BLOG_DIR, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name);
}

export function getBlogPost(slug: string, locale: string): BlogPost {
  const localePath = path.join(BLOG_DIR, slug, `${locale}.md`);
  const frPath = path.join(BLOG_DIR, slug, "fr.md");
  const fallback = !fs.existsSync(localePath);
  const filePath = fallback ? frPath : localePath;

  if (!fs.existsSync(filePath)) throw new Error(`Blog post not found: ${slug}`);

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);

  return {
    slug,
    title: data.title || "",
    excerpt: data.excerpt || "",
    date: data.date || "",
    author: data.author || "Pulseia",
    category: data.category || "",
    readTime: data.readTime || "",
    coverImage: data.coverImage || undefined,
    locale: (fallback ? "fr" : locale) as Locale,
    fallback,
    content,
  };
}

export function getBlogPostAllLocales(slug: string): Record<string, BlogPost> {
  const result: Record<string, BlogPost> = {};
  for (const loc of VALID_LOCALES) {
    result[loc] = getBlogPost(slug, loc);
  }
  return result;
}

export function getAllBlogPosts(locale: string): BlogPostMeta[] {
  return getBlogSlugs()
    .map((slug) => {
      const { content: _, ...meta } = getBlogPost(slug, locale);
      return meta;
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getAllBlogPostsAllLocales(): Record<string, BlogPostMeta[]> {
  const result: Record<string, BlogPostMeta[]> = {};
  for (const loc of VALID_LOCALES) {
    result[loc] = getAllBlogPosts(loc);
  }
  return result;
}