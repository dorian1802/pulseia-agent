"use client";

import { useLanguage } from "@/lib/LanguageContext";
import { Globe, Languages } from "lucide-react";

const sections = ["about", "services", "agents", "portfolio", "products", "audit", "contact"] as const;

export function Navbar() {
  const { locale, t, setLocale } = useLanguage();

  return (
    <header className="fixed top-0 left-0 right-0 z-40 transition-all duration-500 bg-dark/80 backdrop-blur-md py-4">
      <nav className="container mx-auto px-6 flex items-center justify-between">
        <a href="#" className="font-display text-2xl font-bold tracking-widest text-white">
          PULSE<span className="text-accent">IA</span>
        </a>

        <div className="hidden md:flex items-center gap-6">
          {sections.map((key) => (
            <a
              key={key}
              href={`#${key}`}
              className="text-xs font-medium tracking-widest uppercase text-white/50 hover:text-accent transition-colors"
            >
              {t.nav[key]}
            </a>
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
          <a href="#about" className="text-white/50 text-xs">
            <Globe className="w-5 h-5" />
          </a>
        </div>
      </nav>
    </header>
  );
}