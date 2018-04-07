// convert world position into tile indexes
export default class TileResolver {
  constructor(matrix, tileSize = 16) {
    this.matrix = matrix;
    this.tileSize = tileSize;
  }
  // vid 5 min 33
  toIndex(pos) {
    return Math.floor(pos / this.tileSize);
  }
  // vid 5 min 57 rewath if bugging at hr 1
  toIndexRange(pos1, pos2) {
    // search range stops
    const pMax = Math.ceil(pos2 / this.tileSize) * this.tileSize;
    // account for indexs in the range
    const range = [];
    let pos = pos1;
    do {
      range.push(this.toIndex(pos));
      // increamnt pos by tileSize vid5.58
      pos += this.tileSize;
    } while (pos < pMax);
    return range;
  }

  // return a tile based on index
  getByIndex(indexX, indexY) {
    const tile = this.matrix.get(indexX, indexY);
    if (tile) {
      const x1 = indexX * this.tileSize;
      const x2 = x1 + this.tileSize;
      const y1 = indexY * this.tileSize;
      const y2 = y1 + this.tileSize;
      return {
        tile,
        x1,
        x2,
        y1,
        y2
      };
    }
  }
  searchByPosition(posX, posY) {
    return this.getByIndex(this.toIndex(posX), this.toIndex(posY));
  }

  //    vid5 min 103 rewatch check comments
  searchByRange(x1, x2, y1, y2) {
    const matches = [];
    this.toIndexRange(x1m, x2).forEach(indexX => {
      this.toIndexRange(y1, y2).forEach(indexY => {
        const match = this.getByIndex(indexX, indexY);
        if (match) {
          matches.push(match);
        }
      });
    });
    return matches
  }
}
