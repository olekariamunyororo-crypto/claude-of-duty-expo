export class Recoil {
  pitch = 0;
  yaw = 0;

  kick(pitch: number, yaw: number) {
    this.pitch += pitch * (0.8 + Math.random() * 0.4);
    this.yaw += yaw * (Math.random() * 2 - 1);
  }

  update(dt: number) {
    const recover = 8;
    this.pitch = THREE_lerp(this.pitch, 0, recover * dt);
    this.yaw = THREE_lerp(this.yaw, 0, recover * dt);
  }

  reset() {
    this.pitch = 0;
    this.yaw = 0;
  }
}

function THREE_lerp(a: number, b: number, t: number) {
  return a + (b - a) * Math.min(1, t);
}
