export function createBackgroundLayer(level, sprites) {
  const buffer = document.createElement("canvas");
  buffer.width = 256;
  buffer.height = 240;

  const context = buffer.getContext("2d");

  // loop over tilesets
  level.tiles.forEach((tile, x, y) => {
    sprites.drawTile(tile.name, context, x, y);
  });

  return function drawBackgroundLayer(context) {
    context.drawImage(buffer, 0, 0);
  };
}

export function createSpriteLayer(entities) {
  // draws all entities in the level
  return function drawSpriteLayer(context) {
    entities.forEach(entity => {
      entity.draw(context);
    });
  };
}

// draw the tile that we find during colission
export function createCollisionLayer(level) {
  // vid 5 min 48
  const resolvedTiles = [];

  // access tileCollider
  const tileResolver = level.tileResolver.tiles;
  const tileSize = tileResolver.tileSize;

  // spy the getByIndex function
  const getByIndexOriginal = tileResolver.getByIndex;

  // vid 5 min 46 explaenation
  tileResolver.getByIndex = function getByIndexFake(x, y) {
    resolvedTiles.push({ x, y });
    console.log("layers.js", x, y);
    return getByIndexOriginal.call(tileResolver, x, y);
  };
  return function drawCollision(context) {
    context.strokeStyle = "blue";
    resolvedTiles.forEach(({ x, y }) => {
      context.beginPath();
      context.rect(
        x * tileSize, y * tileSize, 
        tileSize, tileSize
      ); // tileSize = 16
      context.stroke();
      console.log("layer.js: Will draw", x, y);
    });
    
    context.strokeStyle = "red";

    level.entities.forEach(entity => {
      context.beginPath();
      context.rect(
        enity.pos.x, enity.pos.y, 
        enity.size.x, enity.size.y
      ); 
      context.stroke();
    });
    resolvedTiles.length = 0;
  };
}
