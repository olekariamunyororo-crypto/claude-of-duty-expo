import { Audio } from 'expo-av';
import * as FileSystem from 'expo-file-system';
import { synthesizeGunshot, synthesizeFootstep, floatToWav } from './ProceduralGunshot';

type SoundName = 'gunshot' | 'footstep' | 'hit' | 'reload';

class AudioEngine {
  private ready = false;
  private cache: Partial<Record<SoundName, string>> = {};
  private volume = 1;

  async init() {
    if (this.ready) return;
    try {
      await Audio.setAudioModeAsync({
        playsInSilentModeIOS: true,
        allowsRecordingIOS: false,
        staysActiveInBackground: false,
      });
      await this.ensure('gunshot', () => floatToWav(synthesizeGunshot()));
      await this.ensure('footstep', () => floatToWav(synthesizeFootstep()));
      this.ready = true;
    } catch (e) {
      console.warn('[audio] init failed', e);
    }
  }

  setVolume(v: number) {
    this.volume = Math.max(0, Math.min(1, v));
  }

  private async ensure(name: SoundName, gen: () => ArrayBuffer) {
    if (this.cache[name]) return;
    const dir = FileSystem.cacheDirectory + 'cod-sfx/';
    await FileSystem.makeDirectoryAsync(dir, { intermediates: true }).catch(() => {});
    const path = dir + name + '.wav';
    const info = await FileSystem.getInfoAsync(path);
    if (!info.exists) {
      const ab = gen();
      const b64 = Buffer.from(ab).toString('base64');
      await FileSystem.writeAsStringAsync(path, b64, { encoding: FileSystem.EncodingType.Base64 });
    }
    this.cache[name] = path;
  }

  async play(name: SoundName, vol = 1) {
    if (!this.ready) return;
    const uri = this.cache[name];
    if (!uri) return;
    try {
      const { sound } = await Audio.Sound.createAsync({ uri }, { volume: vol * this.volume, shouldPlay: true });
      sound.setOnPlaybackStatusUpdate((st) => {
        if (st.isLoaded && st.didJustFinish) sound.unloadAsync().catch(() => {});
      });
    } catch {
      /* swallow */
    }
  }
}

export const audio = new AudioEngine();
