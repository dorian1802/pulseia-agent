"use client";

import { useLanguage } from "@/lib/LanguageContext";

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

        {/* Masonry-style: alternating large/small */}
        <div className="max-w-5xl grid grid-cols-1 md:grid-cols-12 gap-4">
          {t.portfolio.items.map((item, i) => {
            // Vary sizes: 0,3 = large (7 cols), 1,4,6 = medium (5 cols), 2,5 = wide
            const isLarge = i === 0 || i === 3;
            const isWide = i === 2 || i === 5;
            const colSpan = isLarge ? "md:col-span-7" : isWide ? "md:col-span-12" : "md:col-span-5";

            return (
              <div
                key={i}
                className={`stat-animate group ${colSpan} rounded-2xl border border-white/[0.06] overflow-hidden hover:border-accent/20 transition-all duration-500`}
              >
                {/* Colored top bar */}
                <div className="h-px w-full bg-gradient-to-r from-accent/40 via-accent/10 to-transparent" />

                <div className="p-8 bg-white/[0.03] group-hover:bg-white/[0.06] transition-colors">
                  <span className="text-xs tracking-[0.2em] uppercase text-accent/70">
                    {item.category}
                  </span>
                  <h3 className={`font-display ${isLarge ? "text-3xl" : "text-xl"} text-white mt-3 mb-3 group-hover:text-accent transition-colors`}>
                    {item.name}
                  </h3>
                  <p className="text-block text-sm text-white/60 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}