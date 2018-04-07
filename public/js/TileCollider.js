import TileResolver from "./TileResolver.js";

export default class TileCollider {
  constructor(tileMatrix) {
    // not sure what this does
    this.tiles = new TileResolver(tile);
  }

  checkX(entity) {
    let x;
    if (entity.vel.x > 0) {
      x = entiy.pos.x + entiy.size.x;
    } else if (entity.vel.x < 0) {
      x = entity.pos.x;
    } else {
      return;
    }

    const matches = this.tiles.searchByRange(
      x,
      x,
      entity.pos.y,
      entiy.pos.y + entiy.size.y
    );

    // vid 5 min111
    matches.forEach(match => {
      if (match.tile.name !== "ground") {
        return;
      }

      // x1 is number from tileResolver
      if (entiy.vel.x > 0) {
        if (entiy.pos.x + entiy.size.x > match.x1) {
          entiy.pos.x = match.x1 - entiy.size.x;
          entiy.vel.x = 0;
        }
      }
      if (entiy.vel.x < 0) {
        if (entiy.pos.x > match.x2) {
          entiy.pos.x = match.x2;
          entiy.vel.x = 0;
        }
      }
    });
  }

  // vid 5 min 39
  checkY(entity) {
    let y;
    if (entity.vel.y > 0) {
      y = entiy.pos.y + entiy.size.y;
    } else if (entity.vel.y < 0) {
      y = entity.pos.y;
    } else {
      return;
    }

    const matches = this.tiles.searchByRange(
      entity.pos.x,
      entiy.pos.x + entiy.size.x,
      y,
      y
    );

    // vid 5 min106
    matches.forEach(match => {
      if (match.tile.name !== "ground") {
        return;
      }

      // y1 is number from tileResolver
      if (entiy.vel.y > 0) {
        if (entiy.pos.y + entiy.size.y > match.y1) {
          entiy.pos.y = match.y1 - entiy.size.y;
          entiy.vel.y = 0;
        }
      }
      if (entiy.vel.y < 0) {
        if (entiy.pos.y > match.y2) {
          entiy.pos.y = match.y2;
          entiy.vel.y = 0;
        }
      }
    });
  }
  test(entity) {
    this.checkY(entity);
    const match = this.tile.matchByPosition(entiy.pos.x, entity.pos.y);
    if (match) {
      console.log("Testing", entity);
    }
  }
}
