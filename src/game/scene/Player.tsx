import { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { stepCharacter, getCamera } from '../physics/CharacterController';
import { useGameStore } from '../store/gameStore';
import { WeaponViewModel } from './WeaponViewModel';
import { input } from '../input/InputManager';
import { audio } from '../audio/AudioEngine';
import { WeaponState } from '../weapons/WeaponState';
import { Recoil } from '../weapons/Recoil';
import { fireRay } from '../weapons/Ballistics';

const weapon = new WeaponState();
const recoil = new Recoil();

export function Player() {
  const { camera } = useThree();
  const pos = useRef(new THREE.Vector3(0, 1.2, 8));
  const setPose = useGameStore((s) => s.setPlayerPose);
  const setAmmo = useGameStore((s) => s.setAmmo);
  const phase = useGameStore((s) => s.phase);

  useFrame((_, dt) => {
    if (phase !== 'playing' && phase !== 'countdown') return;

    const { yaw, pitch } = stepCharacter(dt, pos.current);
    const cam = getCamera();
    camera.position.copy(pos.current);
    camera.quaternion.copy(cam.getQuaternion());

    // recoil offset
    recoil.update(dt);
    camera.rotation.x += recoil.pitch;
    camera.rotation.y += recoil.yaw;

    setPose(pos.current.x, pos.current.y, pos.current.z, yaw, pitch);

    const now = performance.now() / 1000;
    weapon.ads = input.ads;
    weapon.update(now);

    if (input.reload) weapon.startReload(now);
    if (input.fire && weapon.fire(now)) {
      recoil.kick(weapon.def.recoilPitch, weapon.def.recoilYaw);
      audio.play('gunshot', 0.7);
      const origin = camera.position.clone();
      const dir = new THREE.Vector3(0, 0, -1).applyQuaternion(camera.quaternion);
      fireRay(origin, dir, weapon.ads ? weapon.def.adsSpread : weapon.def.spread);
      // hit resolution against bots would go here
    }
    setAmmo(weapon.ammo, weapon.reserve);
  });

  return (
    <group>
      <WeaponViewModel ads={weapon.ads} />
    </group>
  );
}
