"use client";

import { useLanguage } from "@/lib/LanguageContext";
import { Languages, Menu, X } from "lucide-react";
import { useState, useCallback } from "react";
import Lenis from "lenis";

const sections = ["about", "services", "agents", "portfolio", "products", "audit", "contact"] as const;

export function Navbar() {
  const { locale, t, setLocale } = useLanguage();
  const [mobileOpen, setMobileOpen] = useState(false);

  const scrollTo = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (!el) return;

    const lenis = (window as unknown as { __lenis?: Lenis }).__lenis;
    if (lenis) {
      lenis.scrollTo(el, { offset: 0, duration: 3 });
    } else {
      el.scrollIntoView({ behavior: "smooth" });
    }
    setMobileOpen(false);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-40 transition-all duration-500 bg-dark/80 backdrop-blur-md py-4">
      <nav className="container mx-auto px-6 flex items-center justify-between" aria-label="Navigation principale">
        <a
          href="#"
          onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
          className="font-display text-2xl font-bold tracking-widest text-white"
          aria-label="Pulseia — Retour en haut"
        >
          PULSE<span className="text-accent">IA</span>
        </a>

        <div className="hidden md:flex items-center gap-6">
          {sections.map((key) => (
            <button
              key={key}
              onClick={() => scrollTo(key)}
              aria-label={`Aller à la section ${t.nav[key]}`}
              className="text-xs font-medium tracking-widest uppercase text-white/70 hover:text-accent transition-colors"
            >
              {t.nav[key]}
            </button>
          ))}
          <button
            onClick={() => setLocale(locale === "fr" ? "en" : "fr")}
            aria-label={`Changer la langue en ${locale === "fr" ? "anglais" : "français"}`}
            className="flex items-center gap-1 text-xs font-medium tracking-wider uppercase text-accent hover:text-accent-light transition-colors"
          >
            <Languages className="w-3.5 h-3.5" aria-hidden="true" />
            {locale.toUpperCase()}
          </button>
        </div>

        <div className="md:hidden flex items-center gap-3">
          <button
            onClick={() => setLocale(locale === "fr" ? "en" : "fr")}
            aria-label={`Changer la langue en ${locale === "fr" ? "anglais" : "français"}`}
            className="text-xs font-medium text-accent"
          >
            {locale.toUpperCase()}
          </button>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={mobileOpen}
            className="text-white/70"
          >
            {mobileOpen ? <X className="w-5 h-5" aria-hidden="true" /> : <Menu className="w-5 h-5" aria-hidden="true" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-dark/95 backdrop-blur-xl border-t border-white/5 px-6 py-6 space-y-4" role="menu">
          {sections.map((key) => (
            <button
              key={key}
              onClick={() => scrollTo(key)}
              role="menuitem"
              aria-label={`Aller à la section ${t.nav[key]}`}
              className="block text-sm font-medium tracking-widest uppercase text-white/70 hover:text-accent transition-colors"
            >
              {t.nav[key]}
            </button>
          ))}
        </div>
      )}
    </header>
  );
}