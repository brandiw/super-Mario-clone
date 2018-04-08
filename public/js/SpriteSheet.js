export default class SpriteSheet {
  constructor(image, width, height) {
    this.image = image;
    this.width = width;
    this.height = height;
    // saving buffer in map
    this.tiles = new Map();
  }

  // buffer where we keep the tile
  define(name, x, y, width, height) {
    // creating element like in line canvas id(screen) but created progamatically
    const buffer = document.createElement("canvas");
    // setting width and height of canvas
    buffer.width = width;
    buffer.height = height;
    // drawing subset of image
    buffer
      .getContext("2d")
      .drawImage(this.image,
                 x, y, 
                //  size of subset
                 width, 
                 height, 
                 0,
                 0, 
                 width, 
                 height
                );
      // saving buffer to map
    this.tiles.set(name, buffer);
  }

  defineTile(name, x, y) {
    this.define(name, x * this.width, y * this.height, this.width, this.height);
  }

  draw(name, context, x, y) {
    const buffer = this.tiles.get(name);
    context.drawImage(buffer, x, y);
  }
// used to handle tile size
  drawTile(name, context, x, y) {
    this.draw(name, context, x * this.width, y * this.height);
  }
}
