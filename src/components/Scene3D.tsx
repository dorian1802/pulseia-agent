"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, ContactShadows, AdaptiveDpr } from "@react-three/drei";
import { CharacterModel } from "./CharacterModel";

interface Props {
  scrollProgress: React.RefObject<number>;
}

export function Scene3D({ scrollProgress }: Props) {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 4], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
      >
        <AdaptiveDpr pixelated />
        <Suspense fallback={null}>
          <CharacterModel scrollProgress={scrollProgress} />
          <Environment preset="studio" />
          <ContactShadows position={[0, -1.5, 0]} opacity={0.3} scale={10} />
        </Suspense>
      </Canvas>
    </div>
  );
}