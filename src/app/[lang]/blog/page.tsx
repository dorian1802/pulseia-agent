import { getAllBlogPostsAllLocales } from "@/lib/blog";
import { BlogPageClient } from "@/components/blog/BlogPageClient";
import type { Metadata } from "next";
import type { Locale } from "@/lib/i18n";

const SITE_URL = "https://pulseia-agent.vercel.app";
const VALID_LOCALES: Locale[] = ["fr", "en", "nl", "es", "de", "ma", "pt", "it", "tr", "zh", "ja", "ko", "ru", "hi", "ar"];

const OG_LOCALE_MAP: Record<string, string> = {
  fr: "fr_FR", en: "en_US", nl: "nl_NL", es: "es_ES", de: "de_DE",
  ma: "ar_MA", pt: "pt_PT", it: "it_IT", tr: "tr_TR", zh: "zh_CN",
  ja: "ja_JP", ko: "ko_KR", ru: "ru_RU", hi: "hi_IN", ar: "ar_SA",
};

const BLOG_TITLES: Record<string, string> = {
  fr: "Blog IA & Automation — Pulseia | Guides, Comparatifs et Tutoriels",
  en: "AI & Automation Blog — Pulseia | Guides, Comparisons and Tutorials",
  nl: "AI & Automation Blog — Pulseia | Gidsen, Vergelijkingen en Tutorials",
  es: "Blog IA y Automatización — Pulseia | Guías, Comparativas y Tutoriales",
  de: "KI & Automatisierung Blog — Pulseia | Leitfäden, Vergleiche und Tutorials",
  pt: "Blog IA e Automação — Pulseia | Guias, Comparativos e Tutoriais",
  it: "Blog IA e Automazione — Pulseia | Guide, Comparazioni e Tutorial",
  tr: "Yapay Zeka & Otomasyon Blogu — Pulseia | Rehberler, Karşılaştırmalar",
  zh: "AI与自动化博客 — Pulseia | 指南、对比与教程",
  ja: "AI & 自動化ブログ — Pulseia | ガイド、比較、チュートリアル",
  ko: "AI & 자동화 블로그 — Pulseia | 가이드, 비교, 튜토리얼",
  ru: "Блог ИИ и Автоматизации — Pulseia | Руководства, Сравнения",
  hi: "AI और स्वचालन ब्लॉग — Pulseia | गाइड, तुलना और ट्यूटोरियल",
  ar: "مدونة الذكاء الاصطناعي والأتمتة — Pulseia | أدلة ومقارنات ودروس",
  ma: "Blog IA & Automation — Pulseia | Guides et Comparatifs",
};

const BLOG_DESCS: Record<string, string> = {
  fr: "Blog Pulseia : guides complets, comparatifs d'outils et tutoriels sur l'IA, l'automation et le SEO.",
  en: "Pulseia Blog: complete guides, tool comparisons and tutorials on AI, automation and SEO.",
  nl: "Pulseia Blog: complete gidsen, toolvergelijkingen en tutorials over AI, automatisering en SEO.",
  es: "Blog Pulseia: guías completas, comparativas de herramientas y tutoriales sobre IA, automatización y SEO.",
  de: "Pulseia Blog: vollständige Leitfäden, Tool-Vergleiche und Tutorials zu KI, Automatisierung und SEO.",
  pt: "Blog Pulseia: guias completos, comparativos de ferramentas e tutoriais sobre IA, automação e SEO.",
  it: "Blog Pulseia: guide complete, confronti di strumenti e tutorial su IA, automazione e SEO.",
  tr: "Pulseia Blog: Yapay zeka, otomasyon ve SEO hakkında kapsamlı rehberler, araç karşılaştırmaları ve eğitimler.",
  zh: "Pulseia博客：关于AI、自动化和SEO的完整指南、工具对比和教程。",
  ja: "Pulseiaブログ：AI、自動化、SEOに関する完全ガイド、ツール比較、チュートリアル。",
  ko: "Pulseia 블로그: AI, 자동화, SEO에 대한 완전 가이드, 도구 비교, 튜토리얼.",
  ru: "Блог Pulseia: полные руководства, сравнения инструментов и туториалы по ИИ, автоматизации и SEO.",
  hi: "Pulseia ब्लॉग: AI, स्वचालन और SEO पर पूर्ण गाइड, टूल तुलना और ट्यूटोरियल।",
  ar: "مدونة Pulseia: أدلة شاملة ومقارنات أدوات ودروس حول الذكاء الاصطناعي والأتمتة وتحسين محركات البحث.",
  ma: "Blog Pulseia : guides complets et comparatifs sur l'IA, l'automation et le SEO.",
};

export function generateStaticParams() {
  return VALID_LOCALES.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const locale = VALID_LOCALES.includes(lang as Locale) ? (lang as Locale) : "fr";
  const url = `${SITE_URL}/${lang}/blog`;

  const languages: Record<string, string> = {};
  for (const loc of VALID_LOCALES) {
    languages[loc] = `${SITE_URL}/${loc}/blog`;
  }
  languages["x-default"] = `${SITE_URL}/fr/blog`;

  return {
    title: BLOG_TITLES[locale] || BLOG_TITLES.fr,
    description: BLOG_DESCS[locale] || BLOG_DESCS.fr,
    alternates: { canonical: url, languages },
    openGraph: {
      title: BLOG_TITLES[locale] || BLOG_TITLES.fr,
      description: BLOG_DESCS[locale] || BLOG_DESCS.fr,
      url,
      siteName: "Pulseia",
      locale: OG_LOCALE_MAP[locale] || "fr_FR",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: BLOG_TITLES[locale] || BLOG_TITLES.fr,
      description: BLOG_DESCS[locale] || BLOG_DESCS.fr,
    },
  };
}

export default async function BlogPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const locale = VALID_LOCALES.includes(lang as Locale) ? (lang as Locale) : "fr";
  const postsByLocale = getAllBlogPostsAllLocales(false);

  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `Blog Pulseia — ${locale === "fr" ? "IA, Automation & SEO" : "AI, Automation & SEO"}`,
    description: BLOG_DESCS[locale] || BLOG_DESCS.fr,
    url: `${SITE_URL}/${locale}/blog`,
    publisher: { "@type": "Organization", name: "Pulseia", url: SITE_URL },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }} />
      <BlogPageClient postsByLocale={postsByLocale} />
    </>
  );
}