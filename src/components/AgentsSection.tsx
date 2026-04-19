"use client";

import { useLanguage } from "@/lib/LanguageContext";

export function AgentsSection() {
  const { t } = useLanguage();

  return (
    <section id="agents" className="min-h-screen relative z-10 flex items-center py-32">
      <div className="pointer-events-auto container mx-auto px-6">
        <p className="tag-animate text-xs tracking-[0.3em] uppercase text-accent font-medium mb-4">
          {t.agents.tag}
        </p>
        <h2 className="font-display text-5xl md:text-6xl text-white mb-3 leading-[0.95]">
          {t.agents.title1} <span className="text-accent italic">{t.agents.title2}</span>
        </h2>
        <p className="text-block text-white/40 text-sm mb-16">{t.agents.ceo}</p>

        <div className="max-w-5xl space-y-12">
          {t.agents.poles.map((pole, pi) => (
            <div key={pole.name} className="stat-animate">
              <div className="flex items-center gap-4 mb-5">
                <span className="font-display text-xs tracking-[0.2em] uppercase text-accent font-semibold">
                  {pole.name}
                </span>
                <div className="flex-1 h-px bg-white/[0.06]" />
                <span className="text-xs text-white/20">{pole.members.length}</span>
              </div>
              <div className="flex flex-wrap gap-x-8 gap-y-3">
                {pole.members.map((member) => (
                  <span
                    key={member}
                    className="text-sm text-white/60 hover:text-white transition-colors cursor-default"
                  >
                    {member}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}