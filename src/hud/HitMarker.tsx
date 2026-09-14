import { View } from 'react-native';
import { useGameStore } from '../game/store/gameStore';

export function HitMarker() {
  const show = useGameStore((s) => s.hitMarker);
  if (!show) return null;
  return (
    <View className="absolute inset-0 items-center justify-center pointer-events-none">
      <View className="w-6 h-6 border-2 border-white rotate-45" />
    </View>
  );
}
