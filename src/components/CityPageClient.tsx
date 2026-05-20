"use client";

import { useLanguage } from "@/lib/LanguageContext";
import { getNeighboringCities } from "@/lib/cities";
import type { CityData } from "@/lib/cities";
import {
  MapPin,
  Building2,
  Globe,
  Bot,
  ArrowRight,
  ExternalLink,
  BookOpen,
  MessageCircle,
} from "lucide-react";
import Link from "next/link";

interface CityPageClientProps {
  city: CityData;
  lang: string;
}

export function CityPageClient({ city, lang }: CityPageClientProps) {
  const { t } = useLanguage();
  const neighbors = getNeighboringCities(city.slug);

  const postalDisplay =
    city.postalCodes.length > 1
      ? `${city.postalCodes[0]} — ${city.postalCodes[city.postalCodes.length - 1]}`
      : city.postalCodes[0];

  return (
    <main className="relative z-10">
      {/* ── Hero ── */}
      <section className="min-h-[70vh] flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-dark via-[#0e0a20] to-dark" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[150px] pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto text-center px-6 pt-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-accent/20 bg-accent/5 mb-8">
            <MapPin className="w-4 h-4 text-accent" />
            <span className="text-sm text-accent tracking-wide uppercase font-medium">
              {city.comarque} · {city.province}
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-black text-white leading-[0.9] tracking-tight mb-6">
            Agence Web &amp; IA
            <br />
            <span className="bg-gradient-to-r from-accent to-accent/70 bg-clip-text text-transparent">
              à {city.name}
            </span>
          </h1>

          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Création de sites internet, chatbots intelligents et référencement local pour les entreprises de{" "}
            <strong className="text-white">{city.name}</strong> et ses environs.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href={`/${lang}/audit`}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-accent text-white font-semibold hover:bg-accent/90 transition-all"
            >
              <Bot className="w-5 h-5" />
              Demander un devis gratuit
            </Link>
            <Link
              href={`/${lang}/#contact`}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-white/20 text-white font-semibold hover:bg-white/5 transition-all"
            >
              <MessageCircle className="w-5 h-5" />
              Nous contacter
            </Link>
          </div>
        </div>
      </section>

      {/* ── Introduction localisée ── */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
              <MapPin className="w-5 h-5 text-accent" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              Votre agence digitale à {city.name}
            </h2>
          </div>

          <p className="text-slate-400 text-lg leading-relaxed mb-6">
            {city.description}
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-8">
            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <span className="text-xs text-slate-500 uppercase tracking-wider">Code postal</span>
              <p className="text-white font-mono mt-1">{postalDisplay}</p>
            </div>
            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <span className="text-xs text-slate-500 uppercase tracking-wider">Comarque</span>
              <p className="text-white mt-1">{city.comarque}</p>
            </div>
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 col-span-2 md:col-span-1">
              <span className="text-xs text-slate-500 uppercase tracking-wider">Province</span>
              <p className="text-white mt-1">{city.province}</p>
            </div>
          </div>

          {city.urbanisations.length > 0 && (
            <div className="mt-6">
              <span className="text-xs text-slate-500 uppercase tracking-wider">Secteurs &amp; Urbanisations</span>
              <div className="flex flex-wrap gap-2 mt-2">
                {city.urbanisations.map((u) => (
                  <span
                    key={u}
                    className="px-3 py-1 rounded-full text-sm bg-white/5 text-slate-300 border border-white/10"
                  >
                    {u}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ── Services adaptés ── */}
      <section className="py-20 px-6 border-t border-white/5">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
              <Building2 className="w-5 h-5 text-accent" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              Nos services à {city.name}
            </h2>
          </div>

          <p className="text-slate-400 text-lg leading-relaxed mb-10">
            Nous mettons notre expertise au service des entreprises de {city.name} en proposant{" "}
            <strong className="text-white">{city.serviceFocus}</strong>.
          </p>

          <div className="grid gap-4">
            <ServiceCard
              icon={<Globe className="w-6 h-6" />}
              title="Création de site web"
              description={`Vitrine, e-commerce ou landing page pensée pour les clients de ${city.name}. Design unique, référencement intégré.`}
            />
            <ServiceCard
              icon={<Bot className="w-6 h-6" />}
              title="Agents IA & Chatbots"
              description={`Automatisez votre relation client à ${city.name}. Chatbot multilingue, prise de rendez-vous et relances automatisées.`}
            />
            <ServiceCard
              icon={<ExternalLink className="w-6 h-6" />}
              title="SEO Local"
              description={`Apparaissez sur Google quand on cherche un service à ${city.name} ou dans la ${city.comarque}.`}
            />
          </div>
        </div>
      </section>

      {/* ── Villes voisines ── */}
      {neighbors.length > 0 && (
        <section className="py-20 px-6 border-t border-white/5">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                <MapPin className="w-5 h-5 text-accent" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-white">Nous intervenons aussi aux alentours</h2>
            </div>

            <p className="text-slate-400 mb-8">
              Pulseia couvre toute la {city.comarque} et au-delà. Découvrez nos services dans les villes voisines de {city.name}.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {neighbors.map((n) => (
                <Link
                  key={n.slug}
                  href={`/${lang}/agence-ia/${n.slug}`}
                  className="group p-5 rounded-xl bg-white/5 border border-white/10 hover:border-accent/30 hover:bg-white/[0.07] transition-all"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-white font-semibold group-hover:text-accent transition-colors">
                      {n.name}
                    </span>
                    <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-accent group-hover:translate-x-1 transition-all" />
                  </div>
                  <span className="text-sm text-slate-500">{n.comarque}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Ressources ── */}
      <section className="py-20 px-6 border-t border-white/5">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-accent" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              Nos ressources sur {city.name}
            </h2>
          </div>

          <p className="text-slate-400 mb-8">
            Découvrez nos guides et analyses pour comprendre comment le digital transforme les entreprises à {city.name} et dans la {city.comarque}.
          </p>

          <div className="p-8 rounded-2xl bg-white/5 border border-white/10 text-center">
            <BookOpen className="w-10 h-10 text-accent/60 mx-auto mb-4" />
            <p className="text-slate-400 mb-4">
              Nos articles sur {city.name} arrivent bientôt.
            </p>
            <Link
              href={`/${lang}/blog`}
              className="inline-flex items-center gap-2 text-accent hover:text-accent/80 font-medium transition-colors"
            >
              Explorer le blog
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <div className="absolute inset-0 bg-gradient-to-b from-dark via-[#0e0a20] to-dark opacity-50 pointer-events-none" />
          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-black text-white mb-6">
              Prêt à propulser votre entreprise à{" "}
              <span className="bg-gradient-to-r from-accent to-accent/70 bg-clip-text text-transparent">
                {city.name}
              </span>
              ?
            </h2>
            <p className="text-lg text-slate-400 mb-10 max-w-xl mx-auto">
              Obtenez un devis gratuit en 24h pour votre projet de site web, chatbot IA ou référencement local.
            </p>
            <Link
              href={`/${lang}/audit`}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-accent text-white font-semibold hover:bg-accent/90 transition-all"
            >
              <Bot className="w-5 h-5" />
              Demander mon devis gratuit
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

function ServiceCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="flex gap-4 p-5 rounded-xl bg-white/5 border border-white/10 hover:border-accent/20 transition-colors">
      <div className="shrink-0 w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center text-accent">
        {icon}
      </div>
      <div>
        <h3 className="text-white font-semibold mb-1">{title}</h3>
        <p className="text-slate-400 text-sm leading-relaxed">{description}</p>
      </div>
    </div>
  );
}
