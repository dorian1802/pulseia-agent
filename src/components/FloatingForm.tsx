"use client";

import { useLanguage } from "@/lib/LanguageContext";
import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Send, X } from "lucide-react";

export function FloatingForm() {
  const { t } = useLanguage();
  const formRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [inContact, setInContact] = useState(false);

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
    const lastIndex = sections.length - 1;

    sections.forEach((section, i) => {
      const isContact = i === lastIndex;
      const isRight = i % 2 === 0;

      const trigger = ScrollTrigger.create({
        trigger: section,
        start: "top center",
        end: "bottom center",
        onEnter: () => {
          if (isContact) {
            setInContact(true);
            setOpen(true);

            // Hide static CTA form
            const ctaForm = section.querySelector("[data-cta-form]") as HTMLElement | null;
            if (ctaForm) ctaForm.style.visibility = "hidden";

            // Slide into right side of CTA section
            gsap.to(el, {
              x: window.innerWidth - el.offsetWidth - 48,
              duration: 0.8,
              ease: "power3.out",
            });
          } else {
            setInContact(false);
            const targetX = isRight ? window.innerWidth - el.offsetWidth - 24 : 24;
            const side = isRight ? "left center" : "right center";
            portalJump(el, targetX, side);
          }
        },
        onEnterBack: () => {
          if (isContact) {
            setInContact(true);
            setOpen(true);

            const ctaForm = section.querySelector("[data-cta-form]") as HTMLElement | null;
            if (ctaForm) ctaForm.style.visibility = "hidden";

            gsap.to(el, {
              x: window.innerWidth - el.offsetWidth - 48,
              duration: 0.8,
              ease: "power3.out",
            });
          } else {
            setInContact(false);
            const targetX = isRight ? window.innerWidth - el.offsetWidth - 24 : 24;
            const side = isRight ? "left center" : "right center";
            portalJump(el, targetX, side);
          }
        },
        onLeave: () => {
          if (isContact) {
            const ctaForm = section.querySelector("[data-cta-form]") as HTMLElement | null;
            if (ctaForm) ctaForm.style.visibility = "visible";
            setInContact(false);
          }
        },
        onLeaveBack: () => {
          if (isContact) {
            const ctaForm = section.querySelector("[data-cta-form]") as HTMLElement | null;
            if (ctaForm) ctaForm.style.visibility = "visible";
            setInContact(false);
            setOpen(false);
          }
        },
      });
      triggers.push(trigger);
    });

    return () => triggers.forEach((t) => t.kill());
  }, [portalJump]);

  return (
    <div
      ref={formRef}
      className="fixed top-1/2 -translate-y-1/2 z-40 w-72 pointer-events-auto"
      style={{ x: typeof window !== "undefined" ? window.innerWidth - 296 : 500 }}
    >
      {!open && !inContact ? (
        <button
          onClick={() => setOpen(true)}
          className="flex items-center gap-2 bg-accent hover:bg-accent-dark text-white rounded-full pl-4 pr-3 py-2.5 text-sm font-medium tracking-wider uppercase shadow-lg shadow-accent/20 transition-colors"
        >
          <Send className="w-4 h-4" />
          {t.cta.formSend}
        </button>
      ) : (
        <div className="bg-dark-light/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl shadow-black/50 p-5">
          {!inContact && (
            <div className="flex items-center justify-between mb-4">
              <p className="text-white text-sm font-semibold tracking-wide">
                {t.cta.title1} {t.cta.title2}
              </p>
              <button onClick={() => setOpen(false)} className="text-white/40 hover:text-white transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>
          )}
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
                className="w-full px-3 py-2 rounded-lg border border-white/10 bg-white/5 text-white placeholder-white/30 focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-colors text-sm"
              />
              <input
                type="email"
                name="email"
                required
                placeholder={t.cta.formEmail}
                className="w-full px-3 py-2 rounded-lg border border-white/10 bg-white/5 text-white placeholder-white/30 focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-colors text-sm"
              />
              <textarea
                name="message"
                rows={3}
                required
                placeholder={t.cta.formMessage}
                className="w-full px-3 py-2 rounded-lg border border-white/10 bg-white/5 text-white placeholder-white/30 focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-colors text-sm resize-none"
              />
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent-dark text-white rounded-lg px-4 py-2 text-sm font-semibold tracking-wider uppercase transition-colors w-full"
              >
                {t.cta.formSend} <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          )}
        </div>
      )}
    </div>
  );
}