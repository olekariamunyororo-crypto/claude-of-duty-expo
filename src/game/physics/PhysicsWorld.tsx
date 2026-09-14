import { Physics } from '@react-three/rapier';
import { ReactNode } from 'react';

export function PhysicsWorld({ children }: { children: ReactNode }) {
  return (
    <Physics gravity={[0, -18, 0]} timeStep="vary">
      {children}
    </Physics>
  );
}
