"use client";

import { useLanguage } from "@/lib/LanguageContext";
import { Brain, Globe, Crown, Gamepad2 } from "lucide-react";

const productIcons = [Brain, Globe, Crown, Gamepad2];
const cardAccents = [
  "border-violet-500/20 bg-violet-500/[0.03]",
  "border-purple-500/20 bg-purple-500/[0.03]",
  "border-fuchsia-500/20 bg-fuchsia-500/[0.03]",
  "border-indigo-500/20 bg-indigo-500/[0.03]",
];
const iconAccents = ["text-violet-400", "text-purple-400", "text-fuchsia-400", "text-indigo-400"];

export function ProductsSection() {
  const { t } = useLanguage();

  return (
    <section id="products" className="relative z-10 py-32">
      <div className="pointer-events-auto container mx-auto px-6">
        {/* Header */}
        <div className="reveal reveal-left mb-20">
          <span className="section-tag">{t.products.tag}</span>
          <h2 className="hero-title-sm">
            {t.products.title1}
            <br />
            <span className="accent">{t.products.title2}</span>
          </h2>
        </div>

        {/* Destructured layout — alternating large/small cards */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {t.products.items.map((item, i) => {
            const Icon = productIcons[i];
            const isLarge = i === 0 || i === 2;
            const colSpan = isLarge ? "md:col-span-7" : "md:col-span-4";
            const offset = i === 1 ? "md:col-start-9" : i === 3 ? "md:col-start-2" : "";
            const anim = i % 2 === 0 ? "reveal-left" : "reveal-right";

            return (
              <div
                key={i}
                className={`${colSpan} ${offset} ${anim} reveal`}
              >
                <div className={`rounded-sm border ${cardAccents[i]} backdrop-blur-md p-8 h-full group transition-all duration-500 hover:border-white/10`}>
                  <div className="flex items-center gap-3 mb-6">
                    <Icon className={`w-5 h-5 ${iconAccents[i]}`} />
                    <span className="section-tag-sm">Product {String(i + 1).padStart(2, "0")}</span>
                  </div>
                  <h3 className={`${isLarge ? "text-3xl md:text-4xl" : "text-2xl"} font-bold text-white mb-4 leading-tight`}>
                    {item.title}
                  </h3>
                  <p className="text-sm text-slate-400 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style jsx>{`
        .section-tag {
          font-family: monospace;
          color: #a78bfa;
          text-transform: uppercase;
          letter-spacing: 0.3em;
          font-size: 0.75rem;
          margin-bottom: 1.5rem;
          display: block;
        }
        .section-tag-sm {
          font-family: monospace;
          color: rgba(167, 139, 250, 0.6);
          text-transform: uppercase;
          letter-spacing: 0.2em;
          font-size: 0.7rem;
          display: block;
        }
        .hero-title-sm {
          font-size: clamp(2.5rem, 6vw, 5rem);
          font-weight: 900;
          color: #ffffff;
          line-height: 0.95;
          letter-spacing: -0.04em;
        }
        .accent {
          background: linear-gradient(135deg, #a78bfa, #7c3aed);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .reveal {
          opacity: 0;
          filter: blur(15px);
          transition: all 1.4s cubic-bezier(0.16, 1, 0.3, 1);
          will-change: transform, opacity;
        }
        .reveal-left { transform: translateX(-80px) rotate(-3deg); }
        .reveal-right { transform: translateX(80px) rotate(3deg); }
        .reveal-up { transform: translateY(60px); }
        .reveal.active {
          opacity: 1;
          transform: translateX(0) translateY(0) rotate(0);
          filter: blur(0);
        }
      `}</style>
    </section>
  );
}