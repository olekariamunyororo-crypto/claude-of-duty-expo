// Frame-transient input singleton. TouchControls writes; the sim consumes.
export const input = {
  lookDX: 0,
  lookDY: 0,
  moveX: 0,
  moveY: 0,
  fire: false,
  ads: false,
  jump: false,
  reload: false,
  grenade: false,
  sprint: false,

  consumeLook() {
    const dx = this.lookDX;
    const dy = this.lookDY;
    this.lookDX = 0;
    this.lookDY = 0;
    return { dx, dy };
  },

  resetEdges() {
    this.jump = false;
    this.reload = false;
    this.grenade = false;
  },
};
