import Entity from './Entity.js';
import Go from './traits/Go.js';
import Jump from './traits/Jump.js';
import { loadSpriteSheet } from './loaders.js';
import { createAnim } from './anim.js';


export function createMario() {
    return loadSpriteSheet('mario')
        .then(sprite => {
            const mario = new Entity();
            mario.size.set(14, 16);

            mario.addTrait(new Go());
            mario.go.dragFactor = SLOW_DRAG;
            mario.addTrait(new Jump());

            mario.turbo = function setTurboState(turboOn) {
                this.go.dragFactor = turboOn ? FAST_DRAG : SLOW_DRAG;
                
            }

            // take a number and gives back a frame 
            const runAnim = createAnim(['run-1', 'run-2', 'run-3'], 6);

            // vid 7 min 10 shitching between mario frames running vs idle
            function routeFrame(mario) {
                // unsure about this 
                if (mario.jump.falling) {
                    return 'jump';
                }


                if (mario.go.distance > 0) {
                    // used to make mario slide check agian vid 7 min 19
                    if ( (mario.vel.x > 0 && mario.go.dir< 0) || mario.vel.x < 0 && mario.go.dir > 0 ) {
                        return 'break';
                    }


                    console.log('frame stuff in entities.js:24')
                    return runAnim(mario.go.distance);
                }
                return 'idle'
            }

            mario.draw = function drawMario(context) {
                                                  // if running to left than flip image
                sprite.draw(routeFrame(this), context, 0, 0, this.go.heading < 0);
            }

            return mario;
        });
}