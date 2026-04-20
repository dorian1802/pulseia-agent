import { AboutPageClient } from "@/components/AboutPageClient";
import type { Metadata } from "next";
import type { Locale } from "@/lib/i18n";

const SITE_URL = "https://pulseia-agent.vercel.app";
const VALID_LOCALES: Locale[] = ["fr", "en", "nl", "es", "de", "ma", "pt", "it", "tr", "zh", "ja", "ko", "ru", "hi", "ar"];

export async function generateStaticParams() {
  return VALID_LOCALES.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const locale = VALID_LOCALES.includes(lang as Locale) ? (lang as Locale) : "fr";
  const url = `${SITE_URL}/${lang}/about`;

  const titles: Record<string, string> = {
    fr: "À Propos de Pulseia — L'IA qui Travaille pour Vous 24/7",
    en: "About Pulseia — AI That Works for You 24/7",
  };
  const descs: Record<string, string> = {
    fr: "Pulseia est une agence digitale spécialisée en IA et automation. 400+ agents déployés, 9 divisions expertes, présent en Belgique, France et Suisse.",
    en: "Pulseia is a digital agency specializing in AI and automation. 400+ agents deployed, 9 expert divisions, based in Belgium, France and Switzerland.",
  };

  const languages: Record<string, string> = {};
  for (const loc of VALID_LOCALES) {
    languages[loc] = `${SITE_URL}/${loc}/about`;
  }
  languages["x-default"] = `${SITE_URL}/fr/about`;

  return {
    title: titles[locale] || titles.en,
    description: descs[locale] || descs.en,
    alternates: { canonical: url, languages },
    openGraph: { title: titles[locale] || titles.en, description: descs[locale] || descs.en, url, siteName: "Pulseia", type: "website" },
    twitter: { card: "summary_large_image", title: titles[locale] || titles.en, description: descs[locale] || descs.en },
  };
}

export default function AboutPage() {
  return <AboutPageClient />;
}