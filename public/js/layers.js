export function createBackgroundLayer(level, sprites) {
  const tiles = level.tiles;
  const resolver = level.tileCollider.tiles;

  const buffer = document.createElement("canvas");
  buffer.width = 256 + 16;
  buffer.height = 240;

  const context = buffer.getContext("2d");

  let startIndex, endIndex;

  // create only layers that we see
  function redraw(drawFrom, drawTo) {

    // vid 6 min 51
    startIndex = drawFrom;
    endIndex = drawTo
    
    // console.log('Redrawing layer.js: 23')

    // subset of tile matrix
    for (let x = startIndex; x <= endIndex; ++x) {
      const col = tiles.grid[x];

      //   checking id col exists
      if (col) {
        col.forEach((tile, y) => {
          // if an animation has been defined than draw it vid7 min 38
          if (sprites.animation.has(tile)) {
            sprites.drawAnim(tile.name, context, x - startIndex, y, level.totalTime);
          } else {
            sprites.drawTile(tile.name, context, x - startIndex, y);
          }
        });
      }
    }
  }

  return function drawBackgroundLayer(context, camera) {
    //   figure out what to draw
    const drawWidth = resolver.toIndex(camera.size.x);
    // gert the first index that we call draw from
    const drawFrom = resolver.toIndex(camera.pos.x);
    const drawTo = drawFrom + drawWidth;
    redraw(drawFrom, drawTo);

    context.drawImage(
      buffer,
      // smmoth scrolling vid 6 min 50ish
      -camera.pos.x % 16,
      -camera.pos.y
    );
  };
}

export function createSpriteLayer(entities, width = 64, height = 64) {
  const spriteBuffer = document.createElement("canvas");
  spriteBuffer.width = width;
  spriteBuffer.height = height;
  const spriteBufferContext = spriteBuffer.getContext("2d");

  return function drawSpriteLayer(context, camera) {
    entities.forEach(entity => {
      spriteBufferContext.clearRect(0, 0, width, height);

      entity.draw(spriteBufferContext);
      // vid6 min6
      context.drawImage(
        spriteBuffer,
        entity.pos.x - camera.pos.x,
        entity.pos.y - camera.pos.y
      );
    });
  };
}
//  create hit boxes
export function createCollisionLayer(level) {
  const resolvedTiles = [];

  const tileResolver = level.tileCollider.tiles;
  const tileSize = tileResolver.tileSize;

  const getByIndexOriginal = tileResolver.getByIndex;
  tileResolver.getByIndex = function getByIndexFake(x, y) {
    resolvedTiles.push({ x, y });
    return getByIndexOriginal.call(tileResolver, x, y);
  };

  return function drawCollision(context, camera) {
    context.strokeStyle = "blue";
    resolvedTiles.forEach(({ x, y }) => {
      context.beginPath();
      context.rect(
        x * tileSize - camera.pos.x,
        y * tileSize - camera.pos.y,
        tileSize,
        tileSize
      );
      context.stroke();
    });

    context.strokeStyle = "red";
    level.entities.forEach(entity => {
      context.beginPath();
      context.rect(
        entity.pos.x - camera.pos.x,
        entity.pos.y - camera.pos.y,
        entity.size.x,
        entity.size.y
      );
      context.stroke();
    });

    resolvedTiles.length = 0;
  };
}

// used for scrolling vid 6 min 38
// cameraToDraw = rect that we draw
// fromCamera = perspective to draw from
export function createCameraLayer(cameraToDraw) {
  return function drawCameraRect(context, fromCamera) {
    context.strokeStyle = "purple";

    context.rect(
      cameraToDraw.pos.x - fromCamera.pos.x,
      cameraToDraw.pos.y - fromCamera.pos.y,
      cameraToDraw.size.x,
      cameraToDraw.size.y
    );
    context.stroke();
  };
}
