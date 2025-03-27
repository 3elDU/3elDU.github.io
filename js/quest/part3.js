import { hideQuest } from "./util";

function mow() {
  const elements = document.querySelectorAll(
    "main :is(p, h1, h2, h3, h4, h5, h6, span, footer)"
  );

  for (const element of elements) {
    let replacement = "";

    for (const word of element.innerText.split(" ")) {
      console.log(word);

      let mow = "";

      if (/[A-Z]/.test(word.charAt(0))) {
        mow += "M";
      } else {
        mow += "m";
      }

      mow += "o".repeat(Math.max(word.length - 2, 1));
      mow += "w ";

      replacement += word.replace(/[A-Za-z]*/, mow);
    }

    element.innerText = replacement;
  }

  console.log(elements);
}

export default function startPart3() {
  hideQuest();

  document.querySelector("#title").innerText = "Happy birthday!";
  document.querySelector("#aka").innerText = "my love";
  document.querySelector("#technology").innerText = "you!";

  mow();

  const defaults = {
    colors: [
      "#0000cd", // blue
      "#87ceeb", // light blue
      "#9400d3", // purple
    ],
  };
  setInterval(() => {
    confetti({
      ...defaults,
      position: {
        x: 0,
        y: 50,
      },
      angle: 45,
    });
    confetti({
      ...defaults,
      position: {
        x: 100,
        y: 50,
      },
      angle: 135,
    });
  }, 1000);
}
