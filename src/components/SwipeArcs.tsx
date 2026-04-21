"use client";

import { useEffect, useRef } from "react";

const SENSITIVITY = 0.6;
const THRESHOLD = 65;
const MAX_PULL = 90;

export function SwipeArcs() {
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const state = useRef({
    accLeft: 0,
    accRight: 0,
    isReturning: false,
    timeout: 0,
  });

  useEffect(() => {
    const s = state.current;

    function updateUI() {
      const arcLeft = leftRef.current;
      const arcRight = rightRef.current;
      if (!arcLeft || !arcRight) return;

      if (s.accLeft > 0) {
        const pull = Math.min(s.accLeft * SENSITIVITY, MAX_PULL);
        const opacity = Math.min(s.accLeft / 50, 1);
        arcLeft.style.opacity = String(opacity);
        arcLeft.style.transform = `translateX(${pull - 50}px) scaleY(${0.8 + pull / 400})`;
        if (pull > THRESHOLD) arcLeft.classList.add("active-red");
        else arcLeft.classList.remove("active-red");
      } else {
        arcLeft.style.opacity = "0";
        arcLeft.style.transform = "translateX(-50px) scaleY(0.8)";
        arcLeft.classList.remove("active-red");
      }

      if (s.accRight > 0) {
        const pull = Math.min(s.accRight * SENSITIVITY, MAX_PULL);
        const opacity = Math.min(s.accRight / 50, 1);
        arcRight.style.opacity = String(opacity);
        arcRight.style.transform = `translateX(${50 - pull}px) scaleY(${0.8 + pull / 400})`;
        if (pull > THRESHOLD) arcRight.classList.add("active-blue");
        else arcRight.classList.remove("active-blue");
      } else {
        arcRight.style.opacity = "0";
        arcRight.style.transform = "translateX(50px) scaleY(0.8)";
        arcRight.classList.remove("active-blue");
      }
    }

    function reset() {
      s.isReturning = true;
      s.accLeft = 0;
      s.accRight = 0;
      updateUI();
      setTimeout(() => {
        s.isReturning = false;
      }, 400);
    }

    function onWheel(e: WheelEvent) {
      console.log("[SwipeArcs] wheel event:", { deltaX: e.deltaX, deltaY: e.deltaY, scrollX: window.scrollX });

      if (s.isReturning) return;

      if (window.scrollX === 0 && e.deltaX < 0) {
        s.accLeft += Math.abs(e.deltaX);
        s.accRight = 0;
        console.log("[SwipeArcs] LEFT arc accumulating:", s.accLeft);
      } else if (
        Math.ceil(window.scrollX + window.innerWidth) >=
          document.documentElement.scrollWidth &&
        e.deltaX > 0
      ) {
        s.accRight += Math.abs(e.deltaX);
        s.accLeft = 0;
        console.log("[SwipeArcs] RIGHT arc accumulating:", s.accRight);
      } else if (s.accLeft > 0 || s.accRight > 0) {
        reset();
      }

      requestAnimationFrame(updateUI);

      window.clearTimeout(s.timeout);
      s.timeout = window.setTimeout(() => {
        if (!s.isReturning && (s.accLeft > 0 || s.accRight > 0)) reset();
      }, 150);
    }

    function onMouseDown() {
      reset();
    }

    function onTouchStart() {
      reset();
    }

    window.addEventListener("wheel", onWheel, { passive: true });
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("touchstart", onTouchStart);

    console.log("[SwipeArcs] Component mounted, wheel listener attached");

    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("touchstart", onTouchStart);
      window.clearTimeout(s.timeout);
      console.log("[SwipeArcs] Component unmounted");
    };
  }, []);

  return (
    <>
      {/* DEBUG: visible indicator to confirm component renders */}
      <div
        style={{
          position: "fixed",
          bottom: 10,
          left: 10,
          background: "red",
          color: "white",
          padding: "4px 8px",
          fontSize: 10,
          zIndex: 99999,
          pointerEvents: "none",
        }}
      >
        SwipeArcs loaded
      </div>
      <div className="swipe-edge swipe-edge-left" aria-hidden="true">
        <div
          ref={leftRef}
          className="glow-arc"
          id="arc-left"
        />
      </div>
      <div className="swipe-edge swipe-edge-right" aria-hidden="true">
        <div
          ref={rightRef}
          className="glow-arc"
          id="arc-right"
        />
      </div>
    </>
  );
}