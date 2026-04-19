"use client";

import { useLanguage } from "@/lib/LanguageContext";
import { Globe, Search, Share2, Video, Bot } from "lucide-react";

const icons = [Globe, Search, Share2, Video, Bot];

export function ServicesSection() {
  const { t } = useLanguage();

  return (
    <section id="services" className="min-h-screen relative z-10 flex items-center py-32">
      <div className="pointer-events-auto container mx-auto px-6 text-center">
        <p className="tag-animate text-xs tracking-[0.3em] uppercase text-accent font-medium mb-4">
          {t.services.tag}
        </p>
        <h2 className="font-display text-5xl md:text-6xl text-white mb-16 leading-[0.95]">
          {t.services.title1} <span className="text-accent italic">{t.services.title2}</span>
        </h2>

        {/* Bento grid — first item spans 2 cols */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
          {t.services.items.map((item, i) => {
            const Icon = icons[i];
            const isFirst = i === 0;
            const isLast = i === t.services.items.length - 1;
            return (
              <div
                key={i}
                className={`stat-animate group relative overflow-hidden rounded-2xl border border-white/[0.06] p-8 transition-all duration-500 hover:border-accent/30 text-left ${
                  isFirst ? "md:col-span-2 lg:col-span-2" : ""
                } ${isLast ? "lg:col-span-1 md:col-span-1" : ""}`}
              >
                {/* Background glow on hover */}
                <div className="absolute inset-0 bg-accent/[0.03] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className={`relative ${isFirst ? "flex items-start gap-8" : ""}`}>
                  <div className={`${isFirst ? "w-16 h-16 rounded-2xl" : "w-12 h-12 rounded-xl"} bg-accent/10 group-hover:bg-accent/20 flex items-center justify-center flex-shrink-0 transition-colors`}>
                    <Icon className={`${isFirst ? "w-7 h-7" : "w-5 h-5"} text-accent`} />
                  </div>
                  <div className={isFirst ? "flex-1" : ""}>
                    <h3 className={`font-display ${isFirst ? "text-2xl" : "text-lg"} text-white mb-2 group-hover:text-accent transition-colors`}>
                      {item.title}
                    </h3>
                    <p className={`text-sm text-white/60 leading-relaxed ${isFirst ? "max-w-md" : ""}`}>
                      {item.desc}
                    </p>
                  </div>
                </div>

                {/* Number watermark */}
                <div className="absolute bottom-3 right-4 font-display text-6xl font-light text-white/[0.03] group-hover:text-accent/[0.06] transition-colors select-none">
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