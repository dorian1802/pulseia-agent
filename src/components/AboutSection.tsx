"use client";

import { useLanguage } from "@/lib/LanguageContext";

export function AboutSection() {
  const { t } = useLanguage();

  return (
    <section id="about" className="relative z-10 py-32">
      <div className="pointer-events-auto container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 auto-rows-[minmax(0,auto)]">
          {/* Block 1 — Left column: title, spans full height */}
          <div className="md:col-span-5 md:sticky md:top-32 md:self-start reveal reveal-left">
            <span className="section-tag">{t.about.tag}</span>
            <h2 className="hero-title-lg">
              {t.about.title1}
              <br />
              <span className="accent">{t.about.title2}</span>
            </h2>
          </div>

          {/* Block 2 — Description, offset right with top margin */}
          <div className="md:col-span-5 md:col-start-7 md:mt-24 reveal reveal-right">
            <p className="text-lg md:text-xl leading-relaxed text-slate-400">
              {t.about.description}
            </p>
          </div>

          {/* Block 3 — Big stat card, wide */}
          <div className="md:col-span-5 md:col-start-7 md:mt-10 reveal reveal-up">
            <div className="rounded-sm border border-violet-500/15 bg-violet-500/[0.04] backdrop-blur-md p-10 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#7c3aed]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
              <span className="stat-value-lg">{t.about.stat1value}</span>
              <p className="font-mono text-xs text-white/40 tracking-[0.25em] uppercase mt-4">
                {t.about.stat1label}
              </p>
            </div>
          </div>

          {/* Block 4 — Small stat, pushed far right */}
          <div className="md:col-span-3 md:col-start-10 md:mt-6 reveal reveal-up">
            <div className="rounded-sm border border-white/[0.05] bg-white/[0.02] backdrop-blur-md p-7 rotate-1 hover:rotate-0 transition-transform duration-500">
              <span className="stat-value-sm">{t.about.stat2value}</span>
              <p className="font-mono text-xs text-white/40 tracking-[0.25em] uppercase mt-3">
                {t.about.stat2label}
              </p>
            </div>
          </div>

          {/* Block 5 — Wide stat bar, bottom */}
          <div className="md:col-span-6 md:col-start-6 md:mt-4 reveal reveal-up">
            <div className="rounded-sm border border-white/[0.05] bg-white/[0.02] backdrop-blur-md px-10 py-7 flex items-baseline justify-between -rotate-1 hover:rotate-0 transition-transform duration-500">
              <span className="stat-value-md">{t.about.stat3value}</span>
              <p className="font-mono text-xs text-white/40 tracking-[0.25em] uppercase">
                {t.about.stat3label}
              </p>
            </div>
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
        .hero-title-lg {
          font-size: clamp(3rem, 8vw, 6.5rem);
          font-weight: 900;
          color: #ffffff;
          line-height: 0.85;
          letter-spacing: -0.05em;
        }
        .accent {
          background: linear-gradient(135deg, #a78bfa, #7c3aed);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .stat-value-lg {
          font-family: monospace;
          font-size: 4.5rem;
          font-weight: 900;
          background: linear-gradient(135deg, #a78bfa, #7c3aed);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          line-height: 1;
        }
        .stat-value-sm {
          font-family: monospace;
          font-size: 3rem;
          font-weight: 900;
          background: linear-gradient(135deg, #a78bfa, #7c3aed);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          line-height: 1;
        }
        .stat-value-md {
          font-family: monospace;
          font-size: 2.5rem;
          font-weight: 900;
          background: linear-gradient(135deg, #a78bfa, #7c3aed);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          line-height: 1;
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