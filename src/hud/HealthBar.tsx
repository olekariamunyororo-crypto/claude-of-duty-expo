import { View, Text } from 'react-native';
import { useGameStore } from '../game/store/gameStore';

export function HealthBar() {
  const hp = useGameStore((s) => s.health);
  const pct = Math.max(0, Math.min(100, hp));
  return (
    <View className="absolute bottom-6 left-6 w-40">
      <Text className="text-white/80 text-[12px] mb-1">HEALTH</Text>
      <View className="h-3 bg-black/50 rounded overflow-hidden">
        <View className="h-full bg-emerald-400" style={{ width: `${pct}%` }} />
      </View>
    </View>
  );
}
