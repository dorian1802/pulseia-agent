"use client";

import { useLanguage } from "@/lib/LanguageContext";
import { ArrowDown } from "lucide-react";

export function HeroSection() {
  const { t } = useLanguage();

  return (
    <section className="min-h-screen relative z-10 flex items-center justify-center section-dark">
      <div className="pointer-events-auto w-full max-w-6xl mx-auto px-6 pt-20">
        <div className="reveal reveal-left">
          <span className="section-tag">
            {t.hero.tagline1 === "L'IA qui travaille" ? "Automatisation Intelligente" : "Intelligent Automation"}
          </span>
          <h1 className="hero-title">
            {t.hero.tagline1}
            <br />
            <span className="accent">{t.hero.tagline2}</span>
          </h1>
        </div>
        <div className="reveal reveal-right mt-12 self-end max-w-lg ml-auto">
          <p className="text-lg md:text-xl leading-relaxed text-slate-400">
            {t.hero.subtitle}
          </p>
        </div>
      </div>
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <button
          onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
          className="pointer-events-auto"
          aria-label="Descendre"
        >
          <ArrowDown className="w-5 h-5 text-accent/60 animate-bounce" aria-hidden="true" />
        </button>
      </div>

      <style jsx>{`
        .section-tag {
          font-family: monospace;
          color: #38bdf8;
          text-transform: uppercase;
          letter-spacing: 0.3em;
          font-size: 0.75rem;
          margin-bottom: 1.5rem;
          display: block;
        }
        .hero-title {
          font-size: clamp(3.5rem, 12vw, 8rem);
          font-weight: 900;
          color: #ffffff;
          line-height: 0.85;
          letter-spacing: -0.06em;
        }
        .accent {
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