"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial, PointsProps } from "@react-three/drei";
import * as THREE from "three";

function NetworkStars(props: Partial<PointsProps>) {
  const ref = useRef<THREE.Points>(null);
  
  // Generate random data points for the particle system
  // Creating a sphere-like distribution of data points
  const sphere = useMemo(() => {
    const data = new Float32Array(5000 * 3);
    let seed = 42;
    const random = () => {
      const x = Math.sin(seed++) * 10000;
      return x - Math.floor(x);
    };
    for (let i = 0; i < 5000; i++) {
      const r = 1.5 * Math.cbrt(random());
      const theta = random() * 2 * Math.PI;
      const phi = Math.acos(2 * random() - 1);
      data[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      data[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      data[i * 3 + 2] = r * Math.cos(phi);
    }
    return data;
  }, []);

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 10;
      ref.current.rotation.y -= delta / 15;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false} {...props}>
        <PointMaterial
          transparent
          color="#4f46e5"
          size={0.006}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={0.8}
        />
      </Points>
    </group>
  );
}

export default function ParticleNetwork() {
  return (
    <div className="absolute inset-0 -z-20 h-full w-full opacity-60">
      <Canvas camera={{ position: [0, 0, 1] }}>
        <NetworkStars />
      </Canvas>
    </div>
  );
}
