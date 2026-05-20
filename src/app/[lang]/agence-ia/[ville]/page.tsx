import { CityPageClient } from "@/components/CityPageClient";
import { getCityBySlug, getCitySlugs } from "@/lib/cities";
import type { Metadata } from "next";
import type { Locale } from "@/lib/i18n";

const SITE_URL = "https://pulseia-v2.vercel.app";
const VALID_LOCALES: Locale[] = ["fr", "en", "es", "de", "nl"];

/**
 * Static generation for city pages.
 * Start with French only; extend to other locales when translations are ready.
 */
export async function generateStaticParams() {
  const citySlugs = getCitySlugs();
  // For now, only generate French pages
  return citySlugs.map((ville) => ({ lang: "fr", ville }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; ville: string }>;
}): Promise<Metadata> {
  const { lang, ville } = await params;
  const city = getCityBySlug(ville);

  if (!city) {
    return {
      title: "Page non trouvée — Pulseia",
      robots: { index: false, follow: false },
    };
  }

  const url = `${SITE_URL}/${lang}/agence-ia/${ville}`;

  const title = `Agence Web & IA à ${city.name} | Pulseia — ${city.comarque}`;
  const description = `Création de sites internet et agents IA à ${city.name} (${city.comarque}, ${city.province}). ${city.serviceFocus}. Devis gratuit en 24h.`;

  // Language alternates
  const languages: Record<string, string> = {};
  for (const loc of VALID_LOCALES) {
    languages[loc] = `${SITE_URL}/${loc}/agence-ia/${ville}`;
  }
  languages["x-default"] = `${SITE_URL}/fr/agence-ia/${ville}`;

  return {
    title,
    description,
    alternates: { canonical: url, languages },
    openGraph: {
      title,
      description,
      url,
      siteName: "Pulseia",
      type: "website",
      locale: lang === "fr" ? "fr_FR" : "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function CityPage({
  params,
}: {
  params: Promise<{ lang: string; ville: string }>;
}) {
  const { lang, ville } = await params;
  const city = getCityBySlug(ville);

  if (!city) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-2xl text-white">Ville non trouvée</h1>
      </div>
    );
  }

  return <CityPageClient city={city} lang={lang} />;
}
