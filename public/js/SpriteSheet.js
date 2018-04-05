export default class SpriteSheet {
  constructor(image, width, height) {
    this.image = image;
    this.width = width;
    this.height = height;
    // saving buffer in map
    this.tiles = new Map();
  }
  // buffer where we keep the tile
  define(name, x, y) {
    // creating element like in line canvas id(screen) but created progamatically
    const buffer = document.createElement("canvas");
    // setting width and height of canvas
    buffer.width = this.width;
    buffer.height = this.height;
    // drawing subset of image
    buffer.getContext("2d").drawImage(
      this.image,
      x * this.width,
      y * this.height,
      // size of subset
      this.width,
      this.height,
      // full buffer of subset
      0,
      0,
      this.width,
      this.height
    );
    // saving buffer to map
    this.tiles.set(name, buffer);
  }
  // draw
  draw(name, context, x, y) {
    // retrieve buffer from tilesets
    const buffer = this.tiles.get(name);
    context.drawImage(buffer, x, y);
  }
}
