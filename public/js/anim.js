// vid 7.15:23
export function createAnim(frames, frameLen) {
    return function resolveFrame(distance) {
        const frameIndex = Math.floor(distance / frameLen) % frames.length;
        const frameName = frames[frameIndex];    
        return frameName;    
    }
}