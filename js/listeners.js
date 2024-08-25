import Ranking from "./Ranking.js";

const ranking = new Ranking();
const warning = document.getElementById("warning");

// past ranking post elements
const past = document.getElementById("past-paste");
const pastErase = document.getElementById("past-erase");

// current ranking post elements
const current = document.getElementById("current-paste");
const currentErase = document.getElementById("current-erase");

// generated ranking post elements
const generated = document.getElementById("generated-paste");
const generatedOk = document.getElementById("new-generate");
const generatedCopy = document.getElementById("new-copy");

// erase text from element (past or current)
const eraseText = (event, element) => {
  event.preventDefault();
  element.innerHTML = "";
};

// paste text to element (past or current)
const pasteText = (event) => {
  event.preventDefault();
  event.target.innerHTML = event.clipboardData.getData("text/html");
};

// copy text from element (generated)
const copyText = (event) => {
  event.preventDefault();
  navigator.clipboard.writeText(generated.innerHTML);
  if (generated.innerText.length > 0) {
    warning.innerText = "Copiado!";
  }
};

// erase buttons
pastErase.addEventListener("click", (event) => eraseText(event, past));
currentErase.addEventListener("click", (event) => eraseText(event, current));

// paste divs
past.addEventListener("paste", pasteText);
current.addEventListener("paste", pasteText);

// copy button
generatedCopy.addEventListener("click", copyText);
generated.addEventListener("click", copyText);
["mouseenter", "mousemove", "mouseover"].forEach((event) => {
  generated.addEventListener(event, (e) => {
    window.getSelection().selectAllChildren(generated);
  });
});
generated.addEventListener("copy", copyText);

// generate button
generatedOk.addEventListener("click", (e) => ranking.update());
