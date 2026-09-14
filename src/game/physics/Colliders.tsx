import { RigidBody, CuboidCollider } from '@react-three/rapier';

/** Static colliders approximating the yacht deck and walls. */
export function MapColliders() {
  return (
    <group>
      {/* main deck */}
      <RigidBody type="fixed" position={[0, -0.25, 0]}>
        <CuboidCollider args={[18, 0.25, 22]} />
      </RigidBody>
      {/* cabin walls (simplified boxes) */}
      <RigidBody type="fixed" position={[0, 1.5, -6]}>
        <CuboidCollider args={[6, 1.5, 0.3]} />
      </RigidBody>
      <RigidBody type="fixed" position={[-6, 1.5, 0]}>
        <CuboidCollider args={[0.3, 1.5, 8]} />
      </RigidBody>
      <RigidBody type="fixed" position={[6, 1.5, 0]}>
        <CuboidCollider args={[0.3, 1.5, 8]} />
      </RigidBody>
      {/* water plane (kill volume sense handled in game logic) */}
      <RigidBody type="fixed" position={[0, -2, 0]}>
        <CuboidCollider args={[40, 0.5, 40]} />
      </RigidBody>
    </group>
  );
}
