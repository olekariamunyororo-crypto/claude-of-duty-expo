import * as THREE from 'three';

export interface HitResult {
  point: THREE.Vector3;
  normal: THREE.Vector3;
  distance: number;
  targetId?: string | number;
  headshot?: boolean;
}

const _ray = new THREE.Raycaster();
const _dir = new THREE.Vector3();

export function fireRay(
  origin: THREE.Vector3,
  direction: THREE.Vector3,
  spread: number,
  maxDist = 200,
  objects: THREE.Object3D[] = [],
): HitResult | null {
  _dir.copy(direction).normalize();
  // apply simple circular spread
  if (spread > 0) {
    const angle = Math.random() * Math.PI * 2;
    const r = Math.random() * spread;
    _dir.x += Math.cos(angle) * r;
    _dir.y += Math.sin(angle) * r;
    _dir.normalize();
  }
  _ray.set(origin, _dir);
  _ray.far = maxDist;
  const hits = _ray.intersectObjects(objects, true);
  if (!hits.length) return null;
  const h = hits[0];
  return {
    point: h.point.clone(),
    normal: h.face?.normal.clone() ?? new THREE.Vector3(0, 1, 0),
    distance: h.distance,
    targetId: (h.object as any).userData?.botId,
    headshot: (h.object as any).userData?.isHead === true,
  };
}
