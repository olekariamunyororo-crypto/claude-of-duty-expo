import { View, Text } from 'react-native';
import { useGameStore } from '../game/store/gameStore';

export function Killfeed() {
  const feed = useGameStore((s) => s.killfeed);
  if (!feed.length) return null;
  return (
    <View className="absolute top-12 right-4 items-end">
      {feed.slice(0, 5).map((e, i) => (
        <Text key={i} className="text-white/90 text-[13px] bg-black/40 px-2 py-0.5 mb-1 rounded">
          {e.killer} <Text className="text-red-400">eliminated</Text> {e.victim}
        </Text>
      ))}
    </View>
  );
}
