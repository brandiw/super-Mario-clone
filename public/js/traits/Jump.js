import { Trait } from '../Entity.js';

export default class Jump extends Trait {
    constructor() {
        super('jump')

        this.duration = 0.5;
        this.engageTime = 0;
        
        this.velocity = 200;
    }
    // engages jump
    start() {
        this.engageTime = this.duration;
    }

    cancel() {
        this.engageTime = 0;
    }

    update(entity, deltaTime) {
        // miin 23
        if ( this.engageTime > 0 ) {

            entity.vel.y = -this.velocity;
            this.engageTime -= deltaTime;
        }
    }
}