import { Text, View } from 'react-native';
import { useGameStore } from '../game/store/gameStore';

export function Compass() {
  const yaw = useGameStore((s) => s.playerYaw);
  const deg = ((yaw * 180) / Math.PI + 360) % 360;
  const dirs = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
  const idx = Math.round(deg / 45) % 8;
  return (
    <View className="absolute top-3 self-center bg-black/40 px-4 py-1 rounded">
      <Text className="text-cyan-200 font-bold tracking-widest">{dirs[idx]}  {Math.round(deg)}°</Text>
    </View>
  );
}
