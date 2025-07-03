"use client";

import dynamic from "next/dynamic";
import type { ComponentType } from "react";

interface MouseParticlesProps {
  g?: number;
  num?: number;
  color?: string;
  cull?: string;
  level?: number;
}

const MouseParticles = dynamic(
  () =>
    import("react-mouse-particles").then(
      (mod) => mod.default as ComponentType<MouseParticlesProps>
    ),
  { ssr: false }
);

export default function ParticlesCursor() {
  return (
    <MouseParticles g={1} num={6} color="#50362F" cull="nav,footer" level={6} />
  );
}
