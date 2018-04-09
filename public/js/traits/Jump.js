import { Sides, Trait } from "../Entity.js";

export default class Jump extends Trait {
  constructor() {
    super("jump");
    // for repeat jumpiong
    this.ready = 0;
    this.duration = 0.5;
    this.engageTime = 0;
    // vid 8 min 31
    this.requestTime = 0;
    this.gracePeriod = 0.1;
    this.speedBoost = 0.3;
    this.velocity = 200;
  }

  get falling() {
    return this.ready < 0;
  }

  // engages jump
  start() {
    console.log("jumped");

    this.engageTime = this.duration;
  }

  cancel() {
    this.engageTime = 0;
    this.requestTime = 0;
  }

  obstruct(entity, side) {
    if (side === Sides.BOTTOM) {
      this.ready = 1;
    } else if (side === Sides.TOP) {
      this.cancel();
    }
  }

  update(entity, deltaTime) {
    // console.log('updated')
    // miin 23
    if (this.requestTime > 0) {
      if (this.ready > 0) {
        this.engageTime = this.duration;
        this.requestTime = 0;
      }

      this.requestTime -= deltaTime;
    }

    if (this.engageTime > 0) {
      entity.vel.y = -(
        this.velocity +
        Math.abs(entity.vel.x) * this.speedBoost
      );
      this.engageTime -= deltaTime;
    }

    this.ready--;
  }
}
