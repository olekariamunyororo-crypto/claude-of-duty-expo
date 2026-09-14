import { View, Text, Pressable } from 'react-native';
import { useGameStore } from '../game/store/gameStore';

export function LoadingScreen({ label }: { label: string }) {
  return (
    <View className="flex-1 bg-[#05080d] items-center justify-center">
      <Text className="text-cyan-300 font-bold text-[18px] tracking-[4px]">{label}</Text>
    </View>
  );
}

export function CountdownOverlay() {
  const countdown = useGameStore((s) => s.countdown);
  return (
    <View className="absolute inset-0 items-center justify-center pointer-events-none">
      <Text className="text-white font-bold text-[96px]">{countdown > 0 ? countdown : 'GO'}</Text>
    </View>
  );
}

export function DeathOverlay() {
  const phase = useGameStore((s) => s.phase);
  const respawnTimer = useGameStore((s) => s.respawnTimer);
  if (phase !== 'dead') return null;
  return (
    <View className="absolute inset-0 bg-red-950/60 items-center justify-center">
      <Text className="text-red-300 font-bold text-[36px]">YOU DIED</Text>
      <Text className="text-white/70 mt-2">Respawning in {Math.ceil(respawnTimer)}s</Text>
    </View>
  );
}

export function PauseOverlay() {
  const resume = useGameStore((s) => s.resume);
  const quitToMenu = useGameStore((s) => s.quitToMenu);
  return (
    <View className="absolute inset-0 bg-black/70 items-center justify-center">
      <Text className="text-white font-bold text-[32px] mb-6">PAUSED</Text>
      <Pressable onPress={resume} className="bg-cyan-500 px-10 py-3 rounded-lg mb-3">
        <Text className="text-black font-bold">RESUME</Text>
      </Pressable>
      <Pressable onPress={quitToMenu} className="bg-white/10 px-10 py-3 rounded-lg">
        <Text className="text-white font-bold">QUIT TO MENU</Text>
      </Pressable>
    </View>
  );
}

export function GameOverOverlay() {
  const score = useGameStore((s) => s.score);
  const quitToMenu = useGameStore((s) => s.quitToMenu);
  return (
    <View className="absolute inset-0 bg-black/80 items-center justify-center">
      <Text className="text-amber-300 font-bold text-[36px]">MATCH OVER</Text>
      <Text className="text-white mt-2 mb-6">Kills {score.kills} · Deaths {score.deaths}</Text>
      <Pressable onPress={quitToMenu} className="bg-cyan-500 px-10 py-3 rounded-lg">
        <Text className="text-black font-bold">BACK TO MENU</Text>
      </Pressable>
    </View>
  );
}

export function Popups() {
  // placeholder for floating damage numbers / kill confirmations if needed
  return null;
}
