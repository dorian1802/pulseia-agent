"use client";

import { useLanguage } from "@/lib/LanguageContext";
import { ArrowUpRight } from "lucide-react";

export function PortfolioSection() {
  const { t } = useLanguage();

  return (
    <section id="portfolio" className="min-h-screen relative z-10 flex items-center py-32">
      <div className="pointer-events-auto container mx-auto px-6">
        <p className="tag-animate text-xs tracking-[0.3em] uppercase text-accent font-medium mb-4">
          {t.portfolio.tag}
        </p>
        <h2 className="font-display text-5xl md:text-6xl text-white mb-16 leading-[0.95]">
          {t.portfolio.title1} <span className="text-accent italic">{t.portfolio.title2}</span>
        </h2>

        <div className="max-w-4xl">
          {t.portfolio.items.map((item, i) => (
            <div
              key={i}
              className="stat-animate group flex items-center gap-6 py-6 border-t border-white/[0.06] last:border-b hover:border-accent/20 transition-colors cursor-default"
            >
              <span className="font-display text-xs tracking-widest uppercase text-accent/50 w-24 flex-shrink-0">
                {item.category}
              </span>
              <div className="flex-1 min-w-0">
                <h3 className="font-display text-lg text-white group-hover:text-accent transition-colors">
                  {item.name}
                </h3>
                <p className="text-block text-sm text-white/30 leading-relaxed">{item.desc}</p>
              </div>
              <ArrowUpRight className="w-4 h-4 text-white/0 group-hover:text-accent transition-all flex-shrink-0" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}