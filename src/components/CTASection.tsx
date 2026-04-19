"use client";

import { useLanguage } from "@/lib/LanguageContext";
import { Mail, MapPin, ArrowRight } from "lucide-react";

export function CTASection() {
  const { t } = useLanguage();

  return (
    <section id="contact" className="min-h-screen relative z-10 flex items-center section-dark py-32">
      <div className="pointer-events-auto container mx-auto px-6">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-xs tracking-[0.3em] uppercase text-accent font-medium mb-4">
            {t.cta.tag}
          </p>
          <h2 className="font-display text-5xl md:text-6xl text-white mb-6 leading-[0.95]">
            {t.cta.title1} <span className="text-accent italic">{t.cta.title2}</span>
          </h2>
          <p className="text-white/50 max-w-xl mx-auto mb-12 leading-relaxed">
            {t.cta.description}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-4xl mx-auto">
          {/* Contact info */}
          <div className="space-y-6">
            <div className="flex items-center gap-4 p-4 rounded-xl border border-white/10 bg-white/5">
              <Mail className="w-5 h-5 text-accent" />
              <div>
                <p className="text-xs text-white/30 uppercase tracking-wider">Email</p>
                <a href={`mailto:${t.cta.email}`} className="text-white/70 hover:text-accent transition-colors text-sm">
                  {t.cta.email}
                </a>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 rounded-xl border border-white/10 bg-white/5">
              <MapPin className="w-5 h-5 text-accent" />
              <div>
                <p className="text-xs text-white/30 uppercase tracking-wider">Location</p>
                <p className="text-white/70 text-sm">{t.cta.location}</p>
              </div>
            </div>
            <div className="p-4 rounded-xl border border-white/10 bg-white/5">
              <p className="text-xs text-white/30 uppercase tracking-wider mb-3">Packs</p>
              <div className="flex flex-wrap gap-2">
                {t.cta.packs.map((pack) => (
                  <span key={pack} className="text-xs bg-accent/10 text-accent px-3 py-1.5 rounded-full">
                    {pack}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Form */}
          <form
            action={`https://formsubmit.co/${t.cta.email}`}
            method="POST"
            className="space-y-4"
          >
            <input type="hidden" name="_subject" value="Nouveau message depuis Pulseia" />
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
            <textarea
              name="message"
              rows={4}
              required
              placeholder={t.cta.formMessage}
              className="w-full px-4 py-3 rounded-lg border border-white/10 bg-white/5 text-white placeholder-white/30 focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-colors text-sm resize-none"
            />
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent-dark text-white rounded-lg px-8 py-3 text-sm font-semibold tracking-wider uppercase transition-colors w-full"
            >
              {t.cta.formSend} <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}