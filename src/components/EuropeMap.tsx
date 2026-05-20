"use client";

import { useState } from "react";
import { useLanguage } from "@/lib/LanguageContext";
import { MapPin, Globe, ArrowRight } from "lucide-react";
import Link from "next/link";

interface Country {
  id: string;
  name: string;
  nameFr: string;
  path: string;
  active: boolean;
  cities?: string[];
}

const COUNTRIES: Country[] = [
  // Pays actifs
  {
    id: "france",
    name: "France",
    nameFr: "France",
    path: "M220,280 L240,270 L260,275 L270,300 L265,330 L250,340 L230,335 L220,310 Z",
    active: true,
    cities: ["Lens", "Paris", "Lyon", "Lille", "Bruxelles (BE)"],
  },
  {
    id: "belgium",
    name: "Belgium",
    nameFr: "Belgique",
    path: "M245,240 L260,235 L265,250 L260,265 L245,260 L240,250 Z",
    active: true,
    cities: ["Bruxelles", "Lens"],
  },
  {
    id: "netherlands",
    name: "Netherlands",
    nameFr: "Pays-Bas",
    path: "M250,220 L270,215 L280,230 L275,245 L260,240 L250,230 Z",
    active: true,
    cities: ["Amsterdam", "Rotterdam"],
  },
  {
    id: "luxembourg",
    name: "Luxembourg",
    nameFr: "Luxembourg",
    path: "M255,265 L265,262 L268,270 L260,275 Z",
    active: true,
  },
  {
    id: "switzerland",
    name: "Switzerland",
    nameFr: "Suisse",
    path: "M275,290 L285,288 L290,300 L285,310 L275,308 L270,298 Z",
    active: true,
    cities: ["Genève", "Lausanne", "Zurich"],
  },
  {
    id: "spain",
    name: "Spain",
    nameFr: "Espagne",
    path: "M180,380 L200,360 L220,355 L240,360 L250,380 L245,420 L230,440 L200,445 L180,430 L170,400 Z",
    active: true,
    cities: ["Alicante", "Valence", "Altea", "Benidorm", "Dénia", "Jávea", "Calpe"],
  },
  {
    id: "italy",
    name: "Italy",
    nameFr: "Italie",
    path: "M300,320 L310,315 L320,330 L315,360 L310,380 L305,400 L300,420 L295,410 L290,380 L295,350 Z",
    active: true,
    cities: ["Milan", "Rome", "Turin"],
  },
  // Pays inactifs (grisés)
  {
    id: "germany",
    name: "Germany",
    nameFr: "Allemagne",
    path: "M265,230 L295,225 L305,240 L300,270 L285,280 L270,275 L260,260 Z",
    active: false,
  },
  {
    id: "uk",
    name: "United Kingdom",
    nameFr: "Royaume-Uni",
    path: "M210,180 L235,175 L245,190 L240,210 L225,215 L210,205 Z",
    active: false,
  },
  {
    id: "portugal",
    name: "Portugal",
    nameFr: "Portugal",
    path: "M160,390 L175,385 L180,405 L175,425 L160,420 Z",
    active: false,
  },
  {
    id: "austria",
    name: "Austria",
    nameFr: "Autriche",
    path: "M300,270 L315,265 L320,280 L310,295 L295,290 Z",
    active: false,
  },
  {
    id: "poland",
    name: "Poland",
    nameFr: "Pologne",
    path: "M300,220 L330,215 L335,235 L325,255 L305,250 Z",
    active: false,
  },
];

export function EuropeMapSection() {
  const { t, locale } = useLanguage();
  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });

  const activeCountries = COUNTRIES.filter((c) => c.active);
  const inactiveCountries = COUNTRIES.filter((c) => !c.active);

  return (
    <section className="relative z-10 py-24 border-t border-white/5">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-accent/20 bg-accent/5 mb-6">
            <Globe className="w-4 h-4 text-accent" />
            <span className="text-sm text-accent tracking-wide uppercase font-medium">
              {locale === "fr" ? "Zones d'intervention" : "Coverage Areas"}
            </span>
          </div>

          <h2 className="text-4xl md:text-6xl font-black text-white mb-4">
            {locale === "fr" ? "Où nous" : "Where we"}{" "}
            <span className="bg-gradient-to-r from-accent to-accent/70 bg-clip-text text-transparent">
              {locale === "fr" ? "intervenons" : "operate"}
            </span>
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            {locale === "fr"
              ? "Pulse IA est active dans 7 pays européens. Cliquez sur un pays pour découvrir nos zones d'intervention."
              : "Pulse IA operates in 7 European countries. Click a country to discover our coverage areas."}
          </p>
        </div>

        {/* Map Container */}
        <div className="relative max-w-4xl mx-auto">
          {/* SVG Europe Map */}
          <svg
            viewBox="0 0 500 500"
            className="w-full h-auto max-h-[500px]"
            onMouseMove={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              setTooltipPos({
                x: e.clientX - rect.left,
                y: e.clientY - rect.top,
              });
            }}
          >
            {/* Background */}
            <rect width="500" height="500" fill="transparent" />

            {/* Ocean / Background decoration */}
            <circle cx="250" cy="250" r="200" fill="rgba(124, 58, 237, 0.03)" />

            {COUNTRIES.map((country) => (
              <g key={country.id}>
                <path
                  d={country.path}
                  fill={country.active ? "rgba(124, 58, 237, 0.6)" : "rgba(51, 65, 85, 0.4)"}
                  stroke={country.active ? "#a78bfa" : "#475569"}
                  strokeWidth={country.active ? 1.5 : 1}
                  className={`transition-all duration-300 ${
                    country.active
                      ? "cursor-pointer hover:fill-[#a78bfa] hover:drop-shadow-[0_0_10px_rgba(167,139,250,0.5)]"
                      : "cursor-not-allowed"
                  }`}
                  onMouseEnter={() => setHoveredCountry(country.id)}
                  onMouseLeave={() => setHoveredCountry(null)}
                />
              </g>
            ))}
          </svg>

          {/* Tooltip */}
          {hoveredCountry && (
            <div
              className="absolute pointer-events-none z-50 px-4 py-3 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl"
              style={{
                left: `${(tooltipPos.x / 500) * 100}%`,
                top: `${(tooltipPos.y / 500) * 100}%`,
                transform: "translate(-50%, -120%)",
              }}
            >
              {(() => {
                const country = COUNTRIES.find((c) => c.id === hoveredCountry);
                if (!country) return null;
                return (
                  <div className="text-center">
                    <p className="text-white font-semibold text-sm mb-1">
                      {country.nameFr}
                    </p>
                    {country.active ? (
                      <div className="text-xs text-accent">
                        <span className="inline-flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {country.cities?.length
                            ? `${country.cities.length} ville${country.cities.length > 1 ? "s" : ""}`
                            : "Disponible"}
                        </span>
                      </div>
                    ) : (
                      <p className="text-xs text-slate-500">
                        Bientôt disponible
                      </p>
                    )}
                  </div>
                );
              })()}
            </div>
          )}

          {/* Legend */}
          <div className="flex items-center justify-center gap-6 mt-8">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-sm bg-accent/60 border border-accent-light" />
              <span className="text-sm text-slate-400">{locale === "fr" ? "Pays actifs" : "Active countries"}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-sm bg-slate-700/40 border border-slate-600" />
              <span className="text-sm text-slate-500">{locale === "fr" ? "Bientôt disponible" : "Coming soon"}</span>
            </div>
          </div>

          {/* CTA Link */}
          <div className="text-center mt-8">
            <Link
              href={`/${locale}/zones`}
              className="inline-flex items-center gap-2 text-accent hover:text-accent-light transition-colors font-medium"
            >
              {locale === "fr" ? "Voir toutes nos zones d'intervention" : "View all coverage areas"}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
