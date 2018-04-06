import SpriteSheet from "./SpriteSheet.js";
import { loadLevel } from "./loaders.js";
import { loadMarioSprite, loadBackgroundSprites } from './sprites.js'


const canvas = document.getElementById("screen");
const context = canvas.getContext("2d");

function drawBackground(background, context, sprites) {
  background.ranges.forEach(([x1, x2, y1, y2]) => {

    for (let x = x1; x < x2; x++) {
      for (let y = y1; y < y2; y++) {
        // loop through tiles to draw 
        sprites.drawTile(background.tile, context, x, y);
      }
    }
  });
}

// loading two functions in parallel, would like to review this more in depth
Promise.all([
  loadMarioSprite(),
  loadBackgroundSprites(),
  loadLevel('1-1')
]).
  then(([marioSprite, sprites, level]) => {
    console.log(level)
    level.backgrounds.forEach(background => {
      drawBackground(background, context, sprites)
    })

    const pos = {
      x: 64,
      y: 64
    };

    function update() {
      marioSprite.draw('idle', context, pos.x, pos.y)
      pos.x += 2
      pos.y += 2
      requestAnimationFrame(update)
    }

    // update()

  });