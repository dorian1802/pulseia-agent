"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const BLACK = [6, 6, 14];        // #06060e
const DEEP_VIOLET = [14, 10, 32]; // #0e0a20
const MAUVE_DARK = [24, 16, 48]; // #181030
const VIOLET = [30, 18, 60];     // #1e123c
const PURPLE = [28, 14, 52];     // #1c0e34
const FUCHSIA = [36, 12, 48];    // #240c30
const INDIGO_DARK = [22, 16, 56]; // #161038
const BLACK2 = [8, 6, 16];       // #080610

const GRADIENT_STOPS = [
  BLACK,         // Hero — noir profond
  DEEP_VIOLET,   // About — violet profond
  MAUVE_DARK,    // Services — mauve sombre
  VIOLET,        // Agents — violet
  PURPLE,        // Portfolio — violet foncé
  FUCHSIA,       // Products — fuchsia sombre
  INDIGO_DARK,   // Audit — indigo profond
  BLACK2,        // CTA — retour au noir
];

// Accent glow colors per section (brighter, for the gradient overlay)
const GLOW_COLORS = [
  [167, 139, 250],  // Hero — mauve clair
  [139, 92, 246],   // About — violet
  [167, 139, 250],  // Services — mauve
  [124, 58, 237],   // Agents — violet accent
  [192, 132, 252],  // Portfolio — violet clair
  [186, 85, 211],   // Products — medium orchid
  [139, 92, 246],   // Audit — violet
  [167, 139, 250],  // CTA — mauve clair
];

function lerpColor(a: number[], b: number[], t: number): string {
  const r = Math.round(a[0] + (b[0] - a[0]) * t);
  const g = Math.round(a[1] + (b[1] - a[1]) * t);
  const bl = Math.round(a[2] + (b[2] - a[2]) * t);
  return `rgb(${r},${g},${bl})`;
}

function lerpColorHex(a: number[], b: number[], t: number): string {
  const r = Math.round(a[0] + (b[0] - a[0]) * t);
  const g = Math.round(a[1] + (b[1] - a[1]) * t);
  const bl = Math.round(a[2] + (b[2] - a[2]) * t);
  return `#${r.toString(16).padStart(2,"0")}${g.toString(16).padStart(2,"0")}${bl.toString(16).padStart(2,"0")}`;
}

export function ScrollAnimations() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const sections = document.querySelectorAll("main > section");
    if (!sections.length) return;

    const triggers: ScrollTrigger[] = [];

    // ── Smooth gradient background on body + glow overlay ──
    const main = document.querySelector("main");
    const glowEl = document.getElementById("bg-glow");
    if (main && glowEl) {
      triggers.push(
        ScrollTrigger.create({
          trigger: main,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
          onUpdate: (self) => {
            const progress = self.progress;
            const n = GRADIENT_STOPS.length;
            const floatPos = progress * (n - 1);
            const idx = Math.min(Math.floor(floatPos), n - 2);
            const t = floatPos - idx;
            const from = GRADIENT_STOPS[idx];
            const to = GRADIENT_STOPS[idx + 1];
            const baseColor = lerpColor(from, to, t);

            // Base color changes on scroll
            document.body.style.backgroundColor = baseColor;

            // Glow gradient overlay — accent color fades from bottom
            const glowFrom = GLOW_COLORS[idx];
            const glowTo = GLOW_COLORS[idx + 1];
            const glowColor = lerpColorHex(glowFrom, glowTo, t);
            glowEl.style.background = `radial-gradient(ellipse 60% 50% at 50% 100%, ${glowColor}35 0%, transparent 70%)`;
          },
        })
      );
    }

    // ── Build/deconstruct animations ──
    sections.forEach((section) => {
      // Headings (skip inside cards/stats)
      const headings = section.querySelectorAll(":scope > div h1, :scope > div h2, :scope > div > div > h2, :scope > div h3");
      headings.forEach((el) => {
        if ((el as HTMLElement).closest(".card-animate, .stat-animate, article, a")) return;
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