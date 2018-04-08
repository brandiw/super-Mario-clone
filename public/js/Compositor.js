// draw all layers in order
export default class Compositor {
  constructor() {
      this.layers = [];
  }

  draw(context) {
// layer is a function that draws on a context contains all the info to draw itself
      
      this.layers.forEach(layer => {
          layer(context);
      });
  }
}
