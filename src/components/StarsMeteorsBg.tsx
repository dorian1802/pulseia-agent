"use client";

import { useEffect, useRef, useCallback } from "react";

interface Meteor {
  x: number;
  y: number;
  len: number;
  speed: number;
  angle: number;
  opacity: number;
  thickness: number;
}

function generateStarShadows(count: number, w: number, h: number): string {
  const shadows: string[] = [];
  for (let i = 0; i < count; i++) {
    const x = Math.floor(Math.random() * w);
    const y = Math.floor(Math.random() * h);
    shadows.push(`${x}px ${y}px #fff`);
  }
  return shadows.join(", ");
}

export function StarsMeteorsBg() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const meteorsRef = useRef<Meteor[]>([]);
  const stars1Ref = useRef<HTMLDivElement>(null);
  const stars2Ref = useRef<HTMLDivElement>(null);
  const stars3Ref = useRef<HTMLDivElement>(null);
  const speedRef = useRef(1);

  const createMeteor = useCallback((w: number, h: number): Meteor => {
    const fromTop = Math.random() < 0.7;
    return {
      x: fromTop ? Math.random() * w * 1.2 - w * 0.1 : -20,
      y: fromTop ? -20 : Math.random() * h * 0.5,
      len: 60 + Math.random() * 120,
      speed: 0.3 + Math.random() * 0.5,
      angle: Math.PI / 5 + Math.random() * 0.3,
      opacity: 0.3 + Math.random() * 0.5,
      thickness: 0.5 + Math.random() * 1,
    };
  }, []);

  // Scroll speed multiplier for stars
  useEffect(() => {
    const baseDurations = [800, 600, 400]; // sm, md, lg
    const onScroll = () => {
      const velocity = Math.min(window.scrollY / 800, 3);
      speedRef.current = 1 + velocity;
      const layers = document.querySelectorAll(".stars-drift");
      layers.forEach((el, i) => {
        const base = baseDurations[i] || 180;
        (el as HTMLElement).style.animationDuration = `${base / speedRef.current}s, ${(8 - i) / speedRef.current}s`;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const w = window.innerWidth;
    const h = window.innerHeight;
    canvas.width = w;
    canvas.height = h;

    meteorsRef.current = Array.from({ length: 1 }, () => createMeteor(w, h));

    const animate = () => {
      ctx.clearRect(0, 0, w, h);

      const meteors = meteorsRef.current;
      const speed = speedRef.current;
      for (let i = 0; i < meteors.length; i++) {
        const m = meteors[i];
        m.x += Math.cos(m.angle) * m.speed * speed;
        m.y += Math.sin(m.angle) * m.speed * speed;

        const tailX = m.x - Math.cos(m.angle) * m.len;
        const tailY = m.y - Math.sin(m.angle) * m.len;

        const grad = ctx.createLinearGradient(m.x, m.y, tailX, tailY);
        grad.addColorStop(0, `rgba(255,255,255,${m.opacity})`);
        grad.addColorStop(0.3, `rgba(167,139,250,${m.opacity * 0.6})`);
        grad.addColorStop(1, `rgba(167,139,250,0)`);

        ctx.beginPath();
        ctx.moveTo(m.x, m.y);
        ctx.lineTo(tailX, tailY);
        ctx.strokeStyle = grad;
        ctx.lineWidth = m.thickness;
        ctx.stroke();

        if (m.y > h + 50 || m.x > w + 50 || m.x < -200) {
          meteors[i] = createMeteor(w, h);
        }
      }

      if (Math.random() < 0.002 && meteors.length < 3) {
        meteors.push(createMeteor(w, h));
      }

      animRef.current = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(animRef.current);
  }, [createMeteor]);

  useEffect(() => {
    const w = 4000;
    const h = 2000;

    const s1 = stars1Ref.current;
    const s2 = stars2Ref.current;
    const s3 = stars3Ref.current;
    if (!s1 || !s2 || !s3) return;

    s1.style.boxShadow = generateStarShadows(600, w, h);
    s2.style.boxShadow = generateStarShadows(200, w, h);
    s3.style.boxShadow = generateStarShadows(80, w, h);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Stars - 3 parallax layers drifting left */}
      <div className="stars-drift stars-drift-sm absolute top-0 left-0 w-full h-[2000px]">
        <div
          ref={stars1Ref}
          className="absolute rounded-full bg-transparent"
          style={{ width: 1, height: 1 }}
        />
      </div>
      <div className="stars-drift stars-drift-md absolute top-0 left-0 w-full h-[2000px]">
        <div
          ref={stars2Ref}
          className="absolute rounded-full bg-transparent"
          style={{ width: 2, height: 2 }}
        />
      </div>
      <div className="stars-drift stars-drift-lg absolute top-0 left-0 w-full h-[2000px]">
        <div
          ref={stars3Ref}
          className="absolute rounded-full bg-transparent"
          style={{ width: 3, height: 3 }}
        />
      </div>

      {/* Meteors - canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
      />
    </div>
  );
}