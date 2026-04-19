"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const DARK_BG = "#0a0a0f";
const LIGHT_BG = "#f8f9fa";

const SECTION_COLORS = [
  DARK_BG,  // Hero - dark
  LIGHT_BG,  // About - light
  DARK_BG,  // Services - dark
  LIGHT_BG,  // Agents - light
  DARK_BG,  // Portfolio - dark
  LIGHT_BG,  // Products - light
  DARK_BG,  // CTA - dark
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
      triggers.push(
        ScrollTrigger.create({
          trigger: section,
          start: "top 60%",
          end: "top 20%",
          scrub: true,
          onUpdate: (self) => {
            const prevColor = SECTION_COLORS[i - 1] ?? DARK_BG;
            const bg = self.progress > 0.5 ? color : prevColor;
            document.body.style.backgroundColor = bg;
          },
        })
      );
    });

    // ── Build/deconstruct animations ──
    // Animate headings
    sections.forEach((section) => {
      const headings = section.querySelectorAll("h1, h2, h3");
      headings.forEach((el) => {
        gsap.set(el, { opacity: 0, y: 40, scale: 0.95 });
        triggers.push(
          ScrollTrigger.create({
            trigger: el,
            start: "top 85%",
            end: "top 50%",
            scrub: true,
            onUpdate: (self) => {
              const p = self.progress;
              gsap.set(el, {
                opacity: p,
                y: 40 * (1 - p),
                scale: 0.95 + 0.05 * p,
              });
            },
          })
        );
      });

      // Animate paragraphs and text blocks
      const texts = section.querySelectorAll("p, .text-block");
      texts.forEach((el) => {
        if ((el as HTMLElement).closest("h1, h2, h3")) return;
        gsap.set(el, { opacity: 0, y: 25 });
        triggers.push(
          ScrollTrigger.create({
            trigger: el,
            start: "top 90%",
            end: "top 60%",
            scrub: true,
            onUpdate: (self) => {
              const p = self.progress;
              gsap.set(el, {
                opacity: p,
                y: 25 * (1 - p),
              });
            },
          })
        );
      });

      // Animate cards with stagger
      const cards = section.querySelectorAll(".card-animate");
      if (cards.length) {
        cards.forEach((card, ci) => {
          gsap.set(card, { opacity: 0, y: 50, scale: 0.9, rotateY: 8 });
          triggers.push(
            ScrollTrigger.create({
              trigger: section,
              start: `top 70%`,
              end: "top 20%",
              scrub: true,
              onUpdate: (self) => {
                const stagger = ci * 0.12;
                const p = Math.max(0, Math.min(1, (self.progress - stagger) / (1 - stagger * cards.length)));
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
      }

      // Animate tags/badges
      const tags = section.querySelectorAll(".tag-animate");
      tags.forEach((tag, ti) => {
        gsap.set(tag, { opacity: 0, scale: 0.5 });
        triggers.push(
          ScrollTrigger.create({
            trigger: section,
            start: "top 75%",
            end: "top 30%",
            scrub: true,
            onUpdate: (self) => {
              const stagger = ti * 0.05;
              const p = Math.max(0, Math.min(1, (self.progress - stagger) / 0.7));
              gsap.set(tag, {
                opacity: p,
                scale: 0.5 + 0.5 * p,
              });
            },
          })
        );
      });

      // Animate stats
      const stats = section.querySelectorAll(".stat-animate");
      stats.forEach((stat, si) => {
        gsap.set(stat, { opacity: 0, y: 30 });
        triggers.push(
          ScrollTrigger.create({
            trigger: section,
            start: "top 70%",
            end: "top 30%",
            scrub: true,
            onUpdate: (self) => {
              const stagger = si * 0.1;
              const p = Math.max(0, Math.min(1, (self.progress - stagger) / 0.7));
              gsap.set(stat, {
                opacity: p,
                y: 30 * (1 - p),
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