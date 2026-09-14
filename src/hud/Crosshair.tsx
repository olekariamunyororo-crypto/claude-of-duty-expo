import { View } from 'react-native';

export function Crosshair() {
  return (
    <View className="absolute inset-0 items-center justify-center pointer-events-none">
      <View className="w-1 h-1 bg-white rounded-full" />
      <View className="absolute w-4 h-[2px] bg-white/80" style={{ top: '50%', marginTop: -1 }} />
      <View className="absolute h-4 w-[2px] bg-white/80" style={{ left: '50%', marginLeft: -1 }} />
    </View>
  );
}
