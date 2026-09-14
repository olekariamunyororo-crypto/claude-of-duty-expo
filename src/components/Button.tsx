import { Pressable, Text } from 'react-native';

type Props = {
  title: string;
  onPress: () => void;
  wide?: boolean;
  subtle?: boolean;
};

export function Button({ title, onPress, wide, subtle }: Props) {
  return (
    <Pressable
      onPress={onPress}
      className={`mt-3 px-8 py-3 rounded-lg border ${wide ? 'w-72' : ''} ${
        subtle ? 'bg-white/5 border-white/20' : 'bg-cyan-500/90 border-cyan-300'
      }`}
    >
      <Text className={`text-center font-bold tracking-wider ${subtle ? 'text-white/80' : 'text-black'}`}>
        {title}
      </Text>
    </Pressable>
  );
}
