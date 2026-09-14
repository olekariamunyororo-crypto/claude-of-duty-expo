import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import { PhysicsWorld } from '../physics/PhysicsWorld';
import { MapColliders } from '../physics/Colliders';
import { MapScene } from './Map';
import { Player } from './Player';
import { Bots } from '../ai/Bots';
import { useGameStore } from '../store/gameStore';
import { useFrame as useStoreFrame } from 'react';
import { useEffect } from 'react';

function SimTicker() {
  const tick = useGameStore((s) => s.tick);
  useEffect(() => {
    let last = performance.now();
    let raf = 0;
    const loop = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      tick(dt);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [tick]);
  return null;
}

export function GameCanvas() {
  return (
    <>
      <SimTicker />
      <Canvas
        style={{ flex: 1 }}
        camera={{ fov: 75, near: 0.05, far: 300, position: [0, 1.6, 8] }}
        gl={{ antialias: true, powerPreference: 'high-performance' }}
      >
        <color attach="background" args={['#0b1220']} />
        <fog attach="fog" args={['#0b1220', 40, 120]} />
        <ambientLight intensity={0.35} />
        <directionalLight position={[20, 30, 10]} intensity={1.1} castShadow />
        <Suspense fallback={null}>
          <PhysicsWorld>
            <MapColliders />
            <MapScene />
            <Player />
            <Bots />
          </PhysicsWorld>
        </Suspense>
      </Canvas>
    </>
  );
}
