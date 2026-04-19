"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const DARK_BG = "#0a0a0f";
const LIGHT_BG = "#f8f9fa";

const SECTION_COLORS = [
  DARK_BG,   // Hero
  LIGHT_BG,  // About
  DARK_BG,   // Services
  LIGHT_BG,  // Agents
  DARK_BG,   // Portfolio
  LIGHT_BG,  // Products
  DARK_BG,   // Audit
  DARK_BG,   // CTA
];

export function ScrollAnimations() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const sections = document.querySelectorAll("main > section");
    if (!sections.length) return;

    const triggers: ScrollTrigger[] = [];

    // ── Background color transitions ──
    sections.forEach((section, i) => {
      const color = SECTION_COLORS[i] ?? DARK_BG;
      const prevColor = SECTION_COLORS[i - 1] ?? DARK_BG;
      if (color === prevColor) return;

      triggers.push(
        ScrollTrigger.create({
          trigger: section,
          start: "top 60%",
          end: "top 20%",
          scrub: true,
          onUpdate: (self) => {
            document.body.style.backgroundColor = self.progress > 0.5 ? color : prevColor;
          },
        })
      );
    });

    // ── Build/deconstruct animations ──
    sections.forEach((section) => {
      // Headings (only direct children or top-level, skip inside cards/stats)
      const headings = section.querySelectorAll(":scope > div h1, :scope > div h2, :scope > div > div > h2, :scope > div h3");
      headings.forEach((el) => {
        if ((el as HTMLElement).closest(".card-animate, .stat-animate")) return;
        gsap.set(el, { opacity: 0, y: 40, scale: 0.95 });
        triggers.push(
          ScrollTrigger.create({
            trigger: el,
            start: "top 85%",
            end: "top 50%",
            scrub: true,
            onUpdate: (self) => {
              const p = self.progress;
              gsap.set(el, { opacity: p, y: 40 * (1 - p), scale: 0.95 + 0.05 * p });
            },
          })
        );
      });

      // Tags (.tag-animate only, skip if inside a card)
      const tags = section.querySelectorAll(".tag-animate");
      tags.forEach((tag) => {
        if ((tag as HTMLElement).closest(".card-animate")) return;
        gsap.set(tag, { opacity: 0, scale: 0.5 });
        triggers.push(
          ScrollTrigger.create({
            trigger: tag,
            start: "top 90%",
            end: "top 60%",
            scrub: true,
            onUpdate: (self) => {
              const p = self.progress;
              gsap.set(tag, { opacity: p, scale: 0.5 + 0.5 * p });
            },
          })
        );
      });

      // Text blocks (.text-block only)
      const texts = section.querySelectorAll(".text-block");
      texts.forEach((el) => {
        if ((el as HTMLElement).closest(".card-animate, .stat-animate")) return;
        gsap.set(el, { opacity: 0, y: 25 });
        triggers.push(
          ScrollTrigger.create({
            trigger: el,
            start: "top 90%",
            end: "top 60%",
            scrub: true,
            onUpdate: (self) => {
              const p = self.progress;
              gsap.set(el, { opacity: p, y: 25 * (1 - p) });
            },
          })
        );
      });

      // Stats (.stat-animate)
      const stats = section.querySelectorAll(".stat-animate");
      stats.forEach((stat) => {
        gsap.set(stat, { opacity: 0, y: 30 });
        triggers.push(
          ScrollTrigger.create({
            trigger: stat,
            start: "top 90%",
            end: "top 60%",
            scrub: true,
            onUpdate: (self) => {
              const p = self.progress;
              gsap.set(stat, { opacity: p, y: 30 * (1 - p) });
            },
          })
        );
      });

      // Cards (.card-animate) — fixed stagger
      const cards = section.querySelectorAll(".card-animate");
      cards.forEach((card, ci) => {
        gsap.set(card, { opacity: 0, y: 50, scale: 0.9, rotateY: 8 });
        triggers.push(
          ScrollTrigger.create({
            trigger: card,
            start: "top 90%",
            end: "top 50%",
            scrub: true,
            onUpdate: (self) => {
              const staggerDelay = ci * 0.08;
              const p = Math.max(0, Math.min(1, (self.progress + staggerDelay) / 1));
              gsap.set(card, {
                opacity: p,
                y: 50 * (1 - p),
                scale: 0.9 + 0.1 * p,
                rotateY: 8 * (1 - p),
              });
            },
          })
        );
      });
    });

    return () => triggers.forEach((t) => t.kill());
  }, []);

  return null;
}