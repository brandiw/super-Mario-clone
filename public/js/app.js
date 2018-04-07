import Entity from "./Entity.js";
import Timer from "./Timer.js ";
import { loadLevel } from "./loaders.js";
import { createMario } from "./entities.js";
import { createCollisionLayer } from "./layers.js";
import Compositor from "./Compositor.js";
import { setupKeyboard } from "./input.js";

const canvas = document.getElementById("screen");
const context = canvas.getContext("2d");

// loading two functions in parallel, would like to review this more in depth
Promise.all([createMario(), loadLevel("1-1")]).then(([mario, level]) => {
  const comp = new Compositor();

  mario.pos.set(64, 180);

  createCollisionLayer(level);

  level.enties.add(mario);

  const input = setupKeyBoard(mario)[
    // get mario to follow mouse
    ("mousedown", "mousemove")
  ].forEach(eventName => {
    canvas.addEventListener(eventName, event => {
      if (event.buttons === 1) {
        mario.vel.set(0, 0);
        mario.pos.set(event.offsetX, event.offsetY);
      }
    });
  });

  const timer = new Timer(1 / 60);
  timer.update = function update(deltaTime) {
    level.update(level);
    level.comp.draw(context);
    
    
  };

  timer.start();
});
