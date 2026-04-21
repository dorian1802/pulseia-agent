"use client";

import { useEffect, useRef, useCallback } from "react";

const THRESHOLD = 60;
const FADE_SPEED = 0.12;
const DECAY_SPEED = 0.06;

export function SwipeArcs() {
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const accumulated = useRef({ left: 0, right: 0 });
  const pulsing = useRef({ left: false, right: false });

  const updateArc = useCallback(
    (el: HTMLDivElement | null, opacity: number, isPulsing: boolean) => {
      if (!el) return;
      el.style.opacity = String(Math.min(1, Math.max(0, opacity)));
      if (isPulsing) {
        el.classList.add("arc-pulsing");
      } else {
        el.classList.remove("arc-pulsing");
      }
    },
    []
  );

  useEffect(() => {
    let rafId: number;

    function handleWheel(e: WheelEvent) {
      const atLeftEdge = window.scrollX <= 0;
      const atRightEdge =
        window.scrollX + window.innerWidth >=
        document.scrollingElement!.scrollWidth - 1;

      // Swipe right (trackpad: deltaX < 0) at left edge → show red arc
      if (atLeftEdge && e.deltaX < 0) {
        accumulated.current.left += Math.abs(e.deltaX);
        accumulated.current.right = 0;
        pulsing.current.left = accumulated.current.left >= THRESHOLD;
      }
      // Swipe left (trackpad: deltaX > 0) at right edge → show blue arc
      else if (atRightEdge && e.deltaX > 0) {
        accumulated.current.right += Math.abs(e.deltaX);
        accumulated.current.left = 0;
        pulsing.current.right = accumulated.current.right >= THRESHOLD;
      }
      // Opposite or neutral gesture → decay
      else {
        accumulated.current.left *= 0.7;
        accumulated.current.right *= 0.7;
        if (accumulated.current.left < 1) {
          accumulated.current.left = 0;
          pulsing.current.left = false;
        }
        if (accumulated.current.right < 1) {
          accumulated.current.right = 0;
          pulsing.current.right = false;
        }
      }
    }

    function tick() {
      // Decay accumulated values when not actively swiping
      accumulated.current.left *= 0.95;
      accumulated.current.right *= 0.95;
      if (accumulated.current.left < 1) {
        accumulated.current.left = 0;
        pulsing.current.left = false;
      }
      if (accumulated.current.right < 1) {
        accumulated.current.right = 0;
        pulsing.current.right = false;
      }

      const leftOpacity = accumulated.current.left / THRESHOLD;
      const rightOpacity = accumulated.current.right / THRESHOLD;

      updateArc(leftRef.current, leftOpacity, pulsing.current.left);
      updateArc(rightRef.current, rightOpacity, pulsing.current.right);

      rafId = requestAnimationFrame(tick);
    }

    window.addEventListener("wheel", handleWheel, { passive: true });
    rafId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("wheel", handleWheel);
      cancelAnimationFrame(rafId);
    };
  }, [updateArc]);

  return (
    <>
      {/* Left edge arc — red (Previous) */}
      <div
        ref={leftRef}
        className="swipe-arc swipe-arc-left pointer-events-none fixed z-[99]"
        aria-hidden="true"
        style={{ opacity: 0 }}
      />
      {/* Right edge arc — blue (Next) */}
      <div
        ref={rightRef}
        className="swipe-arc swipe-arc-right pointer-events-none fixed z-[99]"
        aria-hidden="true"
        style={{ opacity: 0 }}
      />
    </>
  );
}