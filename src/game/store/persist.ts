import { MMKV } from 'react-native-mmkv';

export const storage = new MMKV({ id: 'claude-of-duty' });

export function loadJSON<T>(key: string, fallback: T): T {
  try {
    const raw = storage.getString(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export function saveJSON(key: string, value: unknown) {
  try {
    storage.set(key, JSON.stringify(value));
  } catch (e) {
    console.warn('[persist] failed to save', key, e);
  }
}
