// Minimal tap utilities used by TouchControls (double-tap jump, sprint lock).
export interface TapDetector {
  tap: () => boolean; // returns true if double-tap detected
}

export function createTapDetector(windowMs = 280): TapDetector {
  let last = 0;
  return {
    tap() {
      const now = Date.now();
      const dbl = now - last < windowMs;
      last = now;
      return dbl;
    },
  };
}
