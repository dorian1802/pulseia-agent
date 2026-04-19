"use client";

import { useLanguage } from "@/lib/LanguageContext";
import { Brain, Globe, Crown, Gamepad2, ArrowRight } from "lucide-react";

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

        <div className="max-w-4xl space-y-0">
          {t.products.items.map((item, i) => {
            const Icon = productIcons[i];
            return (
              <div
                key={i}
                className="stat-animate group flex items-start gap-6 py-8 border-t border-white/[0.06] last:border-b hover:border-accent/20 transition-colors"
              >
                <div className="w-12 h-12 rounded-xl bg-accent/10 group-hover:bg-accent/20 flex items-center justify-center flex-shrink-0 transition-colors">
                  <Icon className="w-6 h-6 text-accent" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-display text-xl text-white mb-1 group-hover:text-accent transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-block text-sm text-white/40 leading-relaxed">{item.desc}</p>
                </div>
                <ArrowRight className="w-4 h-4 text-white/0 group-hover:text-accent transition-all flex-shrink-0 mt-2" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}