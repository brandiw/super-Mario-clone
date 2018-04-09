import Level from "../Level.js";
import { createBackgroundLayer, createSpriteLayer } from "../layers.js";
import { loadJSON, loadSpriteSheet } from "../loaders.js";

// loading level from levels JSON
export function loadLevel(name) {
  return loadJSON(`./levels/${name}.json`)
    .then(levelSpec =>
      Promise.all([levelSpec, loadSpriteSheet(levelSpec.spriteSheet)])
    )
    .then(([levelSpec, backgroundSprites]) => {
      const level = new Level();

      //  create matrix for collision
      createTiles(level, levelSpec.patterns);

      const backgroundLayer = createBackgroundLayer(level, backgroundSprites);
      level.comp.layers.push(backgroundLayer);

      const spriteLayer = createSpriteLayer(level.entities);
      level.comp.layers.push(spriteLayer);

      return level;
    });
}

// vid 6 min 19 used to simplfy levels.json
function* expandSpan(xStart, xLen, yStart, yLen) {
  function applyRange(tile, xStart, xLen, yStart, yLen) {
    // const cords = []; remove becuae of yield
    const xEnd = xStart + xLen;
    const yEnd = yStart + yLen;

    for (let x = xStart; x < xEnd; ++x) {
      for (let y = yStart; y < yEnd; ++y) {
        yield {x, y};
      }
    }
  }
// wehn run expandRange we create a generator fot exapndSpan
  function expandRange(range) {
    if (range.length === 4) {
        const [xStart, xLen, yStart, yLen] = range;
        return expandSpan(xStart, xLen, yStart, yLen);
      } else if (range.length === 3) {
        const [xStart, xLen, yStart] = range;
        return expandSpan(xStart, xLen, 1);
      } else if (range.length === 2) {
        const [xStart, yStart] = range;
        return expandSpan(xStart, 1, yStart, 1);
      }
  }

//   itterate over tile.ranges
function* expandRanges(range) {
    for ( const range of ranges ) {
       for(const item of expandRange(range)) {
           yield item;
       }
    }
}

  // vid 6 min 15 creating tiles and such
  function createTiles(level, tile, patterns) {
    //   vid 9 min 27 used to lessen the params in function above
    function walkTiles(tiles, offsetX, offsetY) {

    for ( const tile of tiles ) {
        for (const { x, y } of expandRanges(tile.ranges)) {
            const derivedX = x + offsetX;
            const derivedY = x + offsetY;
    
            if (tile.pattern) {
              const tiles = patterns[tile.pattern].tiles;
              console.log("level.js:75", patterns[tile.pattern]);
              walkTiles(tiles,  derivedX, derivedY);
            } else {
              level.tiles.set(derivedX, derivedY, {
                name: tile.tile,
                type: tile.type
              });
            }
          }
        }
      }
  }
  walkTiles(tiles, 0, 0)
}
