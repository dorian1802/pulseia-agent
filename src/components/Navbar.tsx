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

    // Use Lenis smooth scroll if available
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
      <nav className="container mx-auto px-6 flex items-center justify-between">
        <a
          href="#"
          onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
          className="font-display text-2xl font-bold tracking-widest text-white"
        >
          PULSE<span className="text-accent">IA</span>
        </a>

        <div className="hidden md:flex items-center gap-6">
          {sections.map((key) => (
            <button
              key={key}
              onClick={() => scrollTo(key)}
              className="text-xs font-medium tracking-widest uppercase text-white/50 hover:text-accent transition-colors"
            >
              {t.nav[key]}
            </button>
          ))}
          <button
            onClick={() => setLocale(locale === "fr" ? "en" : "fr")}
            className="flex items-center gap-1 text-xs font-medium tracking-wider uppercase text-accent hover:text-accent-light transition-colors"
          >
            <Languages className="w-3.5 h-3.5" />
            {locale.toUpperCase()}
          </button>
        </div>

        <div className="md:hidden flex items-center gap-3">
          <button
            onClick={() => setLocale(locale === "fr" ? "en" : "fr")}
            className="text-xs font-medium text-accent"
          >
            {locale.toUpperCase()}
          </button>
          <button onClick={() => setMobileOpen(!mobileOpen)} className="text-white/50">
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-dark/95 backdrop-blur-xl border-t border-white/5 px-6 py-6 space-y-4">
          {sections.map((key) => (
            <button
              key={key}
              onClick={() => scrollTo(key)}
              className="block text-sm font-medium tracking-widest uppercase text-white/50 hover:text-accent transition-colors"
            >
              {t.nav[key]}
            </button>
          ))}
        </div>
      )}
    </header>
  );
}