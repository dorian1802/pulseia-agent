"use client";

import { useEffect, useRef } from "react";

const THRESHOLD = 60;
const DECAY_TIMEOUT = 800;

export function SwipeArcs() {
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const leftOpacity = useRef(0);
  const rightOpacity = useRef(0);
  const leftPulsing = useRef(false);
  const rightPulsing = useRef(false);
  const leftDecayTimer = useRef<ReturnType<typeof setTimeout>>();
  const rightDecayTimer = useRef<ReturnType<typeof setTimeout>>();
  const accumulated = useRef({ left: 0, right: 0 });

  useEffect(() => {
    let rafId: number;

    function setArc(
      el: HTMLDivElement | null,
      opacity: number,
      pulsing: boolean
    ) {
      if (!el) return;
      el.style.opacity = String(opacity);
      if (pulsing) {
        el.classList.add("arc-pulsing");
      } else {
        el.classList.remove("arc-pulsing");
      }
    }

    function scheduleDecay(side: "left" | "right") {
      const timer = side === "left" ? leftDecayTimer : rightDecayTimer;
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => {
        const opRef = side === "left" ? leftOpacity : rightOpacity;
        const pulseRef = side === "left" ? leftPulsing : rightPulsing;
        const acc = accumulated.current;
        acc[side] = 0;
        opRef.current = 0;
        pulseRef.current = false;
      }, DECAY_TIMEOUT);
    }

    function handleWheel(e: WheelEvent) {
      const dx = e.deltaX;
      if (dx === 0) return;

      const atLeftEdge = window.scrollX <= 0;
      const atRightEdge =
        window.scrollX + window.innerWidth >=
        document.scrollingElement!.scrollWidth - 1;

      if (atLeftEdge && dx < 0) {
        // Swipe right at left edge → red arc
        accumulated.current.left += Math.abs(dx);
        accumulated.current.right = 0;
        const op = Math.min(1, accumulated.current.left / THRESHOLD);
        leftOpacity.current = op;
        leftPulsing.current = accumulated.current.left >= THRESHOLD;
        rightOpacity.current = 0;
        rightPulsing.current = false;
        scheduleDecay("left");
      } else if (atRightEdge && dx > 0) {
        // Swipe left at right edge → blue arc
        accumulated.current.right += Math.abs(dx);
        accumulated.current.left = 0;
        const op = Math.min(1, accumulated.current.right / THRESHOLD);
        rightOpacity.current = op;
        rightPulsing.current = accumulated.current.right >= THRESHOLD;
        leftOpacity.current = 0;
        leftPulsing.current = false;
        scheduleDecay("right");
      }
    }

    function tick() {
      setArc(leftRef.current, leftOpacity.current, leftPulsing.current);
      setArc(rightRef.current, rightOpacity.current, rightPulsing.current);

      // Smooth decay after timer fires
      leftOpacity.current *= 0.92;
      rightOpacity.current *= 0.92;
      if (leftOpacity.current < 0.01) {
        leftOpacity.current = 0;
        leftPulsing.current = false;
      }
      if (rightOpacity.current < 0.01) {
        rightOpacity.current = 0;
        rightPulsing.current = false;
      }

      rafId = requestAnimationFrame(tick);
    }

    window.addEventListener("wheel", handleWheel, { passive: true });
    rafId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("wheel", handleWheel);
      cancelAnimationFrame(rafId);
      if (leftDecayTimer.current) clearTimeout(leftDecayTimer.current);
      if (rightDecayTimer.current) clearTimeout(rightDecayTimer.current);
    };
  }, []);

  return (
    <>
      <div
        ref={leftRef}
        className="swipe-arc swipe-arc-left pointer-events-none fixed z-[99]"
        aria-hidden="true"
        style={{ opacity: 0 }}
      />
      <div
        ref={rightRef}
        className="swipe-arc swipe-arc-right pointer-events-none fixed z-[99]"
        aria-hidden="true"
        style={{ opacity: 0 }}
      />
    </>
  );
}