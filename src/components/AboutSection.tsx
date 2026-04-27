"use client";

import { useLanguage } from "@/lib/LanguageContext";

export function AboutSection() {
  const { t } = useLanguage();

  return (
    <section id="about" className="relative z-10 py-32">
      <div className="pointer-events-auto container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 auto-rows-[minmax(0,auto)]">
          {/* Left column: title */}
          <div className="md:col-span-5 md:sticky md:top-32 md:self-start reveal reveal-left">
            <span className="section-tag">{t.about.tag}</span>
            <h2 className="hero-title-lg">
              {t.about.title1}
              <br />
              <span className="accent">{t.about.title2}</span>
            </h2>
          </div>

          {/* Right column: mission text */}
          <div className="md:col-span-6 md:col-start-7 md:mt-12 reveal reveal-right">
            <p className="text-lg md:text-xl leading-relaxed text-slate-300 mb-8">
              {t.about.description}
            </p>
            <div className="space-y-4">
              {t.about.points.map((point: string, i: number) => (
                <div key={i} className="flex items-start gap-4 reveal reveal-up" style={{ transitionDelay: `${i * 150}ms` }}>
                  <span className="mt-1.5 h-2 w-2 rounded-full bg-violet-500 shrink-0" />
                  <p className="text-base md:text-lg text-slate-400 leading-relaxed">{point}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}