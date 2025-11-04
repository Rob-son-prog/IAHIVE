"use client";

import * as React from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function RingPoints({
  count,
  radius,
  size = 0.28,
  hueA = 275,
  hueB = 190,
}: {
  count: number;
  radius: number;
  size?: number;
  hueA?: number;
  hueB?: number;
}) {
  const geometry = React.useMemo(() => {
    const g = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const a = (i / count) * Math.PI * 2;
      const r = radius * (0.9 + Math.random() * 0.2);
      const x = Math.cos(a) * r + (Math.random() - 0.5) * 0.7;
      const y = (Math.random() - 0.5) * 0.5;
      const z = Math.sin(a) * r + (Math.random() - 0.5) * 0.7;

      const i3 = i * 3;
      positions[i3 + 0] = x;
      positions[i3 + 1] = y;
      positions[i3 + 2] = z;

      const t = i / count;
      const hue = hueA * (1 - t) + hueB * t;
      const col = new THREE.Color().setHSL(hue / 360, 0.9, 0.62);
      colors[i3 + 0] = col.r;
      colors[i3 + 1] = col.g;
      colors[i3 + 2] = col.b;
    }

    g.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    g.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    return g;
  }, [count, radius, hueA, hueB]);

  const material = React.useMemo(
    () =>
      new THREE.PointsMaterial({
        size,
        sizeAttenuation: true,
        vertexColors: true,
        transparent: true,
        depthWrite: false,
        opacity: 0.95,
        blending: THREE.AdditiveBlending,
      }),
    [size]
  );

  return <points geometry={geometry} material={material} />;
}

function Scene() {
  const group = React.useRef<THREE.Group>(null!);
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (group.current) {
      group.current.rotation.z = t * 0.05;
      group.current.rotation.x = Math.sin(t * 0.25) * 0.12;
    }
  });
  return (
    <group ref={group} scale={1.2}>
      <RingPoints count={1200} radius={7.2} size={0.26} />
      <RingPoints count={1800} radius={11.5} size={0.2} />
    </group>
  );
}

export default function ParticleRing() {
  React.useEffect(() => {
    console.log("[IA.HIVE] ParticleRing montado");
  }, []);

  return (
    <Canvas
      dpr={[1, 2]}
      camera={{ position: [0, 0, 12], fov: 60 }}
      gl={{ antialias: true, alpha: true, premultipliedAlpha: true }}
      style={{ background: "rgba(80, 0, 120, 0.08)" }}  // fundo TEMPORÁRIO só para validar render
      className="h-full w-full"
    >
      <ambientLight intensity={0.25} />
      <directionalLight position={[3, 5, 2]} intensity={0.9} />
      <Scene />
    </Canvas>
  );
}
