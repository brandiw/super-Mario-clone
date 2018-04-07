const PRESSED = 1;
const RELEASED = 0;

export default class KeyboardState {
    constructor() {
        // holds the current state of a given key
        this.keyState = new Map();

        // holds the callback for a keyCode
        this.keyMap = new Map();
    }
    addMapping(code, callback) {
        this.keyMap.set(code, callback)
    }
    handleEvent(event) {
        const code = event.which;
        if (!this.keyMap.has(code)) {
            // did not have keyMapped
            return;
        }
        event.preventDefault();
        console.log(this)
        const keyState = event.type === 'keydown' ? PRESSED : RELEASED;

        if (this.keyState.get(code) === keyState) {
            return;
        }
        this.keyState.set(code, keyState);
        console.log(this.keyState)
        this.keyMap.get(code)(keyState)
    }
    listenTo(window) {
        ['keydown', 'keyup'].forEach(eventName => {
            window.addEventListener(eventName, event => {
                this.handleEvent(event)
            });
        });
    }
}