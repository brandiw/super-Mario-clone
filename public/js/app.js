import SpriteSheet from "./SpriteSheet.js";
import { loadImage } from "./loaders.js";

const canvas = document.getElementById("screen");
const context = canvas.getContext("2d");

context.fillRect(0, 0, 50, 50);

loadImage("/image/tiles.jpg").then(image => {
  const sprites = new SpriteSheet(image, 16, 16);
  sprites.define("ground", 0, 0); // locate Ground tiles
  sprites.define("sky", 1.5, 9); // locate Sky tiles
  sprites.draw("sky", context, 45, 62); // draw tile not working
  

//      first spot = 0 till max 
//   for ( let x = 0; x < 25; x++ ) {
//       for ( let y = 0; y < 14; y++ ) {
//         //   multiply by 16 because draw method doesnt include tile sizes
//         sprites.draw("sky", context, x * 16, y * 16); // draw tile

//       }
//   }
});
