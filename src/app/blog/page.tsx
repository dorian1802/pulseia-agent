import { getAllBlogPostsAllLocales } from "@/lib/blog";
import { BlogPageClient } from "@/components/blog/BlogPageClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog IA & Automation — Pulseia | Guides, Comparatifs et Tutoriels",
  description:
    "Blog Pulseia : guides complets, comparatifs d'outils et tutoriels sur l'IA, l'automation et le SEO. ChatGPT, Claude, n8n, Make, Midjourney et plus.",
  alternates: { canonical: "https://pulseia-agent.vercel.app/blog" },
  openGraph: {
    title: "Blog IA & Automation — Pulseia",
    description:
      "Guides complets, comparatifs d'outils et tutoriels sur l'IA et l'automation pour PME.",
    url: "https://pulseia-agent.vercel.app/blog",
    siteName: "Pulseia",
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog IA & Automation — Pulseia",
    description:
      "Guides complets, comparatifs d'outils et tutoriels sur l'IA et l'automation pour PME.",
  },
};

export default async function BlogPage() {
  const postsByLocale = getAllBlogPostsAllLocales();

  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Blog Pulseia — IA, Automation & SEO",
    description:
      "Guides complets, comparatifs d'outils et tutoriels sur l'intelligence artificielle, l'automation et le SEO pour PME.",
    url: "https://pulseia-agent.vercel.app/blog",
    publisher: {
      "@type": "Organization",
      name: "Pulseia",
      url: "https://pulseia-agent.vercel.app",
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