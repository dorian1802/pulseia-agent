import { getAllBlogPostsAllLocales } from "@/lib/blog";
import { BlogPageClient } from "@/components/blog/BlogPageClient";
import type { Metadata } from "next";
import type { Locale } from "@/lib/i18n";

const VALID_LOCALES: Locale[] = ["fr", "en", "nl", "es", "de", "ma", "pt", "it", "tr", "zh", "ja", "ko", "ru", "hi", "ar"];
const SITE_URL = "https://pulseia-agent.vercel.app";

export function generateStaticParams() {
  return VALID_LOCALES.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const locale = VALID_LOCALES.includes(lang as Locale) ? (lang as Locale) : "fr";
  const url = `${SITE_URL}/${lang}/blog`;

  return {
    title: "Blog IA & Automation — Pulseia | Guides, Comparatifs et Tutoriels",
    description:
      "Blog Pulseia : guides complets, comparatifs d'outils et tutoriels sur l'IA, l'automation et le SEO. ChatGPT, Claude, n8n, Make, Midjourney et plus.",
    alternates: { canonical: url },
    openGraph: {
      title: "Blog IA & Automation — Pulseia",
      description:
        "Guides complets, comparatifs d'outils et tutoriels sur l'IA et l'automation pour PME.",
      url,
      siteName: "Pulseia",
      locale: locale === "fr" ? "fr_FR" : locale,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "Blog IA & Automation — Pulseia",
      description:
        "Guides complets, comparatifs d'outils et tutoriels sur l'IA et l'automation pour PME.",
    },
  };
}

export default async function BlogPage() {
  const postsByLocale = getAllBlogPostsAllLocales(false);

  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Blog Pulseia — IA, Automation & SEO",
    description:
      "Guides complets, comparatifs d'outils et tutoriels sur l'intelligence artificielle, l'automation et le SEO pour PME.",
    url: `${SITE_URL}/fr/blog`,
    publisher: {
      "@type": "Organization",
      name: "Pulseia",
      url: SITE_URL,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />
      <BlogPageClient postsByLocale={postsByLocale} />
    </>
  );
}