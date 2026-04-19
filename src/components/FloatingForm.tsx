"use client";

import { useLanguage } from "@/lib/LanguageContext";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Sparkles, X, ArrowRight } from "lucide-react";

export function FloatingForm() {
  const { t } = useLanguage();
  const formRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);

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
      if (i < aboutIndex || i === contactIndex) return;

      // At top of section → one side, at bottom → other side
      const isRightTop = i % 2 === 0;
      const topX = isRightTop ? window.innerWidth - el.offsetWidth - 24 : 24;
      const bottomX = isRightTop ? 24 : window.innerWidth - el.offsetWidth - 24;

      triggers.push(
        ScrollTrigger.create({
          trigger: section,
          start: "top 80%",
          end: "top 20%",
          scrub: true,
          onUpdate: (self) => {
            const x = gsap.utils.interpolate(topX, bottomX, self.progress);
            gsap.set(el, { x, opacity: 1 });
          },
        })
      );

      // Hold position through middle of section
      triggers.push(
        ScrollTrigger.create({
          trigger: section,
          start: "top 20%",
          end: "bottom 80%",
          onEnter: () => gsap.set(el, { x: bottomX, opacity: 1 }),
          onEnterBack: () => gsap.set(el, { x: bottomX, opacity: 1 }),
        })
      );

      // Bottom of section → back to starting side for next section
      triggers.push(
        ScrollTrigger.create({
          trigger: section,
          start: "bottom 80%",
          end: "bottom 20%",
          scrub: true,
          onUpdate: (self) => {
            const nextIsRight = (i + 1) % 2 === 0;
            const nextTopX = nextIsRight ? window.innerWidth - el.offsetWidth - 24 : 24;
            const x = gsap.utils.interpolate(bottomX, nextTopX, self.progress);
            gsap.set(el, { x, opacity: 1 });
          },
        })
      );
    });

    // Hide in hero
    const heroSection = sections[0];
    if (heroSection) {
      triggers.push(
        ScrollTrigger.create({
          trigger: heroSection,
          start: "top top",
          end: "bottom top",
          onEnter: () => gsap.to(el, { opacity: 0, duration: 0.2 }),
          onLeaveBack: () => gsap.to(el, { opacity: 0, duration: 0.2 }),
        })
      );
    }

    // Hide in contact
    const contactSection = sections[contactIndex];
    if (contactSection) {
      triggers.push(
        ScrollTrigger.create({
          trigger: contactSection,
          start: "top 80%",
          onEnter: () => gsap.to(el, { opacity: 0, duration: 0.3 }),
          onEnterBack: () => gsap.to(el, { opacity: 0, duration: 0.3 }),
        })
      );
    }

    gsap.set(el, { opacity: 0 });

    return () => triggers.forEach((tr) => tr.kill());
  }, []);

  return (
    <div
      ref={formRef}
      className="fixed bottom-6 z-40 pointer-events-auto"
      style={{ x: typeof window !== "undefined" ? window.innerWidth / 2 - 80 : 500 }}
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