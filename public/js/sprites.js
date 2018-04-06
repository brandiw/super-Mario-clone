import SpriteSheet from "./SpriteSheet.js";
import { loadImage } from "./loaders.js";


export function loadMarioSprite() {
    return loadImage("/image/characters.gif").then(image => {
      const sprites = new SpriteSheet(image, 16, 16);
      sprites.define("idle", 276, 44, 16, 16); // locate Idle Mario tiles
      return sprites
    });
  }
  
  export function loadBackgroundSprites() {
    return loadImage("/image/tiles.png").then(image => {
      const sprites = new SpriteSheet(image, 16, 16);
      sprites.defineTile("ground", 0, 0); // locate Ground tiles
      sprites.defineTile("sky", 3, 23); // locate Sky tiles
      // sprites.draw("sky", context, 45, 62); // draw tile not working
      return sprites
    });
  }