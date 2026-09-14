export interface WeaponDef {
  id: string;
  name: string;
  magSize: number;
  reserve: number;
  rpm: number;
  damage: number;
  headMult: number;
  spread: number;
  adsSpread: number;
  recoilPitch: number;
  recoilYaw: number;
  reloadTime: number;
  fireMode: 'auto' | 'semi';
}

export const NV4: WeaponDef = {
  id: 'nv4',
  name: 'NV4',
  magSize: 30,
  reserve: 90,
  rpm: 650,
  damage: 28,
  headMult: 1.5,
  spread: 0.012,
  adsSpread: 0.004,
  recoilPitch: 0.018,
  recoilYaw: 0.008,
  reloadTime: 2.1,
  fireMode: 'auto',
};
