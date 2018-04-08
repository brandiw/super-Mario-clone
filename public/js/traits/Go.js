import { Trait } from '../Entity.js';

export default class Go extends Trait {
    constructor() {
        super('go')

        this.dir = 0;
        this.speed = 200;

        this.distance = 0;
        // memory for mario direction 1 = facing right
        const heading = 1;
    }
    
    update(entity, deltaTime) {
        entity.vel.x = this.speed * this.dir * deltaTime;
        
        if ( this.dir ) {
            this.heading = this.dir
            this.distance += Math.abs(enity.vel.x) * deltaTime;
        } else {
            this.distance = 0;
        }
        console.log('go.js:24', this.heading)
    }
}