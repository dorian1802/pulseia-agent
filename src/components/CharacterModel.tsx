"use client";

import { useRef, useMemo } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface Props {
  scrollProgress: React.RefObject<number>;
}

const DESKTOP_KEYFRAMES = [
  { pos: [0, -0.8, 0] as const, rot: [0, 0, 0] as const, scale: 1.0 },
  { pos: [-1.8, -0.8, 0] as const, rot: [0, 0.3, 0] as const, scale: 0.85 },
  { pos: [1.8, -0.8, 0] as const, rot: [0, -0.3, 0] as const, scale: 0.85 },
  { pos: [0, -0.8, 0] as const, rot: [0, 0.5, 0] as const, scale: 0.8 },
  { pos: [-2, -0.8, 0] as const, rot: [0, 0.2, 0] as const, scale: 0.8 },
  { pos: [2, -0.8, 0] as const, rot: [0, -0.2, 0] as const, scale: 0.8 },
  { pos: [0, -0.8, 0] as const, rot: [0, 0, 0] as const, scale: 0.9 },
];

const MOBILE_KEYFRAMES = [
  { pos: [0, 0.5, -1] as const, rot: [0, 0, 0] as const, scale: 0.5 },
  { pos: [0, 0.5, -1] as const, rot: [0, 0.3, 0] as const, scale: 0.45 },
  { pos: [0, 0.5, -1] as const, rot: [0, -0.3, 0] as const, scale: 0.45 },
  { pos: [0, 0.5, -1] as const, rot: [0, 0.5, 0] as const, scale: 0.4 },
  { pos: [0, 0.5, -1] as const, rot: [0, 0.2, 0] as const, scale: 0.4 },
  { pos: [0, 0.5, -1] as const, rot: [0, -0.2, 0] as const, scale: 0.4 },
  { pos: [0, 0.5, -1] as const, rot: [0, 0, 0] as const, scale: 0.45 },
];

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function smoothstep(t: number) {
  return t * t * (3 - 2 * t);
}

export function CharacterModel({ scrollProgress }: Props) {
  const groupRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF("/models/character.glb");
  const isMobileRef = useRef(false);

  useMemo(() => {
    if (typeof window !== "undefined") {
      isMobileRef.current = window.innerWidth < 768;
      const onResize = () => { isMobileRef.current = window.innerWidth < 768; };
      window.addEventListener("resize", onResize);
      return () => window.removeEventListener("resize", onResize);
    }
  }, []);

  const targetPos = useMemo(() => new THREE.Vector3(), []);
  const targetQuat = useMemo(() => new THREE.Quaternion(), []);
  const tempEuler = useMemo(() => new THREE.Euler(), []);
  const currentQuat = useMemo(() => new THREE.Quaternion(), []);

  useFrame((state) => {
    if (!groupRef.current) return;

    const progress = scrollProgress?.current ?? 0;
    const kf = isMobileRef.current ? MOBILE_KEYFRAMES : DESKTOP_KEYFRAMES;
    const sectionFloat = progress * (kf.length - 1);
    const idx = Math.min(Math.floor(sectionFloat), kf.length - 2);
    const t = smoothstep(sectionFloat - idx);

    const from = kf[idx];
    const to = kf[idx + 1];

    targetPos.set(
      lerp(from.pos[0], to.pos[0], t),
      lerp(from.pos[1], to.pos[1], t),
      lerp(from.pos[2], to.pos[2], t)
    );

    const s = lerp(from.scale, to.scale, t);
    groupRef.current.scale.setScalar(s);

    // Rotation with idle bob
    const idleTime = state.clock.elapsedTime;
    const idleBob = Math.sin(idleTime * 1.5) * 0.02;
    const idleBreath = Math.sin(idleTime * 2) * 0.005;

    tempEuler.set(
      lerp(from.rot[0], to.rot[0], t) + idleBreath,
      lerp(from.rot[1], to.rot[1], t),
      lerp(from.rot[2], to.rot[2], t)
    );
    targetQuat.setFromEuler(tempEuler);

    groupRef.current.position.lerp(targetPos, 0.08);
    groupRef.current.position.y += idleBob;

    currentQuat.setFromEuler(groupRef.current.rotation);
    currentQuat.slerp(targetQuat, 0.08);
    groupRef.current.rotation.setFromQuaternion(currentQuat);
  });

  return (
    <group ref={groupRef}>
      <primitive object={scene} />
    </group>
  );
}

useGLTF.preload("/models/character.glb");