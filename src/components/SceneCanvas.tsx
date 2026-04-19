"use client";

import { Suspense, type RefObject, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, ContactShadows, AdaptiveDpr, useProgress } from "@react-three/drei";
import { CharacterModel } from "@/components/CharacterModel";

function Loader() {
  const { progress, active } = useProgress();
  const [show, setShow] = useState(true);

  useEffect(() => {
    if (!active && progress === 100) {
      const t = setTimeout(() => setShow(false), 600);
      return () => clearTimeout(t);
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
        <p className="font-display text-3xl text-white font-light mb-6 tracking-widest">PULSEIA</p>
        <div className="w-48 h-0.5 bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-accent transition-all duration-300 rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-white/30 text-xs mt-3">{Math.round(progress)}%</p>
      </div>
    </div>
  );
}

function SceneContent({ scrollProgress }: { scrollProgress: RefObject<number> }) {
  return (
    <>
      <AdaptiveDpr pixelated />
      <Suspense fallback={null}>
        <CharacterModel scrollProgress={scrollProgress} />
        <Environment preset="studio" />
        <ContactShadows position={[0, -1.5, 0]} opacity={0.3} scale={10} />
      </Suspense>
    </>
  );
}

export function SceneCanvas({ scrollProgress }: { scrollProgress: RefObject<number> }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <>
      <Loader />
      <div className="fixed inset-0 z-0 pointer-events-none">
        <Canvas
          camera={{ position: [0, 0, 4], fov: 45 }}
          dpr={[1, 1.5]}
          gl={{ antialias: true, alpha: true }}
          onCreated={({ gl }) => {
            gl.setClearColor(0x000000, 0);
          }}
        >
          <SceneContent scrollProgress={scrollProgress} />
        </Canvas>
      </div>
    </>
  );
}