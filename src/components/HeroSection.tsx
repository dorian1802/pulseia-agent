"use client";

import { useLanguage } from "@/lib/LanguageContext";
import { ArrowDown } from "lucide-react";

export function HeroSection() {
  const { t } = useLanguage();

  return (
    <section className="min-h-screen relative z-10 flex items-center justify-center section-dark">
      <div className="pointer-events-auto text-center max-w-4xl mx-auto px-6 pt-20">
        <p className="tag-animate text-xs tracking-[0.5em] uppercase text-accent font-medium mb-8">
          Pulseia
        </p>
        <h1 className="font-display text-6xl md:text-8xl lg:text-9xl font-light text-white leading-[0.9] mb-6">
          {t.hero.tagline1}
          <br />
          <span className="font-bold bg-gradient-to-r from-accent to-blue-400 bg-clip-text text-transparent">
            {t.hero.tagline2}
          </span>
        </h1>
        <p className="text-block text-white/50 text-lg md:text-xl max-w-xl mx-auto">
          {t.hero.subtitle}
        </p>
      </div>
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <a href="#about" className="pointer-events-auto">
          <ArrowDown className="w-5 h-5 text-accent/40 animate-bounce" />
        </a>
      </div>
    </section>
  );
}