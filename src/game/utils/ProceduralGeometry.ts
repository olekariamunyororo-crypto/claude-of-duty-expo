import * as THREE from 'three';

/** Simple procedural stand-ins when GLBs are unavailable. */
export function makeYachtPlaceholder(): THREE.Group {
  const g = new THREE.Group();
  const deck = new THREE.Mesh(
    new THREE.BoxGeometry(28, 0.4, 40),
    new THREE.MeshStandardMaterial({ color: '#1e293b' }),
  );
  deck.position.y = 0;
  g.add(deck);
  const cabin = new THREE.Mesh(
    new THREE.BoxGeometry(10, 3, 12),
    new THREE.MeshStandardMaterial({ color: '#334155' }),
  );
  cabin.position.set(0, 1.7, -4);
  g.add(cabin);
  return g;
}

export function makeRiflePlaceholder(): THREE.Group {
  const g = new THREE.Group();
  const body = new THREE.Mesh(
    new THREE.BoxGeometry(0.08, 0.1, 0.55),
    new THREE.MeshStandardMaterial({ color: '#111' }),
  );
  body.position.set(0.15, -0.12, -0.35);
  g.add(body);
  return g;
}

export function makeSoldierPlaceholder(): THREE.Group {
  const g = new THREE.Group();
  const body = new THREE.Mesh(
    new THREE.CapsuleGeometry(0.35, 0.9, 4, 8),
    new THREE.MeshStandardMaterial({ color: '#166534' }),
  );
  g.add(body);
  return g;
}
