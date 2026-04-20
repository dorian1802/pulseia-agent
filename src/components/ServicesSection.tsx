"use client";

import { useLanguage } from "@/lib/LanguageContext";
import { Globe, Search, Share2, Video, Bot } from "lucide-react";

const icons = [Globe, Search, Share2, Video, Bot];
const accents = [
  "border-sky-500/20 bg-sky-500/[0.03]",
  "border-indigo-500/20 bg-indigo-500/[0.03]",
  "border-violet-500/20 bg-violet-500/[0.03]",
  "border-cyan-500/20 bg-cyan-500/[0.03]",
  "border-blue-500/20 bg-blue-500/[0.03]",
];
const accentTexts = [
  "text-sky-400",
  "text-indigo-400",
  "text-violet-400",
  "text-cyan-400",
  "text-blue-400",
];
const tags = ["01", "02", "03", "04", "05"];

export function ServicesSection() {
  const { t } = useLanguage();

  return (
    <section id="services" className="relative z-10 py-32">
      <div className="pointer-events-auto container mx-auto px-6">
        {/* Section header — reveal animation */}
        <div className="reveal reveal-up mb-20">
          <span className="section-tag">{t.services.tag}</span>
          <h2 className="hero-title-sm">
            {t.services.title1}{" "}
            <span className="accent-inline">{t.services.title2}</span>
          </h2>
        </div>

        {/* Destructured grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Solution 01 — large card, left-aligned */}
          <div className="md:col-span-7 reveal reveal-left">
            <div className="rounded-sm border border-white/[0.05] bg-white/[0.02] backdrop-blur-md p-8 md:p-10 h-full">
              <span className="section-tag">Solution {tags[0]}</span>
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
                {t.services.items[0].title}
              </h3>
              <p className="text-base text-slate-400 leading-relaxed max-w-md">
                {t.services.items[0].desc}
              </p>
            </div>
          </div>

          {/* Scalability — small accent card */}
          <div className="md:col-span-4 md:col-start-9 md:mt-16 reveal reveal-up">
            <div className={`rounded-sm border ${accents[0]} backdrop-blur-md p-6 h-full`}>
              <h4 className={`text-lg font-bold ${accentTexts[0]} mb-3`}>
                {t.services.items[1].title}
              </h4>
              <p className="text-sm text-slate-400 leading-relaxed">
                {t.services.items[1].desc}
              </p>
            </div>
          </div>

          {/* Solution 02 — offset card */}
          <div className="md:col-span-5 md:col-start-2 reveal reveal-right mt-8 md:mt-0">
            <div className={`rounded-sm border ${accents[1]} backdrop-blur-md p-8 h-full`}>
              <span className="section-tag">Solution {tags[1]}</span>
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                {t.services.items[2].title}
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                {t.services.items[2].desc}
              </p>
            </div>
          </div>

          {/* Solution 03 — right-aligned large card */}
          <div className="md:col-span-6 md:col-start-7 reveal reveal-up mt-8 md:mt-4">
            <div className={`rounded-sm border ${accents[2]} backdrop-blur-md p-8 h-full`}>
              <span className="section-tag">Solution {tags[2]}</span>
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                {t.services.items[3].title}
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                {t.services.items[3].desc}
              </p>
            </div>
          </div>

          {/* Bottom row — 2 smaller cards */}
          <div className="md:col-span-4 reveal reveal-left mt-4">
            <div className={`rounded-sm border ${accents[3]} backdrop-blur-md p-6 h-full`}>
              <h4 className={`text-lg font-bold ${accentTexts[3]} mb-3`}>
                {t.services.items[4].title}
              </h4>
              <p className="text-sm text-slate-400 leading-relaxed">
                {t.services.items[4].desc}
              </p>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .section-tag {
          font-family: monospace;
          color: #38bdf8;
          text-transform: uppercase;
          letter-spacing: 0.3em;
          font-size: 0.75rem;
          margin-bottom: 1rem;
          display: block;
        }
        .hero-title-sm {
          font-size: clamp(2.5rem, 6vw, 5rem);
          font-weight: 900;
          color: #ffffff;
          line-height: 0.95;
          letter-spacing: -0.04em;
        }
        .accent-inline {
          background: linear-gradient(135deg, #38bdf8, #818cf8);
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