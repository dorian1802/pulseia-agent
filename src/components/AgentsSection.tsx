"use client";

import { useLanguage } from "@/lib/LanguageContext";

export function AgentsSection() {
  const { t } = useLanguage();

  return (
    <section id="agents" className="min-h-screen relative z-10 flex items-center py-32">
      <div className="pointer-events-auto container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-16">
          {/* Left: title + CEO */}
          <div className="lg:w-1/3">
            <p className="tag-animate text-xs tracking-[0.3em] uppercase text-accent font-medium mb-4">
              {t.agents.tag}
            </p>
            <h2 className="font-display text-5xl md:text-6xl text-white mb-3 leading-[0.95]">
              {t.agents.title1} <span className="text-accent italic">{t.agents.title2}</span>
            </h2>
            <p className="text-block text-white/40 text-sm">{t.agents.ceo}</p>

            {/* Total count */}
            <div className="stat-animate mt-12">
              <span className="font-display text-7xl font-bold bg-gradient-to-b from-accent to-accent/30 bg-clip-text text-transparent">
                {t.agents.poles.reduce((acc, p) => acc + p.members.length, 0)}
              </span>
              <p className="text-xs text-white/30 tracking-widest uppercase mt-2">Agents actifs</p>
            </div>
          </div>

          {/* Right: horizontal scroll poles */}
          <div className="lg:w-2/3">
            <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide">
              {t.agents.poles.map((pole, pi) => (
                <div
                  key={pole.name}
                  className="stat-animate snap-start flex-shrink-0 w-56 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 hover:border-accent/20 transition-colors"
                >
                  {/* Pole color accent bar */}
                  <div className="w-8 h-1 rounded-full bg-accent mb-5" />

                  <h3 className="font-display text-sm tracking-[0.15em] uppercase text-accent mb-5">
                    {pole.name}
                  </h3>
                  <ul className="space-y-3">
                    {pole.members.map((member) => (
                      <li key={member} className="text-sm text-white/60 hover:text-white transition-colors cursor-default">
                        {member}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}