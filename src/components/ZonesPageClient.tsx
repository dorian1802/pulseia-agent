"use client";

import { useLanguage } from "@/lib/LanguageContext";
import { CITIES } from "@/lib/cities";
import { MapPin, Globe, ArrowRight, CheckCircle2, Clock } from "lucide-react";
import Link from "next/link";

interface CountryZone {
  id: string;
  name: string;
  nameFr: string;
  active: boolean;
  cities: string[];
  description: string;
}

const ZONES: CountryZone[] = [
  {
    id: "belgium",
    name: "Belgium",
    nameFr: "Belgique",
    active: true,
    cities: ["Lens", "Bruxelles"],
    description: "Siège social et cœur de notre activité. Présence forte à Lens et Bruxelles.",
  },
  {
    id: "france",
    name: "France",
    nameFr: "France",
    active: true,
    cities: ["Lens", "Paris", "Lyon", "Lille"],
    description: "Couverture nationale avec une expertise renforcée dans le Nord et l'Île-de-France.",
  },
  {
    id: "netherlands",
    name: "Netherlands",
    nameFr: "Pays-Bas",
    active: true,
    cities: ["Amsterdam", "Rotterdam"],
    description: "Intervention dans les grandes villes néerlandaises pour les projets web et IA.",
  },
  {
    id: "luxembourg",
    name: "Luxembourg",
    nameFr: "Luxembourg",
    active: true,
    cities: ["Luxembourg"],
    description: "Accompagnement des PME et startups luxembourgeoises dans leur transformation digitale.",
  },
  {
    id: "switzerland",
    name: "Switzerland",
    nameFr: "Suisse",
    active: true,
    cities: ["Genève", "Lausanne", "Zurich"],
    description: "Présence dans les régions francophones et alémaniques pour des projets multilingues.",
  },
  {
    id: "spain",
    name: "Spain",
    nameFr: "Espagne",
    active: true,
    cities: CITIES.filter((c) => c.province === "Alicante" || c.province === "Valence").map((c) => c.name),
    description: "Spécialisation Costa Blanca et Valence avec des pages dédiées pour chaque ville.",
  },
  {
    id: "italy",
    name: "Italy",
    nameFr: "Italie",
    active: true,
    cities: ["Milan", "Rome", "Turin"],
    description: "Intervention sélective pour les projets ambitieux en design et technologie.",
  },
];

export function ZonesPageClient() {
  const { t, locale } = useLanguage();

  const activeZones = ZONES.filter((z) => z.active);

  return (
    <main className="relative z-10">
      {/* Hero */}
      <section className="min-h-[50vh] flex items-center justify-center relative overflow-hidden pt-20">
        <div className="absolute inset-0 bg-gradient-to-b from-dark via-[#0e0a20] to-dark" />
        <div className="relative z-10 max-w-4xl mx-auto text-center px-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-accent/20 bg-accent/5 mb-8">
            <Globe className="w-4 h-4 text-accent" />
            <span className="text-sm text-accent tracking-wide uppercase font-medium">
              {locale === "fr" ? "Zones d'intervention" : "Coverage Areas"}
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-black text-white leading-[0.9] mb-6">
            {locale === "fr" ? "Où nous" : "Where we"}{" "}
            <span className="bg-gradient-to-r from-accent to-accent/70 bg-clip-text text-transparent">
              {locale === "fr" ? "intervenons" : "operate"}
            </span>
          </h1>

          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
            {locale === "fr"
              ? "Pulse IA est présente dans 7 pays européens. Découvrez nos zones d'intervention et contactez-nous même si votre pays n'est pas encore listé ci-dessous."
              : "Pulse IA operates in 7 European countries. Discover our coverage areas and contact us even if your country is not yet listed below."}
          </p>
        </div>
      </section>

      {/* Countries Grid */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid gap-6">
            {activeZones.map((zone) => (
              <div
                key={zone.id}
                className="p-6 md:p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-accent/20 transition-all"
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-4">
                      <CheckCircle2 className="w-5 h-5 text-accent shrink-0" />
                      <h2 className="text-2xl font-bold text-white">{zone.nameFr}</h2>
                    </div>

                    <p className="text-slate-400 mb-4">{zone.description}</p>

                    {zone.cities.length > 0 && (
                      <div className="mb-4">
                        <span className="text-xs text-slate-500 uppercase tracking-wider mb-2 block">
                          {locale === "fr" ? "Villes couvertes" : "Covered cities"}
                        </span>
                        <div className="flex flex-wrap gap-2">
                          {zone.cities.map((city) => {
                            const citySlug = city.toLowerCase().replace(/\s+/g, "-").replace(/[àáâãäå]/g, "a").replace(/[èéêë]/g, "e").replace(/[ìíîï]/g, "i").replace(/[òóôõö]/g, "o").replace(/[ùúûü]/g, "u").replace(/[ñ]/g, "n").replace(/[ç]/g, "c").replace(/[']/g, "");
                            const isInCities = CITIES.some((c) => c.name === city || c.slug === citySlug);

                            return isInCities ? (
                              <Link
                                key={city}
                                href={`/${locale}/agence-ia/${citySlug}`}
                                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-sm bg-accent/10 text-accent border border-accent/20 hover:bg-accent/20 transition-colors"
                              >
                                <MapPin className="w-3 h-3" />
                                {city}
                              </Link>
                            ) : (
                              <span
                                key={city}
                                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-sm bg-white/5 text-slate-300 border border-white/10"
                              >
                                <MapPin className="w-3 h-3" />
                                {city}
                              </span>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="shrink-0">
                    <Link
                      href={`/${locale}/#contact`}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-accent/10 text-accent border border-accent/20 hover:bg-accent/20 transition-colors text-sm font-medium"
                    >
                      {locale === "fr" ? "Nous contacter" : "Contact us"}
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}

            {/* Coming soon card */}
            <div className="p-6 md:p-8 rounded-2xl bg-white/[0.02] border border-white/5 border-dashed">
              <div className="flex items-center gap-3 mb-4">
                <Clock className="w-5 h-5 text-slate-500" />
                <h3 className="text-xl font-bold text-slate-400">
                  {locale === "fr" ? "Autres pays" : "Other countries"}
                </h3>
              </div>
              <p className="text-slate-500 mb-4">
                {locale === "fr"
                  ? "Allemagne, Royaume-Uni, Portugal, Autriche et Pologne seront bientôt disponibles. En attendant, vous pouvez toujours nous contacter pour discuter de votre projet."
                  : "Germany, United Kingdom, Portugal, Austria and Poland will be available soon. In the meantime, you can still contact us to discuss your project."}
              </p>
              <Link
                href={`/${locale}/#contact`}
                className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-sm"
              >
                {locale === "fr" ? "Nous contacter quand même" : "Contact us anyway"}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
