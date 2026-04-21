"use client";

import { useLanguage } from "@/lib/LanguageContext";
import { Mail, MapPin, ArrowRight } from "lucide-react";

export function CTASection() {
  const { t } = useLanguage();

  return (
    <section id="contact" className="relative z-10 py-32">
      <div className="pointer-events-auto container mx-auto px-6">
        {/* Header */}
        <div className="reveal reveal-left mb-16">
          <span className="section-tag">{t.cta.tag}</span>
          <h2 className="hero-title-sm">
            {t.cta.title1}
            <br />
            <span className="accent">{t.cta.title2}</span>
          </h2>
          <p className="mt-6 text-lg text-slate-400 max-w-md leading-relaxed">
            {t.cta.description}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Contact info cards */}
          <div className="lg:col-span-4 space-y-4 reveal reveal-up">
            <div className="rounded-sm border border-white/[0.05] bg-white/[0.02] backdrop-blur-md p-6">
              <Mail className="w-4 h-4 text-[#a78bfa] mb-3" />
              <p className="font-mono text-xs text-white/40 uppercase tracking-[0.2em] mb-1">Email</p>
              <a href={`mailto:${t.cta.email}`} className="text-white/70 hover:text-[#a78bfa] transition-colors text-sm">
                {t.cta.email}
              </a>
            </div>
            <div className="rounded-sm border border-white/[0.05] bg-white/[0.02] backdrop-blur-md p-6">
              <MapPin className="w-4 h-4 text-[#a78bfa] mb-3" />
              <p className="font-mono text-xs text-white/40 uppercase tracking-[0.2em] mb-1">Location</p>
              <p className="text-white/70 text-sm">{t.cta.location}</p>
            </div>
            <div className="rounded-sm border border-white/[0.05] bg-white/[0.02] backdrop-blur-md p-6">
              <p className="font-mono text-xs text-white/40 uppercase tracking-[0.2em] mb-3">Packs</p>
              <div className="flex flex-wrap gap-2">
                {t.cta.packs.map((pack) => (
                  <span key={pack} className="font-mono text-xs bg-[#a78bfa]/10 text-[#a78bfa] px-3 py-1.5 rounded-full">
                    {pack}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Form */}
          <form
            data-cta-form
            action={`https://formsubmit.co/${t.cta.email}`}
            method="POST"
            className="lg:col-span-7 lg:col-start-6 reveal reveal-right"
          >
            <input type="hidden" name="_subject" value="Nouveau message depuis Pulseia" />
            <input type="hidden" name="_captcha" value="false" />
            <div className="space-y-4">
              <input
                type="text"
                name="name"
                required
                placeholder={t.cta.formName}
                className="w-full px-4 py-3 rounded-sm border border-white/[0.08] bg-white/[0.03] backdrop-blur-md text-white placeholder-white/30 focus:border-[#a78bfa]/40 focus:ring-1 focus:ring-[#a78bfa]/30 outline-none transition-colors text-sm"
              />
              <input
                type="email"
                name="email"
                required
                placeholder={t.cta.formEmail}
                className="w-full px-4 py-3 rounded-sm border border-white/[0.08] bg-white/[0.03] backdrop-blur-md text-white placeholder-white/30 focus:border-[#a78bfa]/40 focus:ring-1 focus:ring-[#a78bfa]/30 outline-none transition-colors text-sm"
              />
              <textarea
                name="message"
                rows={5}
                required
                placeholder={t.cta.formMessage}
                className="w-full px-4 py-3 rounded-sm border border-white/[0.08] bg-white/[0.03] backdrop-blur-md text-white placeholder-white/30 focus:border-[#a78bfa]/40 focus:ring-1 focus:ring-[#a78bfa]/30 outline-none transition-colors text-sm resize-none"
              />
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 bg-[#7c3aed] hover:bg-[#6d28d9] text-white rounded-sm px-8 py-3 text-sm font-semibold tracking-wider uppercase transition-colors w-full"
              >
                {t.cta.formSend} <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
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
      `}</style>
    </section>
  );
}