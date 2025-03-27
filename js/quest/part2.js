import startPart3 from "./part3";
import { selectQuestPart } from "./util";

const fieldWidth = 16 * 2;
const fieldHeight = 9 * 2;
const uiCellSize = 32;

const canvasWidth = fieldWidth * uiCellSize;
const canvasHeight = fieldHeight * uiCellSize;

const quest = document.querySelector("#part2");

/** @type {HTMLCanvasElement} */
const canvas = document.querySelector("#part2-canvas");
/** @type {HTMLAudioElement} */
const sfx = document.querySelector("#part2-sfx");
const timer = document.querySelector("#part2-timer");

canvas.width = canvasWidth;
canvas.height = canvasHeight;
const ctx = canvas.getContext("2d");
ctx.font = `${uiCellSize}px monospace`;

const field = JSON.parse(
  atob(
    "W2ZhbHNlLGZhbHNlLGZhbHNlLHRydWUsZmFsc2UsdHJ1ZSxmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZSx0cnVlLGZhbHNlLHRydWUsZmFsc2UsZmFsc2UsZmFsc2UsZmFsc2UsZmFsc2UsZmFsc2UsdHJ1ZSxmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZSx0cnVlLHRydWUsZmFsc2UsdHJ1ZSxmYWxzZSx0cnVlLGZhbHNlLHRydWUsdHJ1ZSx0cnVlLHRydWUsdHJ1ZSxmYWxzZSx0cnVlLGZhbHNlLHRydWUsZmFsc2UsZmFsc2UsZmFsc2UsZmFsc2UsdHJ1ZSxmYWxzZSx0cnVlLHRydWUsdHJ1ZSx0cnVlLHRydWUsdHJ1ZSx0cnVlLHRydWUsdHJ1ZSxmYWxzZSxmYWxzZSx0cnVlLGZhbHNlLHRydWUsZmFsc2UsdHJ1ZSxmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZSx0cnVlLGZhbHNlLHRydWUsZmFsc2UsdHJ1ZSxmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZSx0cnVlLGZhbHNlLHRydWUsZmFsc2UsZmFsc2UsZmFsc2UsZmFsc2UsZmFsc2UsZmFsc2UsZmFsc2UsdHJ1ZSxmYWxzZSxmYWxzZSx0cnVlLGZhbHNlLHRydWUsdHJ1ZSx0cnVlLGZhbHNlLHRydWUsdHJ1ZSx0cnVlLGZhbHNlLHRydWUsZmFsc2UsdHJ1ZSxmYWxzZSx0cnVlLHRydWUsdHJ1ZSxmYWxzZSxmYWxzZSx0cnVlLGZhbHNlLHRydWUsZmFsc2UsdHJ1ZSx0cnVlLHRydWUsZmFsc2UsdHJ1ZSxmYWxzZSx0cnVlLGZhbHNlLGZhbHNlLHRydWUsZmFsc2UsZmFsc2UsZmFsc2UsZmFsc2UsZmFsc2UsZmFsc2UsZmFsc2UsdHJ1ZSxmYWxzZSx0cnVlLGZhbHNlLHRydWUsZmFsc2UsZmFsc2UsZmFsc2UsZmFsc2UsZmFsc2UsZmFsc2UsdHJ1ZSxmYWxzZSx0cnVlLGZhbHNlLHRydWUsZmFsc2UsZmFsc2UsZmFsc2UsdHJ1ZSxmYWxzZSx0cnVlLGZhbHNlLGZhbHNlLHRydWUsdHJ1ZSx0cnVlLHRydWUsdHJ1ZSx0cnVlLHRydWUsdHJ1ZSx0cnVlLGZhbHNlLHRydWUsZmFsc2UsdHJ1ZSx0cnVlLHRydWUsdHJ1ZSx0cnVlLHRydWUsdHJ1ZSx0cnVlLGZhbHNlLHRydWUsZmFsc2UsZmFsc2UsZmFsc2UsdHJ1ZSxmYWxzZSx0cnVlLGZhbHNlLHRydWUsZmFsc2UsZmFsc2UsZmFsc2UsZmFsc2UsZmFsc2UsdHJ1ZSxmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZSx0cnVlLGZhbHNlLHRydWUsZmFsc2UsZmFsc2UsZmFsc2UsZmFsc2UsZmFsc2UsZmFsc2UsZmFsc2UsZmFsc2UsZmFsc2UsZmFsc2UsdHJ1ZSxmYWxzZSx0cnVlLHRydWUsdHJ1ZSxmYWxzZSx0cnVlLGZhbHNlLHRydWUsZmFsc2UsdHJ1ZSx0cnVlLHRydWUsdHJ1ZSx0cnVlLGZhbHNlLHRydWUsdHJ1ZSxmYWxzZSx0cnVlLGZhbHNlLHRydWUsdHJ1ZSx0cnVlLHRydWUsdHJ1ZSxmYWxzZSx0cnVlLHRydWUsdHJ1ZSx0cnVlLHRydWUsdHJ1ZSxmYWxzZSx0cnVlLHRydWUsZmFsc2UsZmFsc2UsZmFsc2UsZmFsc2UsdHJ1ZSxmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZSx0cnVlLGZhbHNlLHRydWUsZmFsc2UsZmFsc2UsdHJ1ZSxmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZSx0cnVlLHRydWUsZmFsc2UsdHJ1ZSx0cnVlLHRydWUsdHJ1ZSxmYWxzZSx0cnVlLHRydWUsdHJ1ZSxmYWxzZSx0cnVlLGZhbHNlLHRydWUsdHJ1ZSx0cnVlLHRydWUsZmFsc2UsdHJ1ZSx0cnVlLGZhbHNlLHRydWUsZmFsc2UsdHJ1ZSxmYWxzZSx0cnVlLGZhbHNlLHRydWUsZmFsc2UsdHJ1ZSx0cnVlLHRydWUsdHJ1ZSxmYWxzZSx0cnVlLGZhbHNlLGZhbHNlLGZhbHNlLGZhbHNlLGZhbHNlLGZhbHNlLHRydWUsZmFsc2UsZmFsc2UsZmFsc2UsZmFsc2UsZmFsc2UsZmFsc2UsZmFsc2UsZmFsc2UsdHJ1ZSxmYWxzZSxmYWxzZSx0cnVlLGZhbHNlLHRydWUsZmFsc2UsdHJ1ZSxmYWxzZSx0cnVlLGZhbHNlLGZhbHNlLGZhbHNlLGZhbHNlLHRydWUsZmFsc2UsdHJ1ZSx0cnVlLHRydWUsdHJ1ZSx0cnVlLHRydWUsZmFsc2UsdHJ1ZSx0cnVlLHRydWUsdHJ1ZSx0cnVlLHRydWUsdHJ1ZSx0cnVlLHRydWUsdHJ1ZSxmYWxzZSxmYWxzZSx0cnVlLGZhbHNlLHRydWUsZmFsc2UsdHJ1ZSxmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZSx0cnVlLGZhbHNlLHRydWUsZmFsc2UsZmFsc2UsZmFsc2UsZmFsc2UsZmFsc2UsZmFsc2UsdHJ1ZSxmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZSx0cnVlLGZhbHNlLHRydWUsZmFsc2UsdHJ1ZSx0cnVlLHRydWUsdHJ1ZSx0cnVlLHRydWUsZmFsc2UsdHJ1ZSx0cnVlLHRydWUsdHJ1ZSxmYWxzZSx0cnVlLGZhbHNlLHRydWUsdHJ1ZSx0cnVlLHRydWUsZmFsc2UsdHJ1ZSx0cnVlLHRydWUsdHJ1ZSx0cnVlLGZhbHNlLHRydWUsdHJ1ZSxmYWxzZSx0cnVlLGZhbHNlLHRydWUsZmFsc2UsZmFsc2UsZmFsc2UsZmFsc2UsZmFsc2UsZmFsc2UsdHJ1ZSxmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZSx0cnVlLGZhbHNlLHRydWUsZmFsc2UsZmFsc2UsZmFsc2UsZmFsc2UsdHJ1ZSxmYWxzZSx0cnVlLGZhbHNlLGZhbHNlLGZhbHNlLGZhbHNlLGZhbHNlLGZhbHNlLGZhbHNlLGZhbHNlLHRydWUsZmFsc2UsdHJ1ZSx0cnVlLHRydWUsdHJ1ZSx0cnVlLHRydWUsZmFsc2UsdHJ1ZSx0cnVlLHRydWUsdHJ1ZSx0cnVlLHRydWUsZmFsc2UsdHJ1ZSxmYWxzZSxmYWxzZSx0cnVlLGZhbHNlLGZhbHNlLGZhbHNlLHRydWUsZmFsc2UsdHJ1ZSxmYWxzZSx0cnVlLHRydWUsdHJ1ZSx0cnVlLGZhbHNlLHRydWUsZmFsc2UsZmFsc2UsZmFsc2UsZmFsc2UsZmFsc2UsZmFsc2UsdHJ1ZSxmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZSx0cnVlLGZhbHNlLGZhbHNlLHRydWUsdHJ1ZSx0cnVlLGZhbHNlLHRydWUsZmFsc2UsdHJ1ZSxmYWxzZSxmYWxzZSxmYWxzZSx0cnVlLHRydWUsZmFsc2UsdHJ1ZSx0cnVlLHRydWUsdHJ1ZSx0cnVlLHRydWUsZmFsc2UsdHJ1ZSx0cnVlLHRydWUsdHJ1ZSx0cnVlLHRydWUsdHJ1ZSx0cnVlLHRydWUsdHJ1ZSxmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZSx0cnVlLGZhbHNlLHRydWUsdHJ1ZSx0cnVlLGZhbHNlLHRydWUsdHJ1ZSxmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZSx0cnVlLGZhbHNlLGZhbHNlLGZhbHNlLGZhbHNlLGZhbHNlLGZhbHNlLGZhbHNlLGZhbHNlLGZhbHNlLGZhbHNlLHRydWUsZmFsc2Vd"
  )
);

