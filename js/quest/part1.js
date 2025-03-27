import { shuffle } from "../util";
import startPart2 from "./part2";
import { selectQuestPart } from "./util";

const emojisCorrect = ["🦊", "🇯🇵", "🍣", "🍕", "🪢", "👨‍❤️‍👨"];
const emojisWrong = ["🐛", "🐞", "🐜", "🪰", "🪲", "🐷", "🐗", "🐺", "🕷", "🐍"];

let correctGuesses = 0;
let wrongGuesses = 0;

function disableButtons() {
  document
    .querySelectorAll("#emoji-buttons-container > button")
    .forEach((node) => (node.disabled = true));
}

function gameOver() {
  disableButtons();

  const h1 = document.querySelector("#part1 > h1");
  h1.innerText = "You're not the real snep!!!";
}

function win() {
  disableButtons();

  const h1 = document.querySelector("#part1 > h1");
  h1.innerText = "You're the real snep!!!";

  setTimeout(() => {
    startPart2();
  }, 3000);
}

function checkState() {
  if (wrongGuesses > 0) {
    gameOver();
  }

  if (correctGuesses == emojisCorrect.length) {
    win();
  }
}

/** @param event {MouseEvent} */
function handleClick(event) {
  const correct = event.target.getAttribute("data-correct") === "true";

  if (correct) {
    event.target.innerText = "✅";
    correctGuesses++;
  } else {
    event.target.innerText = "❌";
    wrongGuesses++;
  }

  event.target.disabled = true;
  checkState();
}

export default function startPart1() {
  /** @type {{correct: boolean; emoji: string}[]} */
  const emojisAll = shuffle([
    ...emojisCorrect.map((emoji) => ({
      correct: true,
      emoji,
    })),
    ...emojisWrong.map((emoji) => ({
      correct: false,
      emoji,
    })),
  ]);

  const buttonsContainer = document.querySelector("#emoji-buttons-container");

  for (let i = 0; i < 16; i++) {
    const btn = document.createElement("button");
    btn.classList.add("emoji-button");
    btn.innerText = emojisAll[i].emoji;
    btn.setAttribute("data-correct", emojisAll[i].correct);
    btn.addEventListener("click", handleClick);

    buttonsContainer.appendChild(btn);
  }

  selectQuestPart(1);
}
