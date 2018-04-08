export class Matrix {
  constructor() {
    this.grid = [];
  }

  // loop over tilesets
  forEach(callBack) {
    this.grid.forEach((column, x) => {
      column.forEach((value, y) => {
        callBack(value, x, y);
      });
    });
  }

  get(x, y) {
    const col = this.grid[x];

    if (col) {
      return col[y];
    }
    return undefined;
  }
  // vid 5 mind 20:12 tile collision
  set(x, y, value) {
    if (!this.grid[x]) {
      this.grid[x] = [];
    }
    this.grid[x][y] = value;
  }
}


export class Vec2 {
  constructor(x, y) {
    this.set(x, y);
  }
  set(x, y) {
    this.x = x;
    this.y = y;
  }
}
