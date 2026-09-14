import { useMemo } from 'react';
import * as THREE from 'three';
import { makeYachtPlaceholder } from '../utils/ProceduralGeometry';
import { getModelStatus } from '../utils/ModelProbe';

export function MapScene() {
  const yacht = useMemo(() => {
    const status = getModelStatus('yacht');
    if (status === 'ok') {
      // In full build: use GLTFLoader / useGLTF for assets/models/yacht.glb
      return makeYachtPlaceholder();
    }
    return makeYachtPlaceholder();
  }, []);

  return (
    <group>
      <primitive object={yacht} />
      {/* water */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.6, 0]} receiveShadow>
        <planeGeometry args={[120, 120]} />
        <meshStandardMaterial color="#0c4a6e" metalness={0.3} roughness={0.4} />
      </mesh>
      {/* sky-ish ambient fill already in GameCanvas */}
    </group>
  );
}
