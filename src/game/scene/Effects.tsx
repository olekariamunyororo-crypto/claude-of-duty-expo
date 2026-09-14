import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface MuzzleFlashProps {
  active: boolean;
}

export function MuzzleFlash({ active }: MuzzleFlashProps) {
  const light = useRef<THREE.PointLight>(null);
  useFrame(() => {
    if (!light.current) return;
    light.current.intensity = active ? 4 + Math.random() * 3 : 0;
  });
  return <pointLight ref={light} color="#ffcc66" distance={6} position={[0.2, -0.05, -0.6]} />;
}

export function BulletTracer({ from, to }: { from: THREE.Vector3; to: THREE.Vector3 }) {
  const dir = to.clone().sub(from);
  const len = dir.length();
  const mid = from.clone().add(dir.multiplyScalar(0.5));
  return (
    <mesh position={mid.toArray()}>
      <cylinderGeometry args={[0.01, 0.01, len, 4]} />
      <meshBasicMaterial color="#fef08a" transparent opacity={0.7} />
    </mesh>
  );
}
