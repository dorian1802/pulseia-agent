"use client";

import { useLanguage } from "@/lib/LanguageContext";
import { Globe, Search, Share2, Video, Bot } from "lucide-react";

const icons = [Globe, Search, Share2, Video, Bot];

export function ServicesSection() {
  const { t } = useLanguage();

  return (
    <section id="services" className="min-h-screen relative z-10 flex items-center section-dark py-32">
      <div className="pointer-events-auto container mx-auto px-6">
        <div className="max-w-2xl">
          <p className="text-xs tracking-[0.3em] uppercase text-accent font-medium mb-4">
            {t.services.tag}
          </p>
          <h2 className="font-display text-5xl md:text-6xl text-white mb-12 leading-[0.95]">
            {t.services.title1} <span className="text-accent italic">{t.services.title2}</span>
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl">
          {t.services.items.map((item, i) => {
            const Icon = icons[i];
            return (
              <div
                key={i}
                className="rounded-xl border border-white/10 bg-white/5 p-6 hover:border-accent/30 hover:bg-white/10 transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5 text-accent" />
                </div>
                <h3 className="font-display text-lg text-white mb-2">{item.title}</h3>
                <p className="text-sm text-white/50 leading-relaxed">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}