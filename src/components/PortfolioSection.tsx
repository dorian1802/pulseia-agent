"use client";

import { useLanguage } from "@/lib/LanguageContext";
import { ArrowUpRight } from "lucide-react";

export function PortfolioSection() {
  const { t } = useLanguage();

  return (
    <section id="portfolio" className="min-h-screen relative z-10 flex items-center section-dark py-32">
      <div className="pointer-events-auto container mx-auto px-6">
        <div className="max-w-2xl">
          <p className="tag-animate text-xs tracking-[0.3em] uppercase text-accent font-medium mb-4">
            {t.portfolio.tag}
          </p>
          <h2 className="font-display text-5xl md:text-6xl text-white mb-12 leading-[0.95]">
            {t.portfolio.title1} <span className="text-accent italic">{t.portfolio.title2}</span>
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl">
          {t.portfolio.items.map((item, i) => (
            <div
              key={i}
              className="card-animate group rounded-xl border border-white/10 bg-white/5 p-6 hover:border-accent/30 hover:bg-white/10 transition-all duration-300"
            >
              <span className="tag-animate text-xs tracking-wider uppercase text-accent/60 mb-3 block">
                {item.category}
              </span>
              <h3 className="font-display text-lg text-white mb-2 group-hover:text-accent transition-colors">
                {item.name}
              </h3>
              <p className="text-block text-sm text-white/40 leading-relaxed">{item.desc}</p>
              <ArrowUpRight className="w-4 h-4 text-accent/0 group-hover:text-accent transition-all mt-3" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}