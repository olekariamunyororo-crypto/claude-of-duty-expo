import { View } from 'react-native';
import { useGameStore } from '../game/store/gameStore';

export function DamageIndicator() {
  const flash = useGameStore((s) => s.damageFlash);
  if (flash <= 0) return null;
  return <View className="absolute inset-0 bg-red-600/30 pointer-events-none" style={{ opacity: Math.min(1, flash) }} />;
}
