"use client";

import { useEffect, useRef } from "react";

export function CursorGlow() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let mouse = { x: -1000, y: -1000 };

    function resize() {
      canvas!.width = window.innerWidth;
      canvas!.height = window.innerHeight;
    }

    function handleMouse(e: MouseEvent) {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    }

    function draw() {
      ctx!.clearRect(0, 0, canvas!.width, canvas!.height);

      const radius = 400;
      const gradient = ctx!.createRadialGradient(
        mouse.x, mouse.y, 0,
        mouse.x, mouse.y, radius
      );

      gradient.addColorStop(0, "rgba(167, 139, 250, 0.07)");
      gradient.addColorStop(0.2, "rgba(124, 58, 237, 0.04)");
      gradient.addColorStop(0.5, "rgba(139, 92, 246, 0.02)");
      gradient.addColorStop(1, "rgba(0, 0, 0, 0)");

      ctx!.fillStyle = gradient;
      ctx!.beginPath();
      ctx!.arc(mouse.x, mouse.y, radius, 0, Math.PI * 2);
      ctx!.fill();

      requestAnimationFrame(draw);
    }

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", handleMouse);
    resize();
    draw();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouse);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="cursor-glow"
      className="fixed inset-0 w-full h-full pointer-events-none z-[100]"
      style={{ mixBlendMode: "screen" }}
    />
  );
}