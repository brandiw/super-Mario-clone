import SpriteSheet from "./SpriteSheet.js";
import { loadImage, loadLevel } from "./loaders.js";


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




loadImage("/image/tiles.png").then(image => {
  const sprites = new SpriteSheet(image, 16, 16);
  sprites.define("ground", 0, 0); // locate Ground tiles
  sprites.define("sky", 3, 23); // locate Sky tiles
  // sprites.draw("sky", context, 45, 62); // draw tile not working


  loadLevel('1-1').then(level => {
    console.log(level)
    level.backgrounds.forEach(background => {

      drawBackground(background, context, sprites)
    })
  })

  //   drawing the sky first spot = 0 till max 
  // for (let x = 0; x < 25; x++) {
  //   for (let y = 12; y < 14; y++) {
  //     sprites.drawTile("ground", context, x, y); // draw tile

  //   }
  // }
});
