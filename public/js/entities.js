import Entity from './Entity.js';
import Velocity from "./traits/Velocity.js"
import Jump from "./traits/Jump.js"
import { loadMarioSprite } from "./sprites.js";


export function createMario() {
    return loadMarioSprite().
        then(sprite => {
            const mario = new Entity();

        mario.addTraits(new Jump());
        mario.addTraits(new Velocity())

            mario.draw = function drawMario(context) {
                sprite.draw("idle", context, this.pos.x, this.pos.y);
            }


            return mario;
        });

}