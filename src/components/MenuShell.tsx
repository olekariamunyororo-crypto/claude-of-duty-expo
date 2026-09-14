import { View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export function MenuShell({ children }: { children: React.ReactNode }) {
  return (
    <View className="flex-1">
      <LinearGradient
        colors={['#05080d', '#0a1628', '#05080d']}
        style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 }}
      >
        {children}
      </LinearGradient>
    </View>
  );
}
