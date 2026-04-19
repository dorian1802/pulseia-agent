"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const DARK = [10, 10, 15];     // #0a0a0f
const LIGHT = [248, 249, 250]; // #f8f9fa

const SECTION_RGB = [
  DARK,   // Hero
  LIGHT,  // About
  DARK,   // Services
  LIGHT,  // Agents
  DARK,   // Portfolio
  LIGHT,  // Products
  DARK,   // Audit
  DARK,   // CTA
];

function lerpColor(a: number[], b: number[], t: number): string {
  const r = Math.round(a[0] + (b[0] - a[0]) * t);
  const g = Math.round(a[1] + (b[1] - a[1]) * t);
  const bl = Math.round(a[2] + (b[2] - a[2]) * t);
  return `rgb(${r},${g},${bl})`;
}

export function ScrollAnimations() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const sections = document.querySelectorAll("main > section");
    if (!sections.length) return;

    const triggers: ScrollTrigger[] = [];

    // ── Smooth gradient background across entire page ──
    // One continuous scrub trigger that interpolates through all section colors
    const main = document.querySelector("main");
    if (main) {
      // Build color stops for each section transition
      const n = sections.length;

      triggers.push(
        ScrollTrigger.create({
          trigger: main,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
          onUpdate: (self) => {
            const progress = self.progress;
            const sectionFloat = progress * (n - 1);
            const idx = Math.min(Math.floor(sectionFloat), n - 2);
            const t = sectionFloat - idx;
            const from = SECTION_RGB[idx];
            const to = SECTION_RGB[idx + 1];
            document.body.style.backgroundColor = lerpColor(from, to, t);
          },
        })
      );
    }

    // ── Build/deconstruct animations ──
    sections.forEach((section) => {
      // Headings (skip inside cards/stats)
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

      // Cards (.card-animate)
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