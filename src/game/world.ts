/** Shared world constants for Hijacked-style yacht map. */

export const WORLD = {
  waterY: -0.5,
  deckY: 0,
  gravity: -18,
  matchDuration: 180, // seconds
  respawnDelay: 3,
  maxBots: 6,
};

export const SPAWNS = [
  { x: 0, y: 1.2, z: 8 },
  { x: 12, y: 1.2, z: -4 },
  { x: -10, y: 1.2, z: -6 },
  { x: 6, y: 1.2, z: 14 },
  { x: -8, y: 1.2, z: 10 },
  { x: 2, y: 1.2, z: -12 },
  { x: -14, y: 1.2, z: 2 },
  { x: 10, y: 1.2, z: 6 },
];

export function randomSpawn(exclude?: { x: number; z: number }, minDist = 6) {
  const candidates = exclude
    ? SPAWNS.filter((s) => {
        const dx = s.x - exclude.x;
        const dz = s.z - exclude.z;
        return Math.hypot(dx, dz) >= minDist;
      })
    : SPAWNS;
  const pool = candidates.length ? candidates : SPAWNS;
  return pool[Math.floor(Math.random() * pool.length)];
}
