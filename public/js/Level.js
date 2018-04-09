import Compositor from './Compositor.js';
import TileCollider from './TileCollider.js';

export default class Level {
    constructor() {
        this.gravity = 2000;
        // flash chance blocks vid7 min35 also lets us know how long the level has progressed
        this.totalTime = 0;
// vid 5 min 7
        this.comp = new Compositor();
        this.entities = new Set();
// tile set source
        this.tileCollider = null;
    }

    setCollisionGrid(matrix) {
        this.tileCollider = new TileCollider(matrix);
    }

    // this is where we move things
    update(deltaTime) {
        this.entities.forEach(entity => {
            entity.update(deltaTime);
            //  vid 5 mind 112 collision detection
            entity.pos.x += entity.vel.x * deltaTime;
            this.tileCollider.checkX(entity);

            entity.pos.y += entity.vel.y * deltaTime;
            this.tileCollider.checkY(entity);

            entity.vel.y += this.gravity * deltaTime;
        });

        this.totalTime += deltaTime;
    }
}
