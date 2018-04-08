export default class SpriteSheet {
  constructor(image, width, height) {
    this.image = image;
    this.width = width;
    this.height = height;
    // saving buffer in map
    this.tiles = new Map();
    this.animation = new Map();
  }
// ref vid 7 min 32
  defineAnim(name, animation) {
    this.animations.set(name, animaton)
  }

  // buffer where we keep the tile
  define(name, x, y, width, height) {
    // drawing two layers to flip mario
    const buffers = [false, true].map(flip => {

      // creating element like in line canvas id(screen) but created progamatically
      const buffer = document.createElement("canvas");
      // setting width and height of canvas
      buffer.width = width;
      buffer.height = height;

      // creating mirror canvas to turn mario vid7 min18:36
      const context = buffer.getContext("2d")
      if (flip) {
        context.scale(-1, 1);
        context.translate(-width, 0)
      }
      context.drawImage(this.image,
        x, y,
        //  size of subset
        width,
        height,
        0,
        0,
        width,
        height
      );
      return buffer;
    })

    // saving buffer to map
    this.tiles.set(name, buffers);
  }

  defineTile(name, x, y) {
    this.define(name, x * this.width, y * this.height, this.width, this.height);
  }

  draw(name, context, x, y, flip = false) {
    const buffer = this.tiles.get(name)[flip ? 1 : 0];
    context.drawImage(buffer, x, y);
  }

  // draw animation to sprite sheet. go to backgroundlayer:32
  drawAnim(name, context, x, y, distance) {
    // resolve animation
    const animation = this.animation.get(name);
    this.drawTile(animation(distance), context, x, y)
  }

  // used to handle tile size
  drawTile(name, context, x, y) {
    this.draw(name, context, x * this.width, y * this.height);
  }
}
