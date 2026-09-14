import * as THREE from 'three';
import { SPAWNS, randomSpawn } from '../world';

export interface Bot {
  id: number;
  name: string;
  position: THREE.Vector3;
  yaw: number;
  health: number;
  alive: boolean;
  targetId: number | null;
  state: 'idle' | 'patrol' | 'chase' | 'attack' | 'dead';
  nextThink: number;
}

const NAMES = ['Bot-Alpha', 'Bot-Bravo', 'Bot-Charlie', 'Bot-Delta', 'Bot-Echo', 'Bot-Foxtrot'];

export function createBots(count: number): Bot[] {
  const bots: Bot[] = [];
  for (let i = 0; i < count; i++) {
    const spawn = SPAWNS[i % SPAWNS.length];
    bots.push({
      id: i + 1,
      name: NAMES[i % NAMES.length],
      position: new THREE.Vector3(spawn.x, spawn.y, spawn.z),
      yaw: Math.random() * Math.PI * 2,
      health: 100,
      alive: true,
      targetId: null,
      state: 'patrol',
      nextThink: 0,
    });
  }
  return bots;
}

export function updateBot(bot: Bot, playerPos: THREE.Vector3, dt: number, now: number) {
  if (!bot.alive) return;
  if (now < bot.nextThink) {
    // continue current motion
    const speed = bot.state === 'chase' ? 4.2 : 2.2;
    bot.position.x += Math.sin(bot.yaw) * speed * dt;
    bot.position.z += Math.cos(bot.yaw) * speed * dt;
    return;
  }
  bot.nextThink = now + 0.4 + Math.random() * 0.6;

  const dx = playerPos.x - bot.position.x;
  const dz = playerPos.z - bot.position.z;
  const dist = Math.hypot(dx, dz);

  if (dist < 18) {
    bot.state = dist < 8 ? 'attack' : 'chase';
    bot.yaw = Math.atan2(dx, dz);
  } else {
    bot.state = 'patrol';
    bot.yaw += (Math.random() - 0.5) * 1.2;
  }
}

export function damageBot(bot: Bot, amount: number, headshot = false) {
  if (!bot.alive) return false;
  bot.health -= amount * (headshot ? 1.5 : 1);
  if (bot.health <= 0) {
    bot.alive = false;
    bot.state = 'dead';
    bot.health = 0;
    return true;
  }
  return false;
}

export function respawnBot(bot: Bot) {
  const spawn = randomSpawn();
  bot.position.set(spawn.x, spawn.y, spawn.z);
  bot.health = 100;
  bot.alive = true;
  bot.state = 'patrol';
  bot.yaw = Math.random() * Math.PI * 2;
}
