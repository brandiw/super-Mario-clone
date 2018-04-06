import Compositor from "./Compositor.js";
import Entity from "./Entity.js";
import Timer from "./Timer.js "
import { loadLevel } from "./loaders.js";
import { createMario } from "./entities.js";
import { loadBackgroundSprites } from "./sprites.js";
import { createBackgroundLayer } from "./layers.js";
import { createSpriteLayer } from "./layers.js"

window.addEventListener('keydown', (e)=>{
  console.log(e)
})

const canvas = document.getElementById("screen");
const context = canvas.getContext("2d");

// loading two functions in parallel, would like to review this more in depth
Promise.all([
  createMario(),
  loadBackgroundSprites(),
  loadLevel("1-1")
]).then(([mario, backgroundSprites, level]) => {
  const comp = new Compositor();

  const backgroundLayer = createBackgroundLayer(
    level.backgrounds,
    backgroundSprites
  );
  // draw background layer
  comp.layers.push(backgroundLayer);

  const gravity = 2000;
  mario.pos.set(64, 180);
  mario.vel.set(200, -600);

  const spriteLayer = createSpriteLayer(mario);
  // draw mario layer
  comp.layers.push(spriteLayer);

  // setting constant Frame rate with time would like to review this in the future,
  //  passed into updateMario in enities,js
  const timer = new Timer(1 / 60);
  timer.update = function update(deltaTime) {
    mario.update(deltaTime);
    
    comp.draw(context);

    mario.vel.y += gravity * deltaTime;
  }

  timer.start();
});
