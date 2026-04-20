import type { MetadataRoute } from "next";
import { getBlogSlugs, getAvailableLocalesForSlug } from "@/lib/blog";
import type { Locale } from "@/lib/i18n";

const BASE_URL = "https://pulseia-agent.vercel.app";
const LOCALES: Locale[] = ["fr", "en", "nl", "es", "de", "ma", "pt", "it", "tr", "zh", "ja", "ko", "ru", "hi", "ar"];

export default function sitemap(): MetadataRoute.Sitemap {
  const blogSlugs = getBlogSlugs();

  const staticPages = LOCALES.map((lang) => [
    { url: `${BASE_URL}/${lang}`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: lang === "fr" ? 1.0 : 0.8 },
    { url: `${BASE_URL}/${lang}/blog`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: lang === "fr" ? 0.9 : 0.7 },
    { url: `${BASE_URL}/${lang}/about`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: lang === "fr" ? 0.7 : 0.5 },
    { url: `${BASE_URL}/${lang}/audit`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: lang === "fr" ? 0.7 : 0.5 },
  ]).flat();

  const blogPages = blogSlugs.flatMap((slug) => {
    const availableLocales = getAvailableLocalesForSlug(slug);
    // Only include pages for locales that have a translation (plus French fallback)
    const locs = availableLocales.length > 0 ? availableLocales : ["fr" as Locale];
    return locs.map((lang) => ({
      url: `${BASE_URL}/${lang}/blog/${slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: lang === "fr" ? 0.8 : 0.6,
    }));
  });

  return [...staticPages, ...blogPages];
}