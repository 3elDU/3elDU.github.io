import startPart1 from "./quest/part1";
import { shuffle } from "./util";

/** @type {string[]} */
let technologies = [
  "JavaScript",
  "C",
  "HTML",
  "CSS",
  "Linux",
  "Docker",
  "Neovim",
  "OpenBSD",
  "Nuxt",
  "Vue.js",
  "ReactJS",
  "Go",
  "Python",
  "ESP32",
  "Arduino",
  "Cats",
];

const now = new Date();
const isBday = now.getMonth() == 2 && now.getDate() == 28;

const label = document.getElementById("technology");
function openQuest() {
  label.removeEventListener("click", openQuest);
  label.style.cursor = "auto";
  startPart1();
}

if (isBday) {
  technologies = ["quests?"];
  label.setAttribute("data-bday", "");
  label.style.cursor = "pointer";
  label.addEventListener("click", openQuest);
}

shuffle(technologies);
let currentTechnology = 0;

let targetText = technologies[currentTechnology];
// if typing - true
// if erasing - false
let typing = true;
let pause = false;
// In characters per second
const typingSpeed = 7;

function addCharacter() {
  const idx = label.innerText.length;
  if (idx == targetText.length) {
    pause = true;

    if (!isBday) {
      setTimeout(() => {
        typing = false;
        pause = false;
      }, (1000 / typingSpeed) * 5);
    }
  }

  label.innerText += targetText.charAt(idx);
}

function removeCharacter() {
  label.innerText = label.innerText.slice(0, label.innerText.length - 1);
  if (label.innerText.length == 0) {
    pause = true;
    setTimeout(() => {
      currentTechnology++;
      if (currentTechnology == technologies.length) {
        currentTechnology = 0;
      }

      targetText = technologies[currentTechnology];
      typing = true;
      pause = false;
    }, (1000 / typingSpeed) * 5);
  }
}

function update() {
  if (pause) {
    return;
  }

  if (typing) {
    addCharacter();
  } else {
    removeCharacter();
  }
}
setTimeout(() => {
  setInterval(update, 1000 / typingSpeed);
}, 1000);
