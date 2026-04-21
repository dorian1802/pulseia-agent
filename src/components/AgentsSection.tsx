"use client";

import { useLanguage } from "@/lib/LanguageContext";

export function AgentsSection() {
  const { t } = useLanguage();

  const allAgents = t.agents.poles.flatMap((pole) =>
    pole.members.map((member) => ({ name: member, pole: pole.name }))
  );

  const row1 = allAgents.slice(0, Math.ceil(allAgents.length / 2));
  const row2 = allAgents.slice(Math.ceil(allAgents.length / 2));

  return (
    <section id="agents" className="relative z-10 py-32 overflow-hidden">
      <div className="pointer-events-auto container mx-auto px-6">
        {/* Header */}
        <div className="reveal reveal-left mb-16">
          <span className="section-tag">{t.agents.tag}</span>
          <h2 className="hero-title-sm">
            {t.agents.title1}
            <br />
            <span className="accent">{t.agents.title2}</span>
          </h2>
          <p className="mt-6 text-slate-400 text-lg max-w-md">{t.agents.ceo}</p>
        </div>

        {/* Count badge */}
        <div className="reveal reveal-up mb-20">
          <span className="font-mono text-6xl font-bold bg-gradient-to-b from-[#a78bfa] to-[#7c3aed]/30 bg-clip-text text-transparent">
            {t.agents.poles.reduce((acc, p) => acc + p.members.length, 0)}
          </span>
          <p className="font-mono text-xs text-white/40 tracking-[0.3em] uppercase mt-2">
            Agents actifs
          </p>
        </div>
      </div>

      {/* Marquee rows */}
      <div className="relative">
        {/* Row 1 — scrolls left */}
        <div className="marquee-track marquee-left mb-4">
          <div className="marquee-inner">
            {[...row1, ...row1, ...row1].map((agent, i) => (
              <div key={`r1-${i}`} className="marquee-pill">
                <span className="dot" />
                <span className="font-mono text-xs tracking-wider uppercase text-white/70">
                  {agent.name}
                </span>
                <span className="font-mono text-[0.65rem] text-white/25 tracking-wider">
                  {agent.pole}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Row 2 — scrolls right */}
        <div className="marquee-track marquee-right">
          <div className="marquee-inner">
            {[...row2, ...row2, ...row2].map((agent, i) => (
              <div key={`r2-${i}`} className="marquee-pill">
                <span className="dot" />
                <span className="font-mono text-xs tracking-wider uppercase text-white/70">
                  {agent.name}
                </span>
                <span className="font-mono text-[0.65rem] text-white/25 tracking-wider">
                  {agent.pole}
                </span>
              </div>
            ))}
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

        .marquee-track {
          width: 100%;
          overflow: hidden;
          -webkit-mask-image: linear-gradient(to right, transparent, black 8%, black 92%, transparent);
          mask-image: linear-gradient(to right, transparent, black 8%, black 92%, transparent);
        }
        .marquee-inner {
          display: flex;
          gap: 0.75rem;
          width: max-content;
        }
        .marquee-left .marquee-inner {
          animation: scroll-left 60s linear infinite;
        }
        .marquee-right .marquee-inner {
          animation: scroll-right 50s linear infinite;
        }

        .marquee-pill {
          display: flex;
          align-items: center;
          gap: 0.625rem;
          padding: 0.625rem 1.25rem;
          border-radius: 9999px;
          border: 1px solid rgba(167, 139, 250, 0.1);
          background: rgba(167, 139, 250, 0.03);
          backdrop-filter: blur(8px);
          white-space: nowrap;
          transform: rotate(-1deg);
          transition: border-color 0.3s, background 0.3s;
        }
        .marquee-pill:nth-child(even) {
          transform: rotate(1deg);
        }
        .marquee-pill:hover {
          border-color: rgba(167, 139, 250, 0.3);
          background: rgba(167, 139, 250, 0.08);
        }

        .dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #a78bfa;
          box-shadow: 0 0 8px rgba(167, 139, 250, 0.6), 0 0 20px rgba(124, 58, 237, 0.3);
          flex-shrink: 0;
        }

        @keyframes scroll-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
        @keyframes scroll-right {
          0% { transform: translateX(-33.333%); }
          100% { transform: translateX(0); }
        }
      `}</style>
    </section>
  );
}