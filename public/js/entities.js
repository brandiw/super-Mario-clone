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
            mario.addTrait(new Jump());

            // need to know which frame to take by knowing how far run vid7.10:26 referance in Go trait distance
            // const frames = ['run-1', 'run-2', 'run-3'];

            // take a number and gives back a frame 
            const runAnim = createAnim(['run-1', 'run-2', 'run-3'], 10);

            // vid 7 min 10 shitching between mario frames running vs idle
            function routeFrame(mario) {
                if (maario.go.dir !== 0) {
                    // // vid7.13:54 used to create an index 
                    // const frameIndex = Math.floor(mario.go.distance / 10) % frame.length;
                    // // referance framesArr line 16
                    // const frameName = frames[frameIndex];
                    console.log('frame stuff in entities.js:24')
                    return runAnim(mario.go.distance);
                }
                return 'idle'
            }

            mario.draw = function drawMario(context) {
                                                  // if running to left than flip image
                sprite.draw('idle', context, 0, 0, this.go.heading > 0);
            }

            return mario;
        });
}