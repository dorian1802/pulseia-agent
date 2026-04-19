"use client";

import { useLanguage } from "@/lib/LanguageContext";

export function AgentsSection() {
  const { t } = useLanguage();

  return (
    <section id="agents" className="min-h-screen relative z-10 flex items-center section-light py-32">
      <div className="pointer-events-auto container mx-auto px-6">
        <div className="max-w-2xl ml-auto">
          <p className="tag-animate text-xs tracking-[0.3em] uppercase text-accent font-medium mb-4">
            {t.agents.tag}
          </p>
          <h2 className="font-display text-5xl md:text-6xl text-white mb-4 leading-[0.95]">
            {t.agents.title1} <span className="text-accent italic">{t.agents.title2}</span>
          </h2>
          <p className="text-block text-white/50 text-sm mb-8">{t.agents.ceo}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl ml-auto mt-8">
          {t.agents.poles.map((pole) => (
            <div key={pole.name} className="card-animate rounded-xl border border-white/10 bg-white/5 p-6">
              <h3 className="font-display text-sm tracking-widest uppercase text-accent mb-4">
                {pole.name}
              </h3>
              <ul className="space-y-2">
                {pole.members.map((member) => (
                  <li key={member} className="text-sm text-white/60 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-accent rounded-full flex-shrink-0" />
                    {member}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}