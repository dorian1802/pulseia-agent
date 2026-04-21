"use client";

import { useEffect, useRef } from "react";

const THRESHOLD = 60;
const DECAY_MS = 900;

export function SwipeArcs() {
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const state = useRef({
    leftOp: 0,
    rightOp: 0,
    leftPulse: false,
    rightPulse: false,
    leftTimer: 0,
    rightTimer: 0,
    // pointer tracking
    pointerId: -1,
    startX: 0,
    startY: 0,
    dragging: false,
    accumLeft: 0,
    accumRight: 0,
  });

  useEffect(() => {
    const s = state.current;
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

    function clearDecay(side: "left" | "right") {
      if (side === "left") {
        if (s.leftTimer) { window.clearTimeout(s.leftTimer); s.leftTimer = 0; }
      } else {
        if (s.rightTimer) { window.clearTimeout(s.rightTimer); s.rightTimer = 0; }
      }
    }

    function scheduleDecay(side: "left" | "right") {
      clearDecay(side);
      const cb = () => {
        if (side === "left") { s.accumLeft = 0; s.leftOp = 0; s.leftPulse = false; }
        else { s.accumRight = 0; s.rightOp = 0; s.rightPulse = false; }
      };
      const id = window.setTimeout(cb, DECAY_MS);
      if (side === "left") s.leftTimer = id;
      else s.rightTimer = id;
    }

    function showArc(side: "left" | "right", delta: number) {
      const accKey = side === "left" ? "accumLeft" : "accumRight";
      s[accKey] += Math.abs(delta);
      const op = Math.min(1, s[accKey] / THRESHOLD);

      if (side === "left") {
        s.leftOp = op;
        s.leftPulse = s.accumLeft >= THRESHOLD;
        s.rightOp = 0;
        s.rightPulse = false;
        s.accumRight = 0;
      } else {
        s.rightOp = op;
        s.rightPulse = s.accumRight >= THRESHOLD;
        s.leftOp = 0;
        s.leftPulse = false;
        s.accumLeft = 0;
      }
      scheduleDecay(side);
    }

    // ── Wheel (trackpad / mouse scroll) ──
    function onWheel(e: WheelEvent) {
      const dx = e.deltaX;
      if (dx === 0) return;

      const atLeft = window.scrollX <= 0;
      const atRight =
        window.scrollX + window.innerWidth >=
        (document.scrollingElement?.scrollWidth ?? 0) - 1;

      if (atLeft && dx < 0) showArc("left", dx);
      else if (atRight && dx > 0) showArc("right", dx);
    }

    // ── Touch (mobile / touchpad) ──
    function onTouchStart(e: TouchEvent) {
      const t = e.touches[0];
      s.startX = t.clientX;
      s.startY = t.clientY;
      s.dragging = true;
    }

    function onTouchMove(e: TouchEvent) {
      if (!s.dragging) return;
      const t = e.touches[0];
      const dx = t.clientX - s.startX;
      const dy = t.clientY - s.startY;

      // Only react to horizontal gestures
      if (Math.abs(dx) < Math.abs(dy) * 0.6) return;

      const atLeft = window.scrollX <= 0;
      const atRight =
        window.scrollX + window.innerWidth >=
        (document.scrollingElement?.scrollWidth ?? 0) - 1;

      if (atLeft && dx > 0) showArc("left", dx);
      else if (atRight && dx < 0) showArc("right", dx);
    }

    function onTouchEnd() {
      s.dragging = false;
    }

    // ── Pointer (trackpad drag / mouse drag) ──
    function onPointerDown(e: PointerEvent) {
      if (e.pointerType === "mouse" && e.button !== 0) return;
      s.pointerId = e.pointerId;
      s.startX = e.clientX;
      s.startY = e.clientY;
      s.dragging = true;
    }

    function onPointerMove(e: PointerEvent) {
      if (!s.dragging || e.pointerId !== s.pointerId) return;
      const dx = e.clientX - s.startX;
      const dy = e.clientY - s.startY;

      if (Math.abs(dx) < 15) return;
      if (Math.abs(dx) < Math.abs(dy) * 0.5) return;

      const atLeft = window.scrollX <= 0;
      const atRight =
        window.scrollX + window.innerWidth >=
        (document.scrollingElement?.scrollWidth ?? 0) - 1;

      if (atLeft && dx > 0) showArc("left", dx);
      else if (atRight && dx < 0) showArc("right", dx);
    }

    function onPointerUp() {
      s.dragging = false;
      s.pointerId = -1;
    }

    // ── Render loop ──
    function tick() {
      setArc(leftRef.current, s.leftOp, s.leftPulse);
      setArc(rightRef.current, s.rightOp, s.rightPulse);

      // Gradual decay
      s.leftOp *= 0.93;
      s.rightOp *= 0.93;
      if (s.leftOp < 0.005) {
        s.leftOp = 0;
        s.leftPulse = false;
      }
      if (s.rightOp < 0.005) {
        s.rightOp = 0;
        s.rightPulse = false;
      }

      rafId = requestAnimationFrame(tick);
    }

    // Capture phase to get wheel events before Lenis
    window.addEventListener("wheel", onWheel, { passive: true, capture: true });
    document.addEventListener("touchstart", onTouchStart, { passive: true });
    document.addEventListener("touchmove", onTouchMove, { passive: true });
    document.addEventListener("touchend", onTouchEnd, { passive: true });
    document.addEventListener("pointerdown", onPointerDown, { passive: true });
    document.addEventListener("pointermove", onPointerMove, { passive: true });
    document.addEventListener("pointerup", onPointerUp, { passive: true });

    rafId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("wheel", onWheel, true);
      document.removeEventListener("touchstart", onTouchStart);
      document.removeEventListener("touchmove", onTouchMove);
      document.removeEventListener("touchend", onTouchEnd);
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("pointerup", onPointerUp);
      cancelAnimationFrame(rafId);
      clearDecay("left");
      clearDecay("right");
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