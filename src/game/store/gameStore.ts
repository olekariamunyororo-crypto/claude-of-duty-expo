import { create } from 'zustand';
import { randomSpawn, WORLD } from '../world';

export type Phase = 'menu' | 'countdown' | 'playing' | 'paused' | 'dead' | 'gameover';

export interface KillfeedEntry {
  id: number;
  killer: string;
  victim: string;
  weapon?: string;
  headshot?: boolean;
  t: number;
}

export interface BotState {
  id: number;
  name: string;
  x: number;
  y: number;
  z: number;
  yaw: number;
  health: number;
  alive: boolean;
}

interface GameState {
  phase: Phase;
  countdown: number;
  health: number;
  ammo: number;
  reserveAmmo: number;
  playerX: number;
  playerY: number;
  playerZ: number;
  playerYaw: number;
  playerPitch: number;
  score: { kills: number; deaths: number };
  killfeed: KillfeedEntry[];
  bots: BotState[];
  hitMarker: boolean;
  damageFlash: number;
  respawnTimer: number;
  matchTime: number;

  startMatch: () => void;
  pause: () => void;
  resume: () => void;
  quitToMenu: () => void;
  setPhase: (p: Phase) => void;
  applyDamage: (amount: number) => void;
  addKill: (killer: string, victim: string) => void;
  setPlayerPose: (x: number, y: number, z: number, yaw: number, pitch: number) => void;
  setAmmo: (ammo: number, reserve: number) => void;
  tick: (dt: number) => void;
  setHitMarker: (v: boolean) => void;
  setBots: (bots: BotState[]) => void;
}

let feedId = 0;

export const useGameStore = create<GameState>((set, get) => ({
  phase: 'menu',
  countdown: 3,
  health: 100,
  ammo: 30,
  reserveAmmo: 90,
  playerX: 0,
  playerY: 1.2,
  playerZ: 8,
  playerYaw: 0,
  playerPitch: 0,
  score: { kills: 0, deaths: 0 },
  killfeed: [],
  bots: [],
  hitMarker: false,
  damageFlash: 0,
  respawnTimer: 0,
  matchTime: WORLD.matchDuration,

  startMatch: () => {
    const spawn = randomSpawn();
    set({
      phase: 'countdown',
      countdown: 3,
      health: 100,
      ammo: 30,
      reserveAmmo: 90,
      playerX: spawn.x,
      playerY: spawn.y,
      playerZ: spawn.z,
      playerYaw: 0,
      playerPitch: 0,
      score: { kills: 0, deaths: 0 },
      killfeed: [],
      hitMarker: false,
      damageFlash: 0,
      respawnTimer: 0,
      matchTime: WORLD.matchDuration,
    });
  },

  pause: () => set({ phase: 'paused' }),
  resume: () => set({ phase: 'playing' }),
  quitToMenu: () => set({ phase: 'menu' }),
  setPhase: (p) => set({ phase: p }),

  applyDamage: (amount) => {
    const s = get();
    if (s.phase !== 'playing') return;
    const hp = Math.max(0, s.health - amount);
    set({ health: hp, damageFlash: Math.min(1, amount / 40) });
    if (hp <= 0) {
      set({
        phase: 'dead',
        respawnTimer: WORLD.respawnDelay,
        score: { ...s.score, deaths: s.score.deaths + 1 },
      });
    }
  },

  addKill: (killer, victim) => {
    const s = get();
    const entry: KillfeedEntry = { id: ++feedId, killer, victim, t: Date.now() };
    const kills = killer === 'You' ? s.score.kills + 1 : s.score.kills;
    set({
      killfeed: [entry, ...s.killfeed].slice(0, 8),
      score: { ...s.score, kills },
      hitMarker: killer === 'You',
    });
    setTimeout(() => set({ hitMarker: false }), 200);
  },

  setPlayerPose: (x, y, z, yaw, pitch) => set({ playerX: x, playerY: y, playerZ: z, playerYaw: yaw, playerPitch: pitch }),
  setAmmo: (ammo, reserve) => set({ ammo, reserveAmmo: reserve }),
  setHitMarker: (v) => set({ hitMarker: v }),
  setBots: (bots) => set({ bots }),

  tick: (dt) => {
    const s = get();
    if (s.phase === 'countdown') {
      const c = s.countdown - dt;
      if (c <= 0) set({ phase: 'playing', countdown: 0 });
      else set({ countdown: c });
      return;
    }
    if (s.phase === 'dead') {
      const t = s.respawnTimer - dt;
      if (t <= 0) {
        const spawn = randomSpawn({ x: s.playerX, z: s.playerZ });
        set({
          phase: 'playing',
          health: 100,
          playerX: spawn.x,
          playerY: spawn.y,
          playerZ: spawn.z,
          respawnTimer: 0,
          damageFlash: 0,
        });
      } else set({ respawnTimer: t });
      return;
    }
    if (s.phase === 'playing') {
      const mt = s.matchTime - dt;
      const flash = Math.max(0, s.damageFlash - dt * 2);
      if (mt <= 0) set({ phase: 'gameover', matchTime: 0, damageFlash: flash });
      else set({ matchTime: mt, damageFlash: flash });
    }
  },
}));
