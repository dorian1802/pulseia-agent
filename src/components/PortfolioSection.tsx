"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "@/lib/LanguageContext";

const panelAccents = [
  "panel-violet",
  "panel-purple",
  "panel-fuchsia",
  "panel-indigo",
  "panel-violet",
  "panel-purple",
  "panel-pink",
];

export function PortfolioSection() {
  const { t } = useLanguage();
  const panelsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const panels = gsap.utils.toArray<HTMLElement>(".portfolio-panel");

      panels.forEach((panel, i) => {
        if (i === panels.length - 1) return;

        gsap.timeline({
          scrollTrigger: {
            trigger: panel,
            start: "top top",
            end: "+=100%",
            pin: true,
            pinSpacing: false,
            scrub: 0.5,
            anticipatePin: 1,
          },
        }).to(
          panel,
          {
            opacity: 0.3,
            scale: 0.95,
            ease: "none",
          },
          0
        );
      });
    }, panelsRef);

    return () => ctx.revert();
  }, []);

  const items = t.portfolio.items;

  return (
    <section id="portfolio" className="relative z-10">
      {/* Header */}
      <div className="pointer-events-auto container mx-auto px-6 pt-32 pb-16">
        <span className="section-tag">{t.portfolio.tag}</span>
        <h2 className="hero-title-sm">
          {t.portfolio.title1}
          <br />
          <span className="accent">{t.portfolio.title2}</span>
        </h2>
      </div>

      {/* Pinned panels */}
      <div ref={panelsRef} className="portfolio-panels">
        {items.map((item, i) => (
          <div
            key={i}
            className={`portfolio-panel ${panelAccents[i % panelAccents.length]}`}
            style={{ zIndex: i + 1 }}
          >
            {item.url && (
              <div className="absolute inset-0 z-[1] overflow-hidden">
                <iframe
                  src={item.url}
                  className="w-full h-full scale-75 origin-top-left pointer-events-none"
                  style={{ width: '133.33%', height: '133.33%' }}
                  loading="lazy"
                  tabIndex={-1}
                  aria-hidden="true"
                />
                <div className="absolute inset-0 bg-black/50" />
              </div>
            )}
            <div className={`panel-content pointer-events-auto container mx-auto px-6 flex items-end min-h-screen ${i === 1 ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-2xl py-20 ${i === 1 ? 'text-right' : 'text-left'} rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 p-8`}>
                <span className="section-tag-sm">{item.category}</span>
                <h3 className="font-display text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
                  {item.name}
                </h3>
                <p className="text-lg text-slate-400 leading-relaxed">
                  {item.desc}
                </p>
                {item.review && (
                  <div className="mt-8 border-l-2 border-violet-500/40 pl-6">
                    <p className="text-base md:text-lg text-white/80 italic leading-relaxed">
                      &ldquo;{item.review}&rdquo;
                    </p>
                    {item.author && (
                      <p className="mt-3 text-sm font-mono text-violet-400 tracking-wider uppercase">
                        — {item.author}
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="pointer-events-auto container mx-auto px-6 py-32">
        <div className="rounded-sm border border-white/10 bg-white/[0.02] backdrop-blur-md p-10 md:p-14 text-center">
          <h3 className="font-display text-2xl md:text-3xl font-bold text-white mb-4">
            {t.portfolio.ctaTitle}
          </h3>
          <p className="text-base text-slate-400 max-w-2xl mx-auto mb-8">
            {t.portfolio.ctaDesc}
          </p>
          <button
            onClick={() =>
              document
                .getElementById("contact")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#a78bfa] text-white font-semibold rounded-sm hover:bg-[#8b5cf6] transition-colors"
          >
            {t.portfolio.ctaButton}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}