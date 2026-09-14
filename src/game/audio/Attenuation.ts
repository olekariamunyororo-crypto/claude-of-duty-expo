/** Simple distance attenuation for 3D positional SFX. */
export function attenuate(distance: number, ref = 4, max = 40): number {
  if (distance <= ref) return 1;
  if (distance >= max) return 0;
  return 1 - (distance - ref) / (max - ref);
}
