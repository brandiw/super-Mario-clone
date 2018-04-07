import Compositor from "./Compositor.js";
import TileCollider from "./TileCollider.js";
import { Matrix } from "./math.js";

export default class Level {
  constructor() {
    this.gravity = 2000;

    // vid 5 min 7
    this.comp = new Compositor();
    this.enties = new Set();
    // tile set source
    this.tiles = new Matrix();
    this.tileCollider = new TileCollider(this.tiles);
  }

  update(deltaTime) {
    this.enties.forEach(entity => {
      entity.update(deltaTime);

      //  vid 5 mind 112 collision detection 
      entity.pos.x += this.entity.vel.x * deltaTime;
      this.tileCollider.checkX(entity);

      entity.pos.y += this.entity.vel.y * deltaTime;
      this.tileCollider.checkY(entity);

      // this.tileCollider.test(entity);
    entity.vel.y += this.gravity * deltaTime;
      
    });
  }
}