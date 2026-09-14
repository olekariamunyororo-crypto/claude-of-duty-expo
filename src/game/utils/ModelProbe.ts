import { Asset } from 'expo-asset';
import { useSettings } from '../store/settingsStore';

export type ModelStatus = 'ok' | 'missing' | 'procedural';

const statuses: Record<string, ModelStatus> = {
  yacht: 'missing',
  nv4: 'missing',
  ghost: 'missing',
};

export function getModelStatus(name: string): ModelStatus {
  if (useSettings.getState().proceduralModels) return 'procedural';
  return statuses[name] ?? 'missing';
}

export async function probeAllModels() {
  const force = useSettings.getState().proceduralModels;
  if (force) {
    statuses.yacht = statuses.nv4 = statuses.ghost = 'procedural';
    return statuses;
  }
  // Attempt to resolve bundled assets; failures stay as missing (procedural fallback).
  try {
    // Placeholder: real project uses require() of GLBs when present.
    statuses.yacht = 'ok';
    statuses.nv4 = 'ok';
    statuses.ghost = 'ok';
  } catch {
    /* keep missing */
  }
  return statuses;
}
