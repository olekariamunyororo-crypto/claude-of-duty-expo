// Character controller helpers used from Player.tsx useFrame.
import * as THREE from 'three';
import { input } from '../input/InputManager';
import { CharacterMovement } from '../player/Movement';
import { FirstPersonCamera } from '../player/Camera';

const movement = new CharacterMovement();
const camera = new FirstPersonCamera();

export function getCamera() {
  return camera;
}

export function stepCharacter(dt: number, position: THREE.Vector3) {
  const { dx, dy } = input.consumeLook();
  camera.look(dx, dy);

  const forward = camera.getForward();
  const right = camera.getRight();
  forward.y = 0;
  right.y = 0;
  forward.normalize();
  right.normalize();

  const vel = movement.update(
    dt,
    {
      forward: input.moveY,
      right: input.moveX,
      jump: input.jump,
      sprint: input.sprint,
    },
    forward,
    right,
  );
  input.resetEdges();

  position.x += vel.x * dt;
  position.y += vel.y * dt;
  position.z += vel.z * dt;

  // simple ground plane
  if (position.y < 1.0) {
    position.y = 1.0;
    vel.y = 0;
    movement.onGround = true;
  } else {
    movement.onGround = false;
  }

  return { yaw: camera.yaw, pitch: camera.pitch, velocity: vel };
}
