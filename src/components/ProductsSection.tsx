"use client";

import { useLanguage } from "@/lib/LanguageContext";
import { Brain, Globe, Crown, Gamepad2 } from "lucide-react";

const productIcons = [Brain, Globe, Crown, Gamepad2];

export function ProductsSection() {
  const { t } = useLanguage();

  return (
    <section id="products" className="min-h-screen relative z-10 flex items-center py-32">
      <div className="pointer-events-auto container mx-auto px-6">
        <p className="tag-animate text-xs tracking-[0.3em] uppercase text-accent font-medium mb-4">
          {t.products.tag}
        </p>
        <h2 className="font-display text-5xl md:text-6xl text-white mb-16 leading-[0.95]">
          {t.products.title1} <span className="text-accent italic">{t.products.title2}</span>
        </h2>

        {/* Alternating left/right feature blocks */}
        <div className="max-w-4xl space-y-16">
          {t.products.items.map((item, i) => {
            const Icon = productIcons[i];
            const isReversed = i % 2 !== 0;

            return (
              <div
                key={i}
                className={`stat-animate group flex flex-col ${isReversed ? "md:flex-row-reverse" : "md:flex-row"} items-start gap-8`}
              >
                {/* Icon circle */}
                <div className="relative flex-shrink-0">
                  <div className="w-20 h-20 rounded-full border border-white/[0.08] flex items-center justify-center group-hover:border-accent/30 transition-colors">
                    <Icon className="w-8 h-8 text-accent" />
                  </div>
                  {/* Connecting line to next item */}
                  {i < t.products.items.length - 1 && (
                    <div className="absolute top-20 left-1/2 -translate-x-1/2 w-px h-16 bg-gradient-to-b from-white/[0.06] to-transparent" />
                  )}
                </div>

                {/* Text */}
                <div className="flex-1">
                  <h3 className="font-display text-2xl text-white mb-2 group-hover:text-accent transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-block text-white/40 leading-relaxed max-w-lg">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}