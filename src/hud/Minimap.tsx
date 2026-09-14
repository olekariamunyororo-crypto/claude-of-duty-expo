import { View } from 'react-native';
import { Canvas, Circle, Rect } from '@shopify/react-native-skia';
import { useGameStore } from '../game/store/gameStore';

const SIZE = 96;
const SCALE = 0.08;

export function Minimap() {
  const px = useGameStore((s) => s.playerX);
  const pz = useGameStore((s) => s.playerZ);
  const bots = useGameStore((s) => s.bots);
  const yaw = useGameStore((s) => s.playerYaw);

  return (
    <View className="absolute top-10 left-4 w-24 h-24 rounded overflow-hidden border border-white/20">
      <Canvas style={{ width: SIZE, height: SIZE }}>
        <Rect x={0} y={0} width={SIZE} height={SIZE} color="rgba(5,12,20,0.85)" />
        {/* player */}
        <Circle cx={SIZE / 2} cy={SIZE / 2} r={3} color="#22d3ee" />
        {/* bots */}
        {bots.map((b, i) => {
          const dx = (b.x - px) * SCALE;
          const dz = (b.z - pz) * SCALE;
          const mx = SIZE / 2 + dx;
          const my = SIZE / 2 + dz;
          if (mx < 2 || mx > SIZE - 2 || my < 2 || my > SIZE - 2) return null;
          return <Circle key={i} cx={mx} cy={my} r={2.5} color={b.alive ? '#f87171' : '#64748b'} />;
        })}
      </Canvas>
    </View>
  );
}
