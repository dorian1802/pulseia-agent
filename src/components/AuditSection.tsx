"use client";

import { useLanguage } from "@/lib/LanguageContext";
import { Sparkles, ArrowRight, CheckCircle2 } from "lucide-react";

export function AuditSection() {
  const { t } = useLanguage();

  return (
    <section id="audit" className="relative z-10 py-32">
      <div className="pointer-events-auto container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: info */}
          <div className="lg:col-span-5 reveal reveal-left">
            <span className="section-tag">{t.audit.tag}</span>
            <h2 className="hero-title-sm">
              {t.audit.title1}
              <br />
              <span className="accent">{t.audit.title2}</span>
            </h2>
            <p className="mt-6 text-lg text-slate-400 leading-relaxed mb-8">
              {t.audit.description}
            </p>
            <ul className="space-y-4">
              {t.audit.benefits.map((b) => (
                <li key={b} className="flex items-center gap-3 text-white/70 text-sm">
                  <CheckCircle2 className="w-5 h-5 text-[#a78bfa] flex-shrink-0" />
                  {b}
                </li>
              ))}
            </ul>
          </div>

          {/* Right: form */}
          <div className="lg:col-span-6 lg:col-start-7 reveal reveal-right">
            <div className="rounded-sm border border-white/[0.05] bg-white/[0.02] backdrop-blur-md p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-sm bg-[#7c3aed]/10 flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-[#a78bfa]" />
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
                  className="w-full px-4 py-3 rounded-sm border border-white/[0.08] bg-white/[0.03] text-white placeholder-white/30 focus:border-[#a78bfa]/40 focus:ring-1 focus:ring-[#a78bfa]/30 outline-none transition-colors text-sm"
                />
                <input
                  type="email"
                  name="email"
                  required
                  placeholder={t.cta.formEmail}
                  className="w-full px-4 py-3 rounded-sm border border-white/[0.08] bg-white/[0.03] text-white placeholder-white/30 focus:border-[#a78bfa]/40 focus:ring-1 focus:ring-[#a78bfa]/30 outline-none transition-colors text-sm"
                />
                <input
                  type="text"
                  name="website"
                  placeholder={t.audit.website}
                  className="w-full px-4 py-3 rounded-sm border border-white/[0.08] bg-white/[0.03] text-white placeholder-white/30 focus:border-[#a78bfa]/40 focus:ring-1 focus:ring-[#a78bfa]/30 outline-none transition-colors text-sm"
                />
                <textarea
                  name="message"
                  rows={3}
                  placeholder={t.audit.formMessage}
                  className="w-full px-4 py-3 rounded-sm border border-white/[0.08] bg-white/[0.03] text-white placeholder-white/30 focus:border-[#a78bfa]/40 focus:ring-1 focus:ring-[#a78bfa]/30 outline-none transition-colors text-sm resize-none"
                />
                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 bg-[#7c3aed] hover:bg-[#6d28d9] text-white rounded-sm px-8 py-3 text-sm font-semibold tracking-wider uppercase transition-colors w-full"
                >
                  {t.audit.submit} <ArrowRight className="w-4 h-4" />
                </button>
              </form>
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