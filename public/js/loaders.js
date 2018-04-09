import SpriteSheet from "./SpriteSheet.js";
import { createAnim } from "./anim.js";

export function loadImage(url) {
  return new Promise(resolve => {
    const image = new Image();
    image.addEventListener("load", () => {
      resolve(image);
    });
    image.src = url;
  });
}

// export to ./loaders/level.js
export function loadJSON(url) {
  return fetch(url).then(r => r.json());
}

// vid 6 min 25
export function loadSpriteSheet(name) {
  return loadJSON(`./sprites/${name}.json`)
    .then(sheetSpec => Promise.all([sheetSpec, loadImage(sheetSpec.imageURL)]))
    .then(([sheetSpec, image]) => {
      const sprites = new SpriteSheet(image, sheetSpec.tileW, sheetSpec.tileH);

      // if theres tiles in json loop over
      if (sheetSpec.tiles) {
        // loop thro tiles. vid 6 min 31
        sheetSpec.tiles.forEach(tileSpec => {
          sprites.defineTile(
            tileSpec.name,
            tileSpec.index[0],
            tileSpec.index[1]
          ); // locate Ground tiles
        });
      }

      // if theres frames than loop over that
      if (sheetSpec.frames) {
        // this is working
        // console.log('looping frame, loaders', sheetSpec.frames)
        
        sheetSpec.frames.forEach(frameSpec => {
          sprites.define(frameSpec.name, ...frameSpec.rect);
        });
      }

      // clause for parsing animations vid7 min 30 goes to spriteSheet.js
      if (sheetSpec.animations) {
        sheetSpec.animations.forEach(animSpec => {
          const animation = createAnim(animSpec.frames, animSpec.frameLen);
          sprites.defineAnim(animSpec.name, animation);
        });
      }
      console.log('loaders:52', name)
      console.log('loaders:53', sprites)

      // sprites.defineTile('sky', 3, 23); // locate Sky tile
      return sprites;
    });
}
