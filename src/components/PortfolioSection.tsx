"use client";

import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "@/lib/LanguageContext";
import { StarsMeteorsBg } from "./StarsMeteorsBg";

const panelAccents = [
  "accent-violet",
  "accent-purple",
  "accent-fuchsia",
  "accent-indigo",
  "accent-violet",
  "accent-purple",
  "accent-pink",
];

export function PortfolioSection() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const hTextRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const mobile = window.innerWidth < 768;

    gsap.registerPlugin(ScrollTrigger);

    // Desktop: horizontal title + horizontal panels
    if (!mobile && !prefersReducedMotion) {
      const section = sectionRef.current;
      const hText = hTextRef.current;

      // Title animation
      if (section && hText) {
        const titleCtx = gsap.context(() => {
          const scrollTween = gsap.to(hText, {
            xPercent: -100,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top top",
              end: "+=3000px",
              scrub: true,
              pin: true,
            },
          });

          const chars = hText.querySelectorAll(".h-title-char");
          chars.forEach((char) => {
            const randomY = (Math.random() - 0.5) * 400;
            const randomRot = (Math.random() - 0.5) * 40;
            gsap.from(char, {
              y: randomY,
              rotation: randomRot,
              opacity: 0,
              ease: "back.out(1.2)",
              scrollTrigger: {
                trigger: char,
                containerAnimation: scrollTween,
                start: "left 100%",
                end: "left 30%",
                scrub: 1,
              },
            });
          });
        }, section);
      }

      // Panels animation
      const wrapper = wrapperRef.current;
      const track = trackRef.current;
      if (wrapper && track) {
        const panelCtx = gsap.context(() => {
          const horizontalTween = gsap.to(track, {
            x: () => -(track.scrollWidth - window.innerWidth),
            ease: "none",
            scrollTrigger: {
              trigger: wrapper,
              start: "top top",
              end: () => `+=${track.scrollWidth - window.innerWidth}`,
              scrub: 1,
              pin: true,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
          });

          const projectPanels = track.querySelectorAll(
            ".portfolio-hpanel--project"
          );
          projectPanels.forEach((panel) => {
            const content = panel.querySelector(".panel-content");
            if (!content) return;

            gsap.fromTo(
              content,
              { opacity: 0, y: 40 },
              {
                opacity: 1,
                y: 0,
                ease: "none",
                scrollTrigger: {
                  trigger: panel,
                  start: "left 75%",
                  end: "left 40%",
                  containerAnimation: horizontalTween,
                  scrub: true,
                },
              }
            );
          });

          const ctaPanel = track.querySelector(".portfolio-hpanel--cta");
          if (ctaPanel) {
            const ctaLines = ctaPanel.querySelectorAll(".cta-mask-line");
            gsap.fromTo(
              ctaLines,
              { yPercent: 110 },
              {
                yPercent: 0,
                ease: "none",
                stagger: 0.05,
                scrollTrigger: {
                  trigger: ctaPanel,
                  start: "left 85%",
                  end: "left 35%",
                  containerAnimation: horizontalTween,
                  scrub: true,
                },
              }
            );
          }
        }, wrapper);
      }
    }
  }, []);

  const items = t.portfolio.items;

  const word1 = t.portfolio.tag.toUpperCase();
  const word2 = t.portfolio.title1.toUpperCase();
  const word3 = t.portfolio.title2.toUpperCase();

  const titleChars: { char: string; accent: boolean }[] = [];
  for (const c of word1) titleChars.push({ char: c, accent: false });
  for (let i = 0; i < 3; i++) titleChars.push({ char: " ", accent: false });
  for (const c of word2) titleChars.push({ char: c, accent: false });
  for (let i = 0; i < 3; i++) titleChars.push({ char: " ", accent: false });
  for (const c of word3) titleChars.push({ char: c, accent: true });

  // Mobile layout: vertical
  if (isMobile) {
    return (
      <section id="portfolio" className="relative z-10">
        <div className="container mx-auto px-6 pt-32 pb-16">
          <span className="section-tag">{t.portfolio.tag}</span>
          <h2 className="hero-title-sm">
            {t.portfolio.title1}
            <br />
            <span className="accent">{t.portfolio.title2}</span>
          </h2>
        </div>

        {items.map((item, i) => (
          <div
            key={i}
            className={`portfolio-panel-mobile ${panelAccents[i % panelAccents.length]}`}
          >
            {item.url && (
              <div className="absolute inset-0 z-[1] overflow-hidden">
                <iframe
                  src={item.url}
                  className="w-full h-full scale-75 origin-top-left pointer-events-none"
                  style={{ width: "133.33%", height: "133.33%" }}
                  loading="lazy"
                  tabIndex={-1}
                  aria-hidden="true"
                />
                <div className="absolute inset-0 bg-black/30" />
              </div>
            )}
            <div className="relative z-10 pointer-events-auto max-w-2xl p-6 rounded-xl bg-white/5 backdrop-blur-xl border border-white/10">
              <span className="section-tag-sm">{item.category}</span>
              <h3 className="font-display text-3xl font-bold text-white mb-4 leading-tight">
                {item.name}
              </h3>
              <p className="text-base text-slate-400 leading-relaxed">
                {item.desc}
              </p>
              {item.review && (
                <div className="mt-6 border-l-2 border-violet-500/40 pl-4">
                  <p className="text-sm text-white/80 italic leading-relaxed">
                    &ldquo;{item.review}&rdquo;
                  </p>
                  {item.author && (
                    <p className="mt-2 text-xs font-mono text-violet-400 tracking-wider uppercase">
                      — {item.author}
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}

        <div className="container mx-auto px-6 py-20 text-center">
          <h3 className="font-display text-2xl font-bold text-white mb-4">
            {t.portfolio.ctaTitle}
          </h3>
          <p className="text-sm text-slate-400 mb-6">
            {t.portfolio.ctaDesc}
          </p>
          <button
            onClick={() =>
              document
                .getElementById("contact")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#a78bfa] text-white font-semibold rounded-sm hover:bg-[#8b5cf6] transition-colors text-sm"
          >
            {t.portfolio.ctaButton}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
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
      </section>
    );
  }

  // Desktop layout: horizontal scroll
  return (
    <>
      {/* Horizontal scrolling title — pinned section */}
      <section
        ref={sectionRef}
        className="portfolio-h-title-section"
        style={{ position: "relative", zIndex: 10 }}
      >
        <StarsMeteorsBg />
        <div ref={hTextRef} className="portfolio-h-title-text">
          {titleChars.map((item, i) => (
            <span
              key={i}
              className={`h-title-char${item.char === " " ? " h-title-space" : ""}${item.accent ? " h-title-accent" : ""}`}
            >
              {item.char === " " ? " " : item.char}
            </span>
          ))}
        </div>
      </section>

      {/* Portfolio panels — horizontal scroll */}
      <section id="portfolio" className="relative z-10">
        <div
          ref={wrapperRef}
          className="portfolio-horizontal-wrapper"
        >
          <div ref={trackRef} className="portfolio-horizontal-track">
            {items.map((item, i) => (
              <div
                key={i}
                className={`portfolio-hpanel portfolio-hpanel--project ${panelAccents[i % panelAccents.length]}`}
              >
                {item.url && (
                  <div className="absolute inset-0 z-[1] overflow-hidden">
                    <iframe
                      src={item.url}
                      className="w-full h-full scale-75 origin-top-left pointer-events-none"
                      style={{ width: "133.33%", height: "133.33%" }}
                      loading="lazy"
                      tabIndex={-1}
                      aria-hidden="true"
                    />
                    <div className="absolute inset-0 bg-black/30" />
                  </div>
                )}
                <div
                  className={`panel-content pointer-events-auto max-w-2xl p-8 rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 ${i === 1 ? "text-right ml-auto mr-6" : "text-left ml-6"}`}
                >
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
            ))}

            {/* CTA Panel */}
            <div className="portfolio-hpanel portfolio-hpanel--cta justify-center items-center">
              <div className="portfolio-cta-content text-center max-w-xl px-8">
                <div className="cta-mask-line">
                  <h3 className="font-display text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
                    {t.portfolio.ctaTitle}
                  </h3>
                </div>
                <div className="cta-mask-line">
                  <p className="text-base text-slate-400 mb-8">
                    {t.portfolio.ctaDesc}
                  </p>
                </div>
                <div className="cta-mask-line">
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
            </div>
          </div>
        </div>
      </section>
    </>
  );
}