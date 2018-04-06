export default class Timer {
    constructor(deltaTime = 1 / 60) {
        let accumlatedTime = 0;
        let lastTime = 0;

        this.updateProxy = (time) => {
            accumlatedTime += (time - lastTime) / 1000;

            //  vid 3 23.00
            while (accumlatedTime > deltaTime) {
                this.update(deltaTime)
                // comp.draw(context);
                // mario.update(deltaTime);
                // mario.vel.y += gravity;
                accumlatedTime -= deltaTime
            }

            lastTime = time
            this.enqueu()
        }
    }
    enqueu() {
        requestAnimationFrame(this.updateProxy);

    }


    start() {
        this.enqueu()
    }
}