const PRESSED = 1;
const RELEASED = 0;

export default class KeyboardState {
    constructor() {
        // holds the current state of a given key
        this.keyState = new Map();

        // holds the callback for a keyCode
        this.keyMap = new Map();
    }
    addMapping(keyCode, callback) {
        this.keyMap.set(keyCode, callback)
    }
    handleEvent(event) {
        const keyCode = event.which;
        if (!this.keyMap.has(keyCode)) {
            // did not have keyMapped
            return;
        }
        event.preventDefault();
        console.log(this)
        const keyState = event.type === 'keydown' ? PRESSED : RELEASED;

        if (this.keyState.get(keyCode) === keyState) {
            return;
        }
        this.keyState.set(keyCode, keyState);
        console.log(this.keyState)
        this.keyMap.get(keyCode)(keyState)
    }
    listenTo(window) {
        ['keydown', 'keyup'].forEach(eventName => {
            window.addEventListener(eventName, event => {
                this.handleEvent(event)
            });
        });
    }
}