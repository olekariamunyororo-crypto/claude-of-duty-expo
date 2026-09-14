import { useEffect } from 'react';
import { router } from 'expo-router';
import { Text, View } from 'react-native';
import { GameCanvas } from '../../src/game/scene/GameCanvas';
import { HudCanvas } from '../../src/hud/HudCanvas';
import { TouchControls } from '../../src/game/input/TouchControls';
import { Killfeed } from '../../src/hud/Killfeed';
import { Popups, DeathOverlay, GameOverOverlay, PauseOverlay, CountdownOverlay } from '../../src/components/LoadingScreen';
import { useGameStore } from '../../src/game/store/gameStore';

export default function GameScreen() {
  const phase = useGameStore((s) => s.phase);

  useEffect(() => {
    if (phase === 'menu') router.replace('/');
  }, [phase]);

  if (phase === 'menu') return <View className="flex-1 bg-black" />;

  return (
    <View className="flex-1 bg-black">
      <GameCanvas />
      <HudCanvas />
      <Killfeed />
      <Popups />
      {phase === 'countdown' && <CountdownOverlay />}
      {(phase === 'playing' || phase === 'countdown') && <TouchControls />}
      {phase === 'playing' && <PauseButton />}
      <DeathOverlay />
      {phase === 'paused' && <PauseOverlay />}
      {phase === 'gameover' && <GameOverOverlay />}
    </View>
  );
}

function PauseButton() {
  const pause = useGameStore((s) => s.pause);
  return (
    <View className="absolute top-2 right-3">
      <Text onPress={pause} className="text-white/80 text-[22px] px-3 py-1 bg-black/40 rounded-lg">☰</Text>
    </View>
  );
}
