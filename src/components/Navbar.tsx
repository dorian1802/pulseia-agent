"use client";

import { useLanguage } from "@/lib/LanguageContext";
import { localeNames, type Locale } from "@/lib/i18n";
import { Languages, Menu, X, ChevronDown } from "lucide-react";
import { useState, useCallback, useRef, useEffect } from "react";
import Lenis from "lenis";

const sections = ["about", "services", "agents", "portfolio", "products", "audit", "contact"] as const;

const allLocales: Locale[] = ["fr", "en", "nl", "es", "de", "ma", "pt", "it", "tr", "zh", "ja", "ko", "ru", "hi", "ar"];

export function Navbar() {
  const { locale, t, setLocale } = useLanguage();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    if (!langOpen) return;
    const handleClick = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
    };
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [langOpen]);

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

          {/* Language dropdown */}
          <div ref={langRef} className="relative">
            <button
              onClick={() => setLangOpen(!langOpen)}
              aria-label="Changer la langue"
              aria-expanded={langOpen}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium tracking-wider uppercase text-accent hover:bg-accent/10 transition-colors"
            >
              <Languages className="w-3.5 h-3.5" aria-hidden="true" />
              {localeNames[locale]}
              <ChevronDown className={`w-3 h-3 transition-transform ${langOpen ? "rotate-180" : ""}`} aria-hidden="true" />
            </button>

            {langOpen && (
              <div className="absolute right-0 top-full mt-2 w-44 max-h-72 overflow-y-auto rounded-xl border border-white/10 bg-dark backdrop-blur-xl py-1 z-50 shadow-2xl" role="menu">
                {allLocales.map((loc) => (
                  <button
                    key={loc}
                    onMouseDown={(e) => e.stopPropagation()}
                    onClick={() => { setLocale(loc); setLangOpen(false); }}
                    role="menuitem"
                    className={`block w-full text-left px-4 py-2.5 text-sm transition-colors ${
                      loc === locale ? "text-accent bg-accent/10" : "text-white/60 hover:text-white hover:bg-white/5"
                    }`}
                    dir={loc === "ar" ? "rtl" : "ltr"}
                  >
                    {localeNames[loc]}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="md:hidden flex items-center gap-3">
          <div ref={langRef} className="relative">
            <button
              onClick={() => setLangOpen(!langOpen)}
              aria-label="Changer la langue"
              className="flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium text-accent hover:bg-accent/10 transition-colors"
            >
              <Languages className="w-3.5 h-3.5" aria-hidden="true" />
              {locale.toUpperCase()}
            </button>
            {langOpen && (
              <div className="absolute right-0 top-full mt-2 w-40 max-h-56 overflow-y-auto rounded-xl border border-white/10 bg-dark backdrop-blur-xl py-1 z-50 shadow-2xl" role="menu">
                {allLocales.map((loc) => (
                  <button
                    key={loc}
                    onMouseDown={(e) => e.stopPropagation()}
                    onClick={() => { setLocale(loc); setLangOpen(false); }}
                    role="menuitem"
                    className={`block w-full text-left px-3 py-2 text-xs transition-colors ${
                      loc === locale ? "text-accent bg-accent/10" : "text-white/60 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    {localeNames[loc]}
                  </button>
                ))}
              </div>
            )}
          </div>
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