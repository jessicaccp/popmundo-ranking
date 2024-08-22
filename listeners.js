import * as ranking from "./ranking.js";

// last ranking post elements
const last = document.getElementById("last-paste");
const lastErase = document.getElementById("last-erase");
const lastWarning = document.getElementById("last-warning");

// current ranking post elements
const current = document.getElementById("current-paste");
const currentErase = document.getElementById("current-erase");

// generated ranking post elements
const generated = document.getElementById("generated-paste");
const generatedOk = document.getElementById("new-generate");
const generatedCopy = document.getElementById("new-copy");

// erase text from element (last or current)
const eraseText = (event, element) => {
  event.preventDefault();
  element.innerHTML = "";
  if (element === last) {
    lastWarning.classList = "hidden";
  }
};

// paste text to element (last or current)
const pasteText = (event) => {
  event.preventDefault();
  event.target.innerHTML = event.clipboardData.getData("text/html");
  const nodes = event.target.childNodes;

  if (event.target === last) {
    try {
      if (
        nodes[2].nodeName !== "STRONG" ||
        nodes[3].nodeName !== "BR" ||
        nodes[4].nodeName !== "#text" ||
        nodes[5].nodeName !== "BR" ||
        nodes[6].nodeName !== "BR" ||
        nodes[7].nodeName !== "STRONG" ||
        nodes[8].nodeName !== "#text" ||
        nodes[9].nodeName !== "A"
      ) {
        lastWarning.classList = "block";
      } else {
        lastWarning.classList = "hidden";
      }
    } catch (error) {
      console.log(error);
    }
  }
};

// copy text from element (generated)
const copyText = (event, element) => {
  event.preventDefault();
  event.clipboardData.setData("text/html", element.innerHTML);
};

// generate forum post (generated)
const generateText = (event, element) => {
  event.preventDefault();
  generated.innerHTML = ranking.generateRanking(last, current);
};

// erase buttons
lastErase.addEventListener("click", (event) => eraseText(event, last));
currentErase.addEventListener("click", (event) => eraseText(event, current));

// paste divs
last.addEventListener("paste", pasteText);
current.addEventListener("paste", pasteText);

// copy button
generatedCopy.addEventListener("click", (event) => copyText(event, generated));

// generate button
generatedOk.addEventListener("click", (event) =>
  generateText(event, generated)
);

last.addEventListener("change", (event) => {
  if (last.childNodes[3].nodeName !== "BR") {
    lastWarning.classList = "block";
  } else {
    lastWarning.classList = "none";
  }
});
