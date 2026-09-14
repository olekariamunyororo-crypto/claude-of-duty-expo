import * as THREE from 'three';

export class FirstPersonCamera {
  yaw = 0;
  pitch = 0;
  sensitivity = 1;

  private euler = new THREE.Euler(0, 0, 0, 'YXZ');
  private quat = new THREE.Quaternion();

  setSensitivity(s: number) {
    this.sensitivity = s;
  }

  look(dx: number, dy: number) {
    this.yaw -= dx * 0.0025 * this.sensitivity;
    this.pitch -= dy * 0.0025 * this.sensitivity;
    this.pitch = Math.max(-Math.PI / 2 + 0.05, Math.min(Math.PI / 2 - 0.05, this.pitch));
  }

  getQuaternion(): THREE.Quaternion {
    this.euler.set(this.pitch, this.yaw, 0, 'YXZ');
    this.quat.setFromEuler(this.euler);
    return this.quat;
  }

  getForward(out = new THREE.Vector3()): THREE.Vector3 {
    out.set(0, 0, -1).applyQuaternion(this.getQuaternion());
    return out;
  }

  getRight(out = new THREE.Vector3()): THREE.Vector3 {
    out.set(1, 0, 0).applyQuaternion(this.getQuaternion());
    return out;
  }
}
