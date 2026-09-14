import { makeMutable } from 'react-native-reanimated';

/** Shared values consumed by Skia HUD on the UI thread. */
export const hud = {
  health: makeMutable(100),
  ammo: makeMutable(30),
  reserve: makeMutable(90),
  yaw: makeMutable(0),
  hitMarker: makeMutable(0),
  damageFlash: makeMutable(0),
  fps: makeMutable(0),
};

export function syncHudFromStore(s: {
  health: number;
  ammo: number;
  reserveAmmo: number;
  playerYaw: number;
  hitMarker: boolean;
  damageFlash: number;
}) {
  hud.health.value = s.health;
  hud.ammo.value = s.ammo;
  hud.reserve.value = s.reserveAmmo;
  hud.yaw.value = s.playerYaw;
  hud.hitMarker.value = s.hitMarker ? 1 : 0;
  hud.damageFlash.value = s.damageFlash;
}
