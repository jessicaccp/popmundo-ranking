import Ranking from "./Ranking.js";
import Alert from "./Alert.js";

// objects
const ranking = new Ranking();
const alert = new Alert();

// elements
const past = document.getElementById("past-paste");
const pastErase = document.getElementById("past-erase");
const current = document.getElementById("current-paste");
const currentErase = document.getElementById("current-erase");
const result = document.getElementById("result-paste");
const resultGenerate = document.getElementById("result-generate");
const resultCopy = document.getElementById("result-copy");
const resultErase = document.getElementById("result-erase");

// erase text from divs when clicking on the erase buttons
const buttonsErase = [pastErase, currentErase, resultErase];
const eraseText = (event) => {
  event.preventDefault();
  if (buttonsErase.includes(event.target)) result.innerHTML = "";
  if (event.target === pastErase) past.innerHTML = "";
  else if (event.target === currentErase) current.innerHTML = "";
};
buttonsErase.forEach((button) => button.addEventListener("click", eraseText));

// paste user formatted text to divs when pasting
const divsPaste = [past, current];
const pasteText = (event) => {
  event.preventDefault();
  event.target.innerHTML = event.clipboardData.getData("text/html");
};
divsPaste.forEach((div) => div.addEventListener("paste", pasteText));

// copy text from div when clicking or ctrl+c the result div or copy button
const elementsCopy = [result, resultCopy];
const copyText = (event) => {
  event.preventDefault();
  navigator.clipboard.writeText(result.innerHTML);
  if (result.innerHTML.length > 0) {
    alert.show("Copiado!", 1000, 1200);
  }
};
elementsCopy.forEach((element) => element.addEventListener("click", copyText));
elementsCopy.forEach((element) => element.addEventListener("copy", copyText));

// select all text from div when hovering over it
const eventsSelect = ["mouseenter", "mousemove", "mouseover"];
const selectText = (event) => {
  window.getSelection().selectAllChildren(event.target);
};
eventsSelect.forEach((event) => {
  result.addEventListener(event, selectText);
});

// generate ranking update when clicking on the generate button
const generateHandler = (event) => {
  if (past.innerText.length === 0 || current.innerText.length === 0) {
    alert.show("Por favor, preencha os campos com ambos os rankings.");
    return;
  }
  if (past.innerText === current.innerText) {
    alert.show("Os campos não podem ser iguais.");
    return;
  }
  ranking.update();
};
resultGenerate.addEventListener("click", generateHandler);
