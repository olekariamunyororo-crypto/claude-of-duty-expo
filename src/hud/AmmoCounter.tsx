import { Text, View } from 'react-native';
import { useGameStore } from '../game/store/gameStore';

export function AmmoCounter() {
  const ammo = useGameStore((s) => s.ammo);
  const reserve = useGameStore((s) => s.reserveAmmo);
  return (
    <View className="absolute bottom-6 right-6">
      <Text className="text-white font-bold text-[28px] text-right">
        {ammo} <Text className="text-white/50 text-[18px]">/ {reserve}</Text>
      </Text>
    </View>
  );
}