let playerX = 0;
let playerY = 0;

const targetX = fieldWidth - 1;
const targetY = fieldHeight - 1;

let timeRemaining = 61;

let framesRemaining = 400;
function drawMaskingCircle() {
  ctx.globalCompositeOperation = "source-over";
  draw();

  ctx.globalCompositeOperation = "destination-atop";
  ctx.beginPath();
  ctx.arc(
    targetX * uiCellSize + uiCellSize / 2,
    targetY * uiCellSize + uiCellSize / 2,
    framesRemaining * 5,
    0,
    2 * Math.PI,
    true
  );
  ctx.fillStyle = "rgba(255, 255, 255, 1.0)";
  ctx.fill();

  framesRemaining--;
  if (framesRemaining >= 0) {
    requestAnimationFrame(drawMaskingCircle);
  } else {
    startPart3();
  }
}

function lose() {
  document.removeEventListener("keydown", handleKey);
  quest.setAttribute("data-lose", "true");
  clearInterval(timerIntervalID);
}

async function win() {
  document.removeEventListener("keydown", handleKey);
  await sfx.play();
  quest.setAttribute("data-win", "true");
  requestAnimationFrame(drawMaskingCircle);
  clearInterval(timerIntervalID);
}

let timerIntervalID;
function tickTimer() {
  timeRemaining -= 1;
  timer.innerText = `${Math.floor(timeRemaining / 60)
    .toString()
    .padStart(2, "0")}:${(timeRemaining % 60).toString().padStart(2, "0")}`;

  if (timeRemaining < 20) {
    timer.setAttribute("data-low-on-time", "");
  }
  if (timeRemaining < 1) {
    lose();
  }
}

function draw() {
  for (let x = 0; x < fieldWidth; x++) {
    for (let y = 0; y < fieldHeight; y++) {
      ctx.fillStyle = field[y * fieldWidth + x]
        ? "rgb(255, 255, 255)"
        : "rgb(0, 0, 0)";
      ctx.fillRect(x * uiCellSize, y * uiCellSize, uiCellSize, uiCellSize);
    }
  }

  let catEmoji = "😺";
  const distanceToTarget = Math.sqrt(
    (targetX - playerX) * (targetX - playerX) +
      (targetY - playerY) * (targetY - playerY)
  );

  if (distanceToTarget < 5) {
    catEmoji = "😻";
  } else if (distanceToTarget < 10) {
    catEmoji = "😼";
  } else if (distanceToTarget < 15) {
    catEmoji = "😽";
  } else if (distanceToTarget < 25) {
    catEmoji = "😸";
  }

  ctx.fillText("🦊", targetX * uiCellSize - 6, targetY * uiCellSize + 24);
  ctx.fillText(catEmoji, playerX * uiCellSize - 6, playerY * uiCellSize + 24);
}

/** @param {KeyboardEvent} event */
function handleKey(event) {
  switch (event.code) {
    case "KeyA":
    case "ArrowLeft":
      if (playerX == 0) break;

      if (!field[playerY * fieldWidth + playerX - 1]) {
        playerX--;
        draw();
      }

      break;
    case "KeyD":
    case "ArrowRight":
      if (playerX == fieldWidth - 1) break;

      if (!field[playerY * fieldWidth + playerX + 1]) {
        playerX++;
        draw();
      }

      break;
    case "KeyW":
    case "ArrowUp":
      if (playerY == 0) break;

      if (!field[(playerY - 1) * fieldWidth + playerX]) {
        playerY--;
        draw();
      }

      break;
    case "KeyS":
    case "ArrowDown":
      if (playerY == fieldHeight - 1) break;

      if (!field[(playerY + 1) * fieldWidth + playerX]) {
        playerY++;
        draw();
      }

      break;
  }

  if (playerX == targetX && playerY == targetY) {
    win();
  }
}

export default function startPart2() {
  selectQuestPart(2);

  document.addEventListener("keydown", handleKey);

  draw();
  timerIntervalID = setInterval(tickTimer, 1000);
}
