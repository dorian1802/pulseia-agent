"use client";

import { useLanguage } from "@/lib/LanguageContext";
import { Sparkles, ArrowRight, CheckCircle2 } from "lucide-react";

export function AuditSection() {
  const { t } = useLanguage();

  return (
    <section id="audit" className="min-h-screen relative z-10 flex items-center section-dark py-32">
      <div className="pointer-events-auto container mx-auto px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: info */}
          <div>
            <p className="tag-animate text-xs tracking-[0.3em] uppercase text-accent font-medium mb-4">
              {t.audit.tag}
            </p>
            <h2 className="font-display text-5xl md:text-6xl text-white mb-6 leading-[0.95]">
              {t.audit.title1} <span className="text-accent italic">{t.audit.title2}</span>
            </h2>
            <p className="text-block text-white/50 text-lg leading-relaxed mb-8">
              {t.audit.description}
            </p>
            <ul className="space-y-4">
              {t.audit.benefits.map((b) => (
                <li key={b} className="stat-animate flex items-center gap-3 text-white/70 text-sm">
                  <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0" />
                  {b}
                </li>
              ))}
            </ul>
          </div>

          {/* Right: form */}
          <div className="card-animate rounded-2xl border border-white/10 bg-white/5 p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-accent" />
              </div>
              <h3 className="font-display text-xl text-white">{t.audit.formTitle}</h3>
            </div>
            <form
              action={`https://formsubmit.co/${t.cta.email}`}
              method="POST"
              className="space-y-4"
            >
              <input type="hidden" name="_subject" value="Demande d'audit IA gratuit" />
              <input type="hidden" name="_captcha" value="false" />
              <input
                type="text"
                name="name"
                required
                placeholder={t.cta.formName}
                className="w-full px-4 py-3 rounded-lg border border-white/10 bg-white/5 text-white placeholder-white/30 focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-colors text-sm"
              />
              <input
                type="email"
                name="email"
                required
                placeholder={t.cta.formEmail}
                className="w-full px-4 py-3 rounded-lg border border-white/10 bg-white/5 text-white placeholder-white/30 focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-colors text-sm"
              />
              <input
                type="text"
                name="website"
                placeholder={t.audit.website}
                className="w-full px-4 py-3 rounded-lg border border-white/10 bg-white/5 text-white placeholder-white/30 focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-colors text-sm"
              />
              <textarea
                name="message"
                rows={3}
                placeholder={t.audit.formMessage}
                className="w-full px-4 py-3 rounded-lg border border-white/10 bg-white/5 text-white placeholder-white/30 focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-colors text-sm resize-none"
              />
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent-dark text-white rounded-lg px-8 py-3 text-sm font-semibold tracking-wider uppercase transition-colors w-full"
              >
                {t.audit.submit} <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}