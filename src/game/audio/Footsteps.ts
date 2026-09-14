import { audio } from './AudioEngine';

let lastStep = 0;

export function updateFootsteps(now: number, speed: number, onGround: boolean) {
  if (!onGround || speed < 1.5) return;
  const interval = speed > 6 ? 0.32 : 0.45;
  if (now - lastStep < interval) return;
  lastStep = now;
  audio.play('footstep', 0.35 + Math.random() * 0.15);
}
