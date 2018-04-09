import { Vec2 } from "./Math.js";

// create semantic names for tiles sides
export const Sides = {
    TOP: Symbol('top'),
    BOTTOM: Symbol('bottom')
}

export class Trait {
    constructor(name) {
        this.NAME = name;
    }

    update() {
        console.warn('Unhandled update call in Trait');
    }
}

export default class Entity {
    constructor() {
        this.pos = new Vec2(0, 0);
        this.vel = new Vec2(0, 0);
        this.size = new Vec2(0, 0);

        this.traits = [];
    }
// composition vd4 min15:33
    addTrait(trait) {
        this.traits.push(trait);
        this[trait.NAME] = trait;
    }
// composition vd4 min15:33
    update(deltaTime) {
        this.traits.forEach(trait => {
            trait.update(this, deltaTime);
        });
    }
}
