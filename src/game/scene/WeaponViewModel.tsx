import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { makeRiflePlaceholder } from '../utils/ProceduralGeometry';

export function WeaponViewModel({ ads }: { ads: boolean }) {
  const ref = useRef<THREE.Group>(null);
  const model = useRef(makeRiflePlaceholder());

  useFrame((_, dt) => {
    if (!ref.current) return;
    const targetX = ads ? 0.05 : 0.18;
    const targetY = ads ? -0.08 : -0.14;
    const targetZ = ads ? -0.35 : -0.45;
    ref.current.position.x += (targetX - ref.current.position.x) * Math.min(1, 12 * dt);
    ref.current.position.y += (targetY - ref.current.position.y) * Math.min(1, 12 * dt);
    ref.current.position.z += (targetZ - ref.current.position.z) * Math.min(1, 12 * dt);
  });

  return (
    <group ref={ref} position={[0.18, -0.14, -0.45]}>
      <primitive object={model.current} />
    </group>
  );
}
