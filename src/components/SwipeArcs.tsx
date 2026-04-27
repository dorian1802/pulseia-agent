"use client";

import { useEffect } from "react";

export function SwipeArcs() {
  useEffect(() => {
    // Inject CSS
    const style = document.createElement("style");
    style.textContent = `
      .swipe-edge {
        position: fixed;
        top: 0;
        bottom: 0;
        width: 200px;
        pointer-events: none;
        z-index: 10000;
        display: flex;
        align-items: center;
      }
      .swipe-edge-left { left: 0; }
      .swipe-edge-right { right: 0; justify-content: flex-end; }
      .glow-arc {
        height: 45vh;
        width: 15px;
        filter: blur(15px);
        opacity: 0;
        transition: opacity 0.2s ease-out, transform 0.1s ease-out;
        will-change: transform, opacity;
      }
      .glow-arc-left {
        background: linear-gradient(to bottom, transparent, #ef4444, #991b1b, transparent);
        border-radius: 0 100% 100% 0;
        transform: translateX(-50px) scaleY(0.8);
        box-shadow: 0 0 50px rgba(239, 68, 68, 0.4);
      }
      .glow-arc-right {
        background: linear-gradient(to bottom, transparent, #3b82f6, #1e40af, transparent);
        border-radius: 100% 0 0 100%;
        transform: translateX(50px) scaleY(0.8);
        box-shadow: 0 0 50px rgba(59, 130, 246, 0.4);
      }
      @keyframes pulse-red {
        0%, 100% { filter: blur(15px) brightness(1); }
        50% { filter: blur(25px) brightness(1.8); }
      }
      @keyframes pulse-blue {
        0%, 100% { filter: blur(15px) brightness(1); }
        50% { filter: blur(25px) brightness(1.8); }
      }
      .active-red { animation: pulse-red 1s infinite ease-in-out; }
      .active-blue { animation: pulse-blue 1s infinite ease-in-out; }
    `;
    document.head.appendChild(style);

    // Inject HTML
    const leftEdge = document.createElement("div");
    leftEdge.className = "swipe-edge swipe-edge-left";
    const arcLeft = document.createElement("div");
    arcLeft.className = "glow-arc glow-arc-left";
    leftEdge.appendChild(arcLeft);

    const rightEdge = document.createElement("div");
    rightEdge.className = "swipe-edge swipe-edge-right";
    const arcRight = document.createElement("div");
    arcRight.className = "glow-arc glow-arc-right";
    rightEdge.appendChild(arcRight);

    document.body.appendChild(leftEdge);
    document.body.appendChild(rightEdge);

    // JS logic (same as reference)
    const SENSITIVITY = 0.6;
    const THRESHOLD = 65;
    const MAX_PULL = 90;
    let accLeft = 0;
    let accRight = 0;
    let isReturning = false;
    let timeout: ReturnType<typeof setTimeout>;

    function updateUI() {
      if (accLeft > 0) {
        const pull = Math.min(accLeft * SENSITIVITY, MAX_PULL);
        const opacity = Math.min(accLeft / 50, 1);
        arcLeft.style.opacity = String(opacity);
        arcLeft.style.transform = `translateX(${pull - 50}px) scaleY(${0.8 + pull / 400})`;
        if (pull > THRESHOLD) arcLeft.classList.add("active-red");
        else arcLeft.classList.remove("active-red");
      } else {
        arcLeft.style.opacity = "0";
        arcLeft.style.transform = "translateX(-50px) scaleY(0.8)";
        arcLeft.classList.remove("active-red");
      }

      if (accRight > 0) {
        const pull = Math.min(accRight * SENSITIVITY, MAX_PULL);
        const opacity = Math.min(accRight / 50, 1);
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
      isReturning = true;
      accLeft = 0;
      accRight = 0;
      updateUI();
      setTimeout(() => {
        isReturning = false;
      }, 400);
    }

    function onWheel(e: WheelEvent) {
      if (isReturning) return;

      if (window.scrollX === 0 && e.deltaX < 0) {
        accLeft += Math.abs(e.deltaX);
        accRight = 0;
      } else if (
        Math.ceil(window.scrollX + window.innerWidth) >=
          document.documentElement.scrollWidth &&
        e.deltaX > 0
      ) {
        accRight += Math.abs(e.deltaX);
        accLeft = 0;
      } else if (accLeft > 0 || accRight > 0) {
        reset();
      }

      requestAnimationFrame(updateUI);

      clearTimeout(timeout);
      timeout = setTimeout(() => {
        if (!isReturning && (accLeft > 0 || accRight > 0)) reset();
      }, 150);
    }

    function onMouseDown() {
      reset();
    }

    function onTouchStart() {
      reset();
    }

    window.addEventListener("wheel", onWheel, { passive: true, capture: true });
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("touchstart", onTouchStart);

    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("touchstart", onTouchStart);
      clearTimeout(timeout);
      style.remove();
      leftEdge.remove();
      rightEdge.remove();
    };
  }, []);

  return null;
}