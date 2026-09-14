// Procedural gunshot / impact synthesis (sample-rate 22050 mono).
export const SR = 22050;

function clamp(v: number, a = -1, b = 1) {
  return Math.max(a, Math.min(b, v));
}

export function synthesizeGunshot(seed = Math.random()): Float32Array {
  const len = Math.floor(SR * 0.28);
  const out = new Float32Array(len);
  let n = seed;
  for (let i = 0; i < len; i++) {
    n = (n * 16807) % 2147483647;
    const t = i / SR;
    const noise = ((n / 2147483647) * 2 - 1) * Math.exp(-t * 18);
    const body = Math.sin(2 * Math.PI * (140 + t * 40) * t) * Math.exp(-t * 12);
    out[i] = clamp(noise * 0.7 + body * 0.5);
  }
  return out;
}

export function synthesizeFootstep(seed = Math.random()): Float32Array {
  const len = Math.floor(SR * 0.12);
  const out = new Float32Array(len);
  let n = seed;
  for (let i = 0; i < len; i++) {
    n = (n * 16807) % 2147483647;
    const t = i / SR;
    out[i] = clamp(((n / 2147483647) * 2 - 1) * Math.exp(-t * 30) * 0.4);
  }
  return out;
}

export function floatToWav(samples: Float32Array): ArrayBuffer {
  const numChannels = 1;
  const bits = 16;
  const blockAlign = (numChannels * bits) / 8;
  const dataSize = samples.length * blockAlign;
  const buf = new ArrayBuffer(44 + dataSize);
  const view = new DataView(buf);
  const writeStr = (off: number, s: string) => {
    for (let i = 0; i < s.length; i++) view.setUint8(off + i, s.charCodeAt(i));
  };
  writeStr(0, 'RIFF');
  view.setUint32(4, 36 + dataSize, true);
  writeStr(8, 'WAVE');
  writeStr(12, 'fmt ');
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true);
  view.setUint16(22, numChannels, true);
  view.setUint32(24, SR, true);
  view.setUint32(28, SR * blockAlign, true);
  view.setUint16(32, blockAlign, true);
  view.setUint16(34, bits, true);
  writeStr(36, 'data');
  view.setUint32(40, dataSize, true);
  let o = 44;
  for (let i = 0; i < samples.length; i++) {
    const s = Math.max(-1, Math.min(1, samples[i]));
    view.setInt16(o, s < 0 ? s * 0x8000 : s * 0x7fff, true);
    o += 2;
  }
  return buf;
}
