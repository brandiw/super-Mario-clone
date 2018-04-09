import { Trait } from "../Entity.js";

export default class Go extends Trait {
  constructor() {
    super("go");

    this.dir = 0;
    this.acceleration = 400;
    this.deceleration = 300;
    this.dragFactor = 1 / 5000;
    this.distance = 0;
    // memory for mario direction 1 = facing right
    const heading = 1;
  }

  update(entity, deltaTime) {
    // console.log('Go:18', this.dir)

    const absX = Math.abs(entity.vel.x);

    if (this.dir !== 0) {
      // adding direction over time
      entity.vel.x += this.acceleration * deltaTime * this.dir;

      // prevent turning in air
      if (entity.jump) {
        if (entity.jump.falling === false) {
          this.heading = this.dir;
        }
      } else {
        this.heading = this.dir;
      }

      // console.log("go.js:22", this.heading);
      this.distance += absX * deltaTime;
    } else if (entity.vel.x !== 0) {
      // slow done to stop when not running
      const decel = Math.min(absX, this.deceleration * deltaTime);
      entity.vel.x += entity.vel.x > 0 ? -decel : decel;
    } else {
      this.distance = 0;
    }
    // increase drag with vel
    const drag = this.dragFactor * entity.vel.x * absX;
    entity.vel.x -= drag;

    // calc distanvce regardless of what is pushed
    this.distance += absX * deltaTime;
  }
}
