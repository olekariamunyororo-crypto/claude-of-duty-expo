import { create } from 'zustand';
import { loadJSON, saveJSON } from './persist';

interface Settings {
  lookSensitivity: number;
  sfxVolume: number;
  proceduralModels: boolean;
  set: (partial: Partial<Omit<Settings, 'set'>>) => void;
}

const KEY = 'settings-v1';
const defaults = {
  lookSensitivity: 1.0,
  sfxVolume: 1.0,
  proceduralModels: false,
};

export const useSettings = create<Settings>((set, get) => ({
  ...defaults,
  ...loadJSON(KEY, defaults),
  set: (partial) => {
    set(partial);
    const { set: _, ...rest } = get();
    saveJSON(KEY, rest);
  },
}));
