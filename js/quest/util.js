/** @param n {number} */
export function selectQuestPart(n) {
  window.scrollTo({ top: 0, behavior: "instant" });
  document.querySelector("#quest").classList.add("open");

  document.querySelectorAll("#quest > *").forEach((node) => {
    if (node.id.endsWith(n.toString())) {
      node.classList.add("open");
    } else {
      node.classList.remove("open");
    }
  });
}

export function hideQuest() {
  document
    .querySelectorAll("#quest > *")
    .forEach((node) => node.classList.remove("open"));
  document.querySelector("#quest").classList.remove("open");
}
