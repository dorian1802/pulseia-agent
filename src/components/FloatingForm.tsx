"use client";

import { useLanguage } from "@/lib/LanguageContext";
import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Send, X, ArrowRight } from "lucide-react";

export function FloatingForm() {
  const { t } = useLanguage();
  const formRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const portalJump = useCallback((el: HTMLElement, targetX: number, side: string) => {
    const tl = gsap.timeline();

    tl.to(el, {
      scaleX: 0,
      duration: 0.3,
      ease: "power2.in",
      transformOrigin: side,
    });

    tl.set(el, { x: targetX });

    tl.to(el, {
      scaleX: 1,
      duration: 0.4,
      ease: "back.out(1.4)",
      transformOrigin: side === "left center" ? "right center" : "left center",
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

    sections.forEach((section, i) => {
      const isRight = i % 2 === 0;

      const trigger = ScrollTrigger.create({
        trigger: section,
        start: "top center",
        end: "bottom center",
        onEnter: () => {
          if (i < aboutIndex) {
            gsap.to(el, { opacity: 0, duration: 0.3 });
            return;
          }

          gsap.to(el, { opacity: 1, duration: 0.3 });

          const targetX = isRight ? window.innerWidth - 288 - 24 : 24;
          const side = isRight ? "left center" : "right center";
          portalJump(el, targetX, side);
        },
        onEnterBack: () => {
          if (i < aboutIndex) {
            gsap.to(el, { opacity: 0, duration: 0.3 });
            return;
          }

          gsap.to(el, { opacity: 1, duration: 0.3 });

          const targetX = isRight ? window.innerWidth - 288 - 24 : 24;
          const side = isRight ? "left center" : "right center";
          portalJump(el, targetX, side);
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
  }, [portalJump]);

  return (
    <div
      ref={formRef}
      className="fixed top-1/2 -translate-y-1/2 z-40 w-72 pointer-events-auto"
      style={{ x: typeof window !== "undefined" ? window.innerWidth - 312 : 500 }}
    >
      {!open ? (
        <button
          onClick={() => setOpen(true)}
          className="flex items-center gap-2 bg-accent hover:bg-accent-dark text-white rounded-full pl-4 pr-3 py-2.5 text-sm font-medium tracking-wider uppercase shadow-lg shadow-accent/20 transition-colors"
        >
          <Send className="w-4 h-4" />
          {t.cta.formSend}
        </button>
      ) : (
        <div className="bg-dark-light/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl shadow-black/50 p-5">
          <div className="flex items-center justify-between mb-4">
            <p className="text-white text-sm font-semibold tracking-wide">
              {t.cta.title1} {t.cta.title2}
            </p>
            <button onClick={() => setOpen(false)} className="text-white/40 hover:text-white transition-colors">
              <X className="w-4 h-4" />
            </button>
          </div>
          {submitted ? (
            <p className="text-accent text-sm py-6 text-center">{t.cta.formSent ?? "Message envoyé !"}</p>
          ) : (
            <form
              action={`https://formsubmit.co/${t.cta.email}`}
              method="POST"
              className="space-y-3"
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
          )}
        </div>
      )}
    </div>
  );
}