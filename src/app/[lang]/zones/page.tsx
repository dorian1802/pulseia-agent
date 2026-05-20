import { ZonesPageClient } from "@/components/ZonesPageClient";
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
  const url = `${SITE_URL}/${lang}/zones`;

  const titles: Record<string, string> = {
    fr: "Zones d'intervention — Pulseia | Belgique, France, Espagne, Suisse, etc.",
    en: "Coverage Areas — Pulseia | Belgium, France, Spain, Switzerland, etc.",
  };

  const descs: Record<string, string> = {
    fr: "Découvrez les zones d'intervention de Pulse IA : Belgique, France, Pays-Bas, Espagne (Costa Blanca), Luxembourg, Suisse et Italie. Agence web et IA présente localement.",
    en: "Discover Pulse IA coverage areas: Belgium, France, Netherlands, Spain (Costa Blanca), Luxembourg, Switzerland and Italy. Web and AI agency with local presence.",
  };

  const languages: Record<string, string> = {};
  for (const loc of VALID_LOCALES) {
    languages[loc] = `${SITE_URL}/${loc}/zones`;
  }
  languages["x-default"] = `${SITE_URL}/fr/zones`;

  return {
    title: titles[locale] || titles.en,
    description: descs[locale] || descs.en,
    alternates: { canonical: url, languages },
    openGraph: {
      title: titles[locale] || titles.en,
      description: descs[locale] || descs.en,
      url,
      siteName: "Pulseia",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: titles[locale] || titles.en,
      description: descs[locale] || descs.en,
    },
  };
}

export default function ZonesPage({ params }: { params: Promise<{ lang: string }> }) {
  return <ZonesPageClient />;
}
