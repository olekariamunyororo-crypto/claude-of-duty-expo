import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface LiveGrenade {
  id: number;
  position: THREE.Vector3;
  velocity: THREE.Vector3;
  fuse: number;
}

let gid = 0;
const live: LiveGrenade[] = [];

export function throwGrenade(origin: THREE.Vector3, direction: THREE.Vector3) {
  live.push({
    id: ++gid,
    position: origin.clone(),
    velocity: direction.clone().normalize().multiplyScalar(14).add(new THREE.Vector3(0, 4, 0)),
    fuse: 2.2,
  });
}

export function Grenades() {
  const group = useRef<THREE.Group>(null);

  useFrame((_, dt) => {
    for (let i = live.length - 1; i >= 0; i--) {
      const g = live[i];
      g.velocity.y -= 18 * dt;
      g.position.addScaledVector(g.velocity, dt);
      if (g.position.y < 0.2) {
        g.position.y = 0.2;
        g.velocity.y *= -0.3;
        g.velocity.x *= 0.7;
        g.velocity.z *= 0.7;
      }
      g.fuse -= dt;
      if (g.fuse <= 0) {
        // explosion handled by game logic / damage radius in a full implementation
        live.splice(i, 1);
      }
    }
  });

  return (
    <group ref={group}>
      {live.map((g) => (
        <mesh key={g.id} position={g.position.toArray()}>
          <sphereGeometry args={[0.12, 8, 8]} />
          <meshStandardMaterial color="#14532d" />
        </mesh>
      ))}
    </group>
  );
}
