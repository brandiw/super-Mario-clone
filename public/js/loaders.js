import Level from "./Level.js";
import SpriteSheet from './SpriteSheet.js';
import { createBackgroundLayer, createSpriteLayer } from "./layers.js";
import { createAnim } from "./anim.js"


export function loadImage(url) {
  return new Promise(resolve => {
    const image = new Image();
    image.addEventListener("load", () => {
      resolve(image);
    });
    image.src = url;
  });
}

function loadJSON(url) {
 return fetch(url).then(r => r.json())
}

// vid 6 min 15 creating tiles and such
function createTiles(level, backgrounds) {

  // vid 6 min 19 used to simplfy levels.json
  function applyRange(background, xStart, xLen, yStart, yLen) {
    const xEnd = xStart + xLen;
    const yEnd = yStart + yLen;

    for (let x = xStart; x < xEnd; ++x) {
      for (let y = yStart; y < yEnd; ++y) {
        level.tiles.set(x, y, {
          name: background.tile,
          type: background.type,
        });
      }
    }
  }

  backgrounds.forEach(background => {
    background.ranges.forEach((range) => {
      if (range.length === 4) {

        const [xStart, xLen, yStart, yLen] = range;
        applyRange(background, xStart, xLen, yStart, yLen)
      }
      else if (range.length === 3) {

        const [xStart, xLen, yStart] = range;
        applyRange(background, xStart, xLen, 1)
      }
      else if (range.length === 2) {

        const [xStart, yStart] = range;
        applyRange(background, xStart, 1, yStart, 1)
      }
    });
  });
}

// vid 6 min 25
export function loadSpriteSheet(name) {
  return loadJSON(`./sprites/${name}.json`)
    .then(sheetSpec => Promise.all([
      sheetSpec,
      loadImage(sheetSpec.imageURL),
    ]))
    .then(([sheetSpec, image]) => {
      const sprites = new SpriteSheet(
        image,
        sheetSpec.tileW,
        sheetSpec.tileH);

      // if theres tiles in json loop over
      if (sheetSpec.tiles) {
        // loop thro tiles. vid 6 min 31
        sheetSpec.tiles.forEach(tileSpec => {
          sprites.defineTile(
            tileSpec.name,
            tileSpec.index[0],
            tileSpec.index[1]); // locate Ground tiles
        });
      }

      // if theres frames than loop over that
      if (sheetSpec.frames) {
        sheetSpec.frames.forEach(frameSpec => {
          sprites.define(frameSpec.name, ...frameSpec.rect)
        })
      }

      // clause for parsing animations vid7 min 30 goes to spriteSheet.js
      if (sheetSpec.animations) {
        sheetSpec.animations.forEach(animSpec => {
          const animation = createAnim(animSpec.frames, animSpec.frameLen);
          sprites.defineAnim(animSpec.name, animation)
        })
      }
      // console.log('loaders:98', sprites)
      
      // sprites.defineTile('sky', 3, 23); // locate Sky tile
      return sprites;
    });

}


// loading level from levels JSON
export function loadLevel(name) {
  return loadJSON(`./levels/${name}.json`)
    .then(levelSpec => Promise.all([
      levelSpec,
      loadSpriteSheet(levelSpec.spriteSheet),
    ]))
    .then(([levelSpec, backgroundSprites]) => {
      const level = new Level();

      //  create matrix for collision
      createTiles(level, levelSpec.backgrounds);

      const backgroundLayer = createBackgroundLayer(level, backgroundSprites);
      level.comp.layers.push(backgroundLayer);

      const spriteLayer = createSpriteLayer(level.entities);
      level.comp.layers.push(spriteLayer);

      return level;
    });
}
