"use client";

import { useLanguage } from "@/lib/LanguageContext";
import { Globe, Search, Share2, Video, Bot, Palette, ShoppingCart, Megaphone, Mail, Wrench } from "lucide-react";

const icons = [Globe, Search, Share2, Video, Bot, Palette, ShoppingCart, Megaphone, Mail, Wrench];
const cardAccents = [
  "border-violet-500/20 bg-violet-500/[0.03]",
  "border-purple-500/20 bg-purple-500/[0.03]",
  "border-fuchsia-500/20 bg-fuchsia-500/[0.03]",
  "border-indigo-500/20 bg-indigo-500/[0.03]",
  "border-violet-400/20 bg-violet-400/[0.03]",
];
const iconColors = [
  "text-violet-400",
  "text-purple-400",
  "text-fuchsia-400",
  "text-indigo-400",
  "text-violet-300",
];

export function ServicesSection() {
  const { t } = useLanguage();

  const main = t.services.items.slice(0, 5);
  const extra = t.services.items.slice(5);

  return (
    <section id="services" className="relative z-10 py-32">
      <div className="pointer-events-auto container mx-auto px-6">
        {/* Header */}
        <div className="mb-20">
          <span className="section-tag">{t.services.tag}</span>
          <h2 className="hero-title-sm">
            {t.services.title1}
            <br />
            <span className="accent">{t.services.title2}</span>
          </h2>
        </div>

        {/* Main services — bento grid: row of 2, then row of 3 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
          {main.slice(0, 2).map((item, i) => {
            const Icon = icons[i];
            return (
              <div key={i} className="reveal reveal-up">
                <div className={`rounded-sm border ${cardAccents[i]} backdrop-blur-md p-8 md:p-10 h-full group transition-all duration-500 hover:border-white/10 hover:bg-white/[0.04]`}>
                  <div className="flex items-center gap-3 mb-5">
                    <Icon className={`w-5 h-5 ${iconColors[i]}`} />
                    <span className="section-tag-sm">Solution {String(i + 1).padStart(2, "0")}</span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 leading-tight group-hover:text-[#a78bfa] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-base text-slate-400 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-16">
          {main.slice(2, 5).map((item, i) => {
            const idx = i + 2;
            const Icon = icons[idx];
            return (
              <div key={idx} className="reveal reveal-up">
                <div className={`rounded-sm border ${cardAccents[idx]} backdrop-blur-md p-7 h-full group transition-all duration-500 hover:border-white/10 hover:bg-white/[0.04]`}>
                  <div className="flex items-center gap-3 mb-4">
                    <Icon className={`w-4 h-4 ${iconColors[idx]}`} />
                    <span className="section-tag-sm">Solution {String(idx + 1).padStart(2, "0")}</span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3 leading-tight group-hover:text-[#a78bfa] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sm text-slate-400 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Extra services — compact pill tags */}
        <div className="reveal reveal-up">
          <p className="font-mono text-xs text-white/30 tracking-[0.25em] uppercase mb-6">
            {t.services.tag} +
          </p>
          <div className="flex flex-wrap gap-3">
            {extra.map((item, i) => {
              const Icon = icons[i + 5];
              return (
                <div
                  key={i + 5}
                  className="group inline-flex items-center gap-2.5 px-5 py-3 rounded-full border border-white/[0.06] bg-white/[0.02] backdrop-blur-md hover:border-[#a78bfa]/20 hover:bg-[#a78bfa]/[0.04] transition-all duration-300"
                >
                  <Icon className="w-3.5 h-3.5 text-white/40 group-hover:text-[#a78bfa] transition-colors" />
                  <span className="text-sm text-white/60 group-hover:text-white transition-colors font-medium">
                    {item.title}
                  </span>
                </div>
              );
            })}
          </div>
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
        .reveal-up { transform: translateY(60px); }
        .reveal-left { transform: translateX(-80px) rotate(-3deg); }
        .reveal-right { transform: translateX(80px) rotate(3deg); }
        .reveal.active {
          opacity: 1;
          transform: translateX(0) translateY(0) rotate(0);
          filter: blur(0);
        }
      `}</style>
    </section>
  );
}