"use client";

import { useLanguage } from "@/lib/LanguageContext";
import { Brain, Globe, Crown, Gamepad2 } from "lucide-react";

const productIcons = [Brain, Globe, Crown, Gamepad2];

export function ProductsSection() {
  const { t } = useLanguage();

  return (
    <section id="products" className="min-h-screen relative z-10 flex items-center section-light py-32">
      <div className="pointer-events-auto container mx-auto px-6">
        <div className="max-w-2xl ml-auto">
          <p className="tag-animate text-xs tracking-[0.3em] uppercase text-accent font-medium mb-4">
            {t.products.tag}
          </p>
          <h2 className="font-display text-5xl md:text-6xl text-white mb-12 leading-[0.95]">
            {t.products.title1} <span className="text-accent italic">{t.products.title2}</span>
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl ml-auto">
          {t.products.items.map((item, i) => {
            const Icon = productIcons[i];
            return (
              <div key={i} className="card-animate rounded-xl border border-white/10 bg-white/5 p-8 hover:shadow-lg transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-5">
                  <Icon className="w-6 h-6 text-accent" />
                </div>
                <h3 className="font-display text-xl text-white mb-2">{item.title}</h3>
                <p className="text-block text-sm text-white/50 leading-relaxed">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}