"use client";

import { useLanguage } from "@/lib/LanguageContext";

export function AboutSection() {
  const { t } = useLanguage();

  return (
    <section id="about" className="min-h-screen relative z-10 flex items-center section-light py-32">
      <div className="pointer-events-auto container mx-auto px-6 text-center">
        <div className="max-w-2xl mx-auto">
          <p className="tag-animate text-xs tracking-[0.3em] uppercase text-accent font-medium mb-4">
            {t.about.tag}
          </p>
          <h2 className="font-display text-5xl md:text-6xl text-white mb-6 leading-[0.95]">
            {t.about.title1} <span className="text-accent italic">{t.about.title2}</span>
          </h2>
          <p className="text-block text-white/50 text-base md:text-lg leading-relaxed mb-12">
            {t.about.description}
          </p>
          <div className="flex gap-12 justify-center">
            <div className="stat-animate">
              <p className="font-display text-4xl text-accent font-bold">{t.about.stat1value}</p>
              <p className="text-sm text-white/50 mt-1">{t.about.stat1label}</p>
            </div>
            <div className="stat-animate">
              <p className="font-display text-4xl text-accent font-bold">{t.about.stat2value}</p>
              <p className="text-sm text-white/50 mt-1">{t.about.stat2label}</p>
            </div>
            <div className="stat-animate">
              <p className="font-display text-4xl text-accent font-bold">{t.about.stat3value}</p>
              <p className="text-sm text-white/50 mt-1">{t.about.stat3label}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}