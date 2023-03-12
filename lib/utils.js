const clamp = (num, min, max) => Math.min(Math.max(num, min), max);


function randInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}