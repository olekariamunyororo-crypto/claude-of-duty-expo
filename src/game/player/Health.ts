import { useGameStore } from '../store/gameStore';

export function damagePlayer(amount: number) {
  useGameStore.getState().applyDamage(amount);
}

export function healPlayer(amount: number) {
  const s = useGameStore.getState();
  if (s.phase !== 'playing') return;
  useGameStore.setState({ health: Math.min(100, s.health + amount) });
}
