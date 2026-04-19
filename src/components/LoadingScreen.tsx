"use client";

import { useState, useEffect } from "react";
import { useProgress } from "@react-three/drei";

export function LoadingScreen() {
  const { progress, active } = useProgress();
  const [show, setShow] = useState(true);

  useEffect(() => {
    if (!active && progress === 100) {
      const timer = setTimeout(() => setShow(false), 600);
      return () => clearTimeout(timer);
    }
  }, [active, progress]);

  if (!show) return null;

  return (
    <div
      className={`fixed inset-0 z-50 bg-dark flex items-center justify-center transition-opacity duration-500 ${
        progress === 100 ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <div className="text-center">
        <p className="font-display text-3xl text-white font-light mb-6 tracking-widest">
          PULSEIA
        </p>
        <div className="w-48 h-0.5 bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-accent transition-all duration-300 rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-white/30 text-xs mt-3 font-mono">{Math.round(progress)}%</p>
      </div>
    </div>
  );
}