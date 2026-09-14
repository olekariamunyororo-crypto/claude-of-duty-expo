import { useRef, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { createBots, updateBot, Bot } from './BotAI';
import { useGameStore } from '../store/gameStore';
import { WORLD } from '../world';

export function Bots() {
  const bots = useRef<Bot[]>(createBots(WORLD.maxBots));
  const group = useRef<THREE.Group>(null);
  const setBots = useGameStore((s) => s.setBots);

  useEffect(() => {
    setBots(
      bots.current.map((b) => ({
        id: b.id,
        name: b.name,
        x: b.position.x,
        y: b.position.y,
        z: b.position.z,
        yaw: b.yaw,
        health: b.health,
        alive: b.alive,
      })),
    );
  }, []);

  useFrame((_, dt) => {
    const player = useGameStore.getState();
    const now = performance.now() / 1000;
    const pos = new THREE.Vector3(player.playerX, player.playerY, player.playerZ);
    for (const b of bots.current) {
      updateBot(b, pos, dt, now);
    }
    setBots(
      bots.current.map((b) => ({
        id: b.id,
        name: b.name,
        x: b.position.x,
        y: b.position.y,
        z: b.position.z,
        yaw: b.yaw,
        health: b.health,
        alive: b.alive,
      })),
    );
  });

  return (
    <group ref={group}>
      {bots.current.map((b) =>
        b.alive ? (
          <mesh key={b.id} position={b.position.toArray()} rotation={[0, b.yaw, 0]} userData={{ botId: b.id }}>
            <capsuleGeometry args={[0.35, 0.9, 4, 8]} />
            <meshStandardMaterial color="#b91c1c" />
            {/* head hitbox marker */}
            <mesh position={[0, 1.05, 0]} userData={{ botId: b.id, isHead: true }}>
              <sphereGeometry args={[0.22, 8, 8]} />
              <meshStandardMaterial color="#7f1d1d" />
            </mesh>
          </mesh>
        ) : null,
      )}
    </group>
  );
}
