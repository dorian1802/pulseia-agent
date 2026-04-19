"use client";

import { useLanguage } from "@/lib/LanguageContext";
import { Globe, Search, Share2, Video, Bot } from "lucide-react";

const icons = [Globe, Search, Share2, Video, Bot];

export function ServicesSection() {
  const { t } = useLanguage();

  return (
    <section id="services" className="min-h-screen relative z-10 flex items-center py-32">
      <div className="pointer-events-auto container mx-auto px-6">
        <p className="tag-animate text-xs tracking-[0.3em] uppercase text-accent font-medium mb-4">
          {t.services.tag}
        </p>
        <h2 className="font-display text-5xl md:text-6xl text-white mb-16 leading-[0.95]">
          {t.services.title1} <span className="text-accent italic">{t.services.title2}</span>
        </h2>

        <div className="max-w-4xl space-y-0">
          {t.services.items.map((item, i) => {
            const Icon = icons[i];
            return (
              <div
                key={i}
                className="stat-animate group flex items-start gap-6 py-8 border-t border-white/[0.06] last:border-b hover:border-accent/20 transition-colors"
              >
                <div className="w-12 h-12 rounded-xl bg-accent/10 group-hover:bg-accent/20 flex items-center justify-center flex-shrink-0 transition-colors">
                  <Icon className="w-5 h-5 text-accent" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-display text-xl text-white mb-1 group-hover:text-accent transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-block text-sm text-white/40 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
                <div className="font-display text-3xl font-light text-white/[0.04] group-hover:text-accent/20 transition-colors flex-shrink-0">
                  {String(i + 1).padStart(2, "0")}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}