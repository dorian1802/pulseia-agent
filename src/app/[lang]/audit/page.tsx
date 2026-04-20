import { AuditPageClient } from "@/components/AuditPageClient";
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
  const url = `${SITE_URL}/${lang}/audit`;

  const titles: Record<string, string> = {
    fr: "Audit IA Gratuit — Pulseia | Découvrez votre Potentiel d'Automation",
    en: "Free AI Audit — Pulseia | Discover Your Automation Potential",
  };
  const descs: Record<string, string> = {
    fr: "Obtenez un audit gratuit de votre potentiel d'automatisation IA. Identifiez les tâches à automatiser, estimez le ROI et recevez un plan d'action personnalisé.",
    en: "Get a free audit of your AI automation potential. Identify tasks to automate, estimate ROI and receive a personalized action plan.",
  };

  const languages: Record<string, string> = {};
  for (const loc of VALID_LOCALES) {
    languages[loc] = `${SITE_URL}/${loc}/audit`;
  }
  languages["x-default"] = `${SITE_URL}/fr/audit`;

  return {
    title: titles[locale] || titles.en,
    description: descs[locale] || descs.en,
    alternates: { canonical: url, languages },
    openGraph: { title: titles[locale] || titles.en, description: descs[locale] || descs.en, url, siteName: "Pulseia", type: "website" },
    twitter: { card: "summary_large_image", title: titles[locale] || titles.en, description: descs[locale] || descs.en },
  };
}

export default function AuditPage() {
  return <AuditPageClient />;
}