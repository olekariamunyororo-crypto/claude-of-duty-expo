import * as THREE from 'three';

export interface MoveInput {
  forward: number; // -1..1
  right: number;
  jump: boolean;
  sprint: boolean;
}

const WALK = 4.5;
const SPRINT = 7.5;
const JUMP_V = 7.5;

export class CharacterMovement {
  velocity = new THREE.Vector3();
  onGround = false;
  private wish = new THREE.Vector3();

  update(dt: number, input: MoveInput, forward: THREE.Vector3, right: THREE.Vector3, gravity = -18) {
    const speed = input.sprint ? SPRINT : WALK;
    this.wish.set(0, 0, 0);
    this.wish.addScaledVector(forward, input.forward);
    this.wish.addScaledVector(right, input.right);
    this.wish.y = 0;
    if (this.wish.lengthSq() > 1) this.wish.normalize();
    this.wish.multiplyScalar(speed);

    // horizontal accel / friction
    const hx = this.wish.x - this.velocity.x;
    const hz = this.wish.z - this.velocity.z;
    const accel = this.onGround ? 20 : 6;
    this.velocity.x += hx * Math.min(1, accel * dt);
    this.velocity.z += hz * Math.min(1, accel * dt);

    if (this.onGround && input.jump) {
      this.velocity.y = JUMP_V;
      this.onGround = false;
    }

    this.velocity.y += gravity * dt;
    return this.velocity;
  }
}
