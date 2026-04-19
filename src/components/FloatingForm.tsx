"use client";

import { useLanguage } from "@/lib/LanguageContext";
import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Sparkles, X, ArrowRight } from "lucide-react";

export function FloatingForm() {
  const { t } = useLanguage();
  const formRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const slideTo = useCallback((el: HTMLElement, targetX: number) => {
    gsap.to(el, {
      x: targetX,
      duration: 0.8,
      ease: "power3.out",
    });
  }, []);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const el = formRef.current;
    if (!el) return;

    const sections = document.querySelectorAll("main > section");
    if (!sections.length) return;

    const triggers: ScrollTrigger[] = [];
    const aboutIndex = 1;
    const contactIndex = sections.length - 1;

    sections.forEach((section, i) => {
      const isRight = i % 2 === 0;

      const trigger = ScrollTrigger.create({
        trigger: section,
        start: "top center",
        end: "bottom center",
        onEnter: () => {
          if (i < aboutIndex || i === contactIndex) {
            gsap.to(el, { opacity: 0, duration: 0.3 });
            return;
          }

          gsap.to(el, { opacity: 1, duration: 0.3 });
          const targetX = isRight ? window.innerWidth - el.offsetWidth - 24 : 24;
          slideTo(el, targetX);
        },
        onEnterBack: () => {
          if (i < aboutIndex || i === contactIndex) {
            gsap.to(el, { opacity: 0, duration: 0.3 });
            return;
          }

          gsap.to(el, { opacity: 1, duration: 0.3 });
          const targetX = isRight ? window.innerWidth - el.offsetWidth - 24 : 24;
          slideTo(el, targetX);
        },
        onLeaveBack: () => {
          if (i <= aboutIndex) {
            gsap.to(el, { opacity: 0, duration: 0.3 });
          }
        },
      });
      triggers.push(trigger);
    });

    gsap.set(el, { opacity: 0 });

    return () => triggers.forEach((t) => t.kill());
  }, [slideTo]);

  return (
    <div
      ref={formRef}
      className="fixed bottom-6 z-40 pointer-events-auto"
      style={{ x: typeof window !== "undefined" ? window.innerWidth / 2 - 180 : 500 }}
    >
      {!open ? (
        <button
          onClick={() => setOpen(true)}
          className="flex items-center gap-2 bg-accent hover:bg-accent-dark text-white rounded-xl pl-5 pr-4 py-3 text-sm font-medium tracking-wide shadow-lg shadow-accent/25 transition-colors border border-accent/30"
        >
          <Sparkles className="w-4 h-4" />
          {t.audit.button}
        </button>
      ) : (
        <div className="w-72 bg-dark-light/95 backdrop-blur-xl border border-accent/30 rounded-2xl shadow-2xl shadow-black/50 p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-accent" />
              <p className="text-white text-sm font-semibold tracking-wide">{t.audit.title}</p>
            </div>
            <button onClick={() => setOpen(false)} className="text-white/40 hover:text-white transition-colors">
              <X className="w-4 h-4" />
            </button>
          </div>
          <p className="text-white/50 text-xs mb-4 leading-relaxed">{t.audit.description}</p>
          {submitted ? (
            <p className="text-accent text-sm py-4 text-center">{t.audit.sent}</p>
          ) : (
            <form
              action={`https://formsubmit.co/${t.cta.email}`}
              method="POST"
              className="space-y-2.5"
            >
              <input type="hidden" name="_subject" value="Demande d'audit IA gratuit" />
              <input type="hidden" name="_captcha" value="false" />
              <input
                type="text"
                name="name"
                required
                placeholder={t.cta.formName}
                className="w-full px-3 py-2 rounded-lg border border-white/10 bg-white/5 text-white placeholder-white/30 focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-colors text-sm"
              />
              <input
                type="email"
                name="email"
                required
                placeholder={t.cta.formEmail}
                className="w-full px-3 py-2 rounded-lg border border-white/10 bg-white/5 text-white placeholder-white/30 focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-colors text-sm"
              />
              <input
                type="text"
                name="website"
                placeholder={t.audit.website}
                className="w-full px-3 py-2 rounded-lg border border-white/10 bg-white/5 text-white placeholder-white/30 focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-colors text-sm"
              />
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent-dark text-white rounded-lg px-6 py-2.5 text-sm font-semibold tracking-wider uppercase transition-colors w-full"
              >
                {t.audit.submit} <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}
        </div>
      )}
    </div>
  );
}