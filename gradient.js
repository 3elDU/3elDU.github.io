function lerp(x, y, t) {
    return x * t + y * (1 - t);
}
function lerpGradient([r1, g1, b1], [r2, g2, b2], percent) {
    return [
        lerp(r2, r1, percent),
        lerp(g2, g1, percent),
        lerp(b2, b1, percent),
    ]
}
function randomColor() {
    return [
        Math.floor(Math.random() * 255),
        Math.floor(Math.random() * 255),
        Math.floor(Math.random() * 255),
    ]
}

const canvas = document.getElementById("canvas");
const canvasContainer = document.querySelector("#canvas-container");
let pixelSize, screenHeight, screenWidth;
let fps = 1 / 30;

function updateCanvasSize() {
    canvas.width = canvasContainer.clientWidth;
    canvas.height = canvasContainer.clientHeight;
    pixelSize = 64;
    screenWidth = canvasContainer.clientWidth / pixelSize;
    screenHeight = canvasContainer.clientHeight / pixelSize;
}
updateCanvasSize();

const ctx = canvas.getContext("2d");

class Color {
    color
    original
    new

    constructor(r, g, b) {
        this.color = [r, g, b]
        this.original = this.color
        this.new = randomColor()
    }

    static random() {
        return new Color(
            Math.floor(Math.random() * 255),
            Math.floor(Math.random() * 255),
            Math.floor(Math.random() * 255),
        )
    }
}

const colors = [
    Color.random(),
    Color.random(),
    Color.random(),
    Color.random(),
]
let changingColor = Math.floor(Math.random() * 4);

function render() {
    for (let x = 0; x < screenWidth; x++) {
        for (let y = 0; y < screenHeight; y++) {
            let [r, g, b] = lerpGradient(colors[0].color, colors[1].color, x / screenWidth);
            let [r2, g2, b2] = lerpGradient(colors[2].color, colors[3].color, y / screenHeight);

            ctx.fillStyle = `rgb(${(r + r2) / 2}, ${(g + g2) / 2}, ${(b + b2) / 2})`;
            ctx.fillRect(x * pixelSize, y * pixelSize, pixelSize + 1, pixelSize + 1);
        }
    }

    ctx.strokeStyle = `rgba(255, 255, 255, 0.25)`;
    ctx.lineWidth = 0.5;

    // draw vertical lines
    for (let x = 1; x < screenWidth; x++) {
        ctx.beginPath();
        ctx.moveTo(x * pixelSize, 0);
        ctx.lineTo(x * pixelSize, screenHeight * pixelSize);
        ctx.stroke();
    }

    // draw horizontal lines
    for (let y = 1; y < screenHeight; y++) {
        ctx.beginPath();
        ctx.moveTo(0, y * pixelSize);
        ctx.lineTo(screenWidth * pixelSize, y * pixelSize);
        ctx.stroke();
    }

    requestAnimationFrame(render);
}
requestAnimationFrame(render);

let i = fps;
function updateColors() {
    let orig = colors[changingColor].original;
    let newColor = colors[changingColor].new;
    colors[changingColor].color = lerpGradient(orig, newColor, i);
    i += fps;

    if (i >= 1) {
        colors[changingColor].original = colors[changingColor].color;
        colors[changingColor].new = randomColor();
        changingColor = Math.floor(Math.random() * 4);
        i = fps;
    }
}
setInterval(updateColors, 1000 * fps);

window.onresize = () => {
    updateCanvasSize();
};