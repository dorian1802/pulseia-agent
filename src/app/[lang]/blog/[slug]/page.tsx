import { getBlogSlugs, getBlogPost, getBlogPostAllLocales, getAllBlogPostsAllLocales } from "@/lib/blog";
import { BlogArticlePageClient } from "@/components/blog/BlogArticlePageClient";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import type { Locale } from "@/lib/i18n";

const SITE_URL = "https://pulseia-agent.vercel.app";

const VALID_LOCALES: Locale[] = ["fr", "en", "nl", "es", "de", "ma", "pt", "it", "tr", "zh", "ja", "ko", "ru", "hi", "ar"];

export async function generateStaticParams() {
  const slugs = getBlogSlugs();
  return VALID_LOCALES.flatMap((lang) => slugs.map((slug) => ({ lang, slug })));
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string; slug: string }> }): Promise<Metadata> {
  const { lang, slug } = await params;
  const locale = VALID_LOCALES.includes(lang as Locale) ? (lang as Locale) : "fr";
  const post = getBlogPost(slug, locale);
  const url = `${SITE_URL}/${lang}/blog/${slug}`;

  return {
    title: `${post.title} | Pulseia Blog`,
    description: post.excerpt || `Article ${post.category} par Pulseia — ${post.readTime} de lecture`,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      url,
      siteName: "Pulseia",
      locale: locale === "fr" ? "fr_FR" : locale,
      publishedTime: post.date,
      authors: [post.author || "Pulseia"],
      tags: [post.category],
      ...(post.coverImage ? { images: [{ url: post.coverImage, width: 1200, height: 630, alt: post.title }] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      ...(post.coverImage ? { images: [post.coverImage] } : {}),
    },
  };
}

function extractFAQItems(content: string): { question: string; answer: string }[] {
  const items: { question: string; answer: string }[] = [];
  const h3Matches = content.match(/### (.+)/g);
  if (!h3Matches) return items;

  for (let i = 0; i < h3Matches.length; i++) {
    const q = h3Matches[i].replace("### ", "").trim();
    if (q.endsWith("?")) {
      items.push({ question: q, answer: "" });
    }
  }
  return items.slice(0, 5);
}

export default async function BlogArticlePage({ params }: { params: Promise<{ lang: string; slug: string }> }) {
  const { lang, slug } = await params;
  const locale = VALID_LOCALES.includes(lang as Locale) ? (lang as Locale) : "fr";
  const postsByLocale = getBlogPostAllLocales(slug);
  const allPosts = getAllBlogPostsAllLocales(false);

  const post = postsByLocale[locale] || postsByLocale["fr"] || Object.values(postsByLocale)[0];

  // Redirect to French version if no translation exists for this locale
  if (post.fallback && locale !== "fr") {
    redirect(`/fr/blog/${slug}`);
  }
  const url = `${SITE_URL}/${lang}/blog/${slug}`;
  const faqItems = extractFAQItems(post.content);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      "@type": "Organization",
      name: post.author || "Pulseia",
      url: SITE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: "Pulseia",
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/logo.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    ...(post.coverImage ? { image: `${SITE_URL}${post.coverImage}` } : {}),
  };

  const faqSchema = faqItems.length > 0
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqItems.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: "Consultez l'article pour la réponse complète.",
          },
        })),
      }
    : null;

  const relatedByLocale: Record<string, { slug: string; title: string; excerpt: string; category: string }[]> = {};
  for (const [loc, posts] of Object.entries(allPosts)) {
    relatedByLocale[loc] = posts.map(({ slug: s, title, excerpt, category }) => ({ slug: s, title, excerpt, category }));
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      <BlogArticlePageClient postsByLocale={postsByLocale} allPostsByLocale={relatedByLocale} />
    </>
  );
}