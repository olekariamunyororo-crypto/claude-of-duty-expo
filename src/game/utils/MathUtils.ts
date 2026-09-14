import * as THREE from 'three';

export function clamp(v: number, min: number, max: number) {
  return Math.max(min, Math.min(max, v));
}

export function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

export function damp(current: number, target: number, lambda: number, dt: number) {
  return lerp(current, target, 1 - Math.exp(-lambda * dt));
}

export function angleDiff(a: number, b: number) {
  let d = b - a;
  while (d > Math.PI) d -= Math.PI * 2;
  while (d < -Math.PI) d += Math.PI * 2;
  return d;
}

const _v = new THREE.Vector3();
export function horizontalDistance(a: THREE.Vector3, b: THREE.Vector3) {
  _v.set(a.x - b.x, 0, a.z - b.z);
  return _v.length();
}
