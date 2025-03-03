// Interpolate between two values
function lerp(x, y, t) {
  return x * (1 - t) + y * t;
}
// Interpolate between two RGB colors
function lerpColor([r1, g1, b1], [r2, g2, b2], percent) {
  return [lerp(r1, r2, percent), lerp(g1, g2, percent), lerp(b1, b2, percent)];
}
function randomColor() {
  return [
    Math.floor(Math.random() * 255),
    Math.floor(Math.random() * 255),
    Math.floor(Math.random() * 255),
  ];
}

const canvas = document.getElementById("canvas");
const canvasContainer = document.querySelector("#canvas-container");
let pixelSize, screenHeight, screenWidth;
let fps = 30;

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
  color;
  original;
  new;

  constructor(r, g, b) {
    this.color = [r, g, b];
    this.original = this.color;
    this.new = randomColor();
  }

  static random() {
    return new Color(
      Math.floor(Math.random() * 255),
      Math.floor(Math.random() * 255),
      Math.floor(Math.random() * 255)
    );
  }
}

const mousePixels = [];
const colors = [Color.random(), Color.random(), Color.random(), Color.random()];
let changingColor = Math.floor(Math.random() * 4);

function render() {
  for (let x = 0; x < screenWidth; x++) {
    for (let y = 0; y < screenHeight; y++) {
      let [r, g, b] = lerpColor(
        colors[0].color,
        colors[1].color,
        x / screenWidth
      );
      let [r2, g2, b2] = lerpColor(
        colors[2].color,
        colors[3].color,
        y / screenHeight
      );

      ctx.fillStyle = `rgb(${(r + r2) / 2}, ${(g + g2) / 2}, ${(b + b2) / 2})`;
      ctx.fillRect(x * pixelSize, y * pixelSize, pixelSize + 1, pixelSize + 1);
    }
  }

  for (const pixel of mousePixels) {
    ctx.fillStyle = `rgba(255, 255, 255, ${pixel.alpha / 3})`;
    ctx.fillRect(
      pixel.x * pixelSize,
      pixel.y * pixelSize,
      pixelSize,
      pixelSize
    );
    pixel.alpha -= 1 / fps;
    if (pixel.alpha <= 0) {
      mousePixels.splice(mousePixels.indexOf(pixel), 1);
    }
  }
}
setInterval(render, 1000 / fps);

let i = 1 / fps;
function updateColors() {
  let orig = colors[changingColor].original;
  let newColor = colors[changingColor].new;
  colors[changingColor].color = lerpColor(orig, newColor, i);
  i += 1 / fps;

  if (i >= 1) {
    colors[changingColor].original = colors[changingColor].color;
    colors[changingColor].new = randomColor();
    changingColor = Math.floor(Math.random() * 4);
    i = 1 / fps;
  }
}
setInterval(updateColors, 1000 / fps);

window.onresize = () => {
  updateCanvasSize();
  render();
};

const previousMouseCell = [NaN, NaN];
window.onmousemove = (event) => {
  const x = Math.floor(event.clientX / pixelSize);
  const y = Math.floor(event.clientY / pixelSize);
  if (x !== previousMouseCell[0] || y !== previousMouseCell[1]) {
    mousePixels.push({
      x,
      y,
      alpha: 1,
    });
    previousMouseCell[0] = x;
    previousMouseCell[1] = y;
  }
};
