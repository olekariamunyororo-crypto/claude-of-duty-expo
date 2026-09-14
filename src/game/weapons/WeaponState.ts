import { NV4, WeaponDef } from './weaponData';

export class WeaponState {
  def: WeaponDef = NV4;
  ammo: number;
  reserve: number;
  reloading = false;
  reloadT = 0;
  lastShot = 0;
  ads = false;

  constructor(def: WeaponDef = NV4) {
    this.def = def;
    this.ammo = def.magSize;
    this.reserve = def.reserve;
  }

  canFire(now: number) {
    if (this.reloading || this.ammo <= 0) return false;
    const interval = 60 / this.def.rpm;
    return now - this.lastShot >= interval;
  }

  fire(now: number) {
    if (!this.canFire(now)) return false;
    this.ammo -= 1;
    this.lastShot = now;
    return true;
  }

  startReload(now: number) {
    if (this.reloading || this.ammo >= this.def.magSize || this.reserve <= 0) return;
    this.reloading = true;
    this.reloadT = now + this.def.reloadTime;
  }

  update(now: number) {
    if (this.reloading && now >= this.reloadT) {
      const need = this.def.magSize - this.ammo;
      const take = Math.min(need, this.reserve);
      this.ammo += take;
      this.reserve -= take;
      this.reloading = false;
    }
  }

  reset() {
    this.ammo = this.def.magSize;
    this.reserve = this.def.reserve;
    this.reloading = false;
    this.lastShot = 0;
    this.ads = false;
  }
}
