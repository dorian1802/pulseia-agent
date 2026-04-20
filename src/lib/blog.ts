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

function getCoverImage(slug: string): string | undefined {
  const exts = ["jpg", "jpeg", "png", "webp"];
  for (const ext of exts) {
    if (fs.existsSync(path.join(BLOG_DIR, slug, `cover.${ext}`))) {
      return `/blog-cover/${slug}`;
    }
  }
  return undefined;
}

export function getBlogSlugs(): string[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs.readdirSync(BLOG_DIR, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name);
}

export function blogPostExists(slug: string): boolean {
  return fs.existsSync(path.join(BLOG_DIR, slug, "fr.md"));
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
    coverImage: getCoverImage(slug),
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

export function getAllBlogPosts(locale: string, includeFallback = true): BlogPostMeta[] {
  return getBlogSlugs()
    .map((slug) => {
      const { content: _, ...meta } = getBlogPost(slug, locale);
      return meta;
    })
    .filter((post) => includeFallback || !post.fallback)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getAllBlogPostsAllLocales(includeFallback = true): Record<string, BlogPostMeta[]> {
  const result: Record<string, BlogPostMeta[]> = {};
  for (const loc of VALID_LOCALES) {
    result[loc] = getAllBlogPosts(loc, includeFallback);
  }
  return result;
}

export function getAvailableLocalesForSlug(slug: string): Locale[] {
  const locales: Locale[] = [];
  for (const loc of VALID_LOCALES) {
    if (fs.existsSync(path.join(BLOG_DIR, slug, `${loc}.md`))) {
      locales.push(loc);
    }
  }
  return locales;
}