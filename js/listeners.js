import { generateRanking } from "./generator.js";

// past ranking post elements
const past = document.getElementById("past-paste");
const pastErase = document.getElementById("past-erase");
const pastWarning = document.getElementById("past-warning");

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
  if (element === past) {
    pastWarning.classList = "hidden";
  }
};

// paste text to element (past or current)
const pasteText = (event) => {
  event.preventDefault();
  event.target.innerHTML = event.clipboardData.getData("text/html");
  const nodes = event.target.childNodes;

  if (event.target === past) {
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
        pastWarning.classList = "block";
      } else {
        pastWarning.classList = "hidden";
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
  generated.innerHTML = ranking.generateRanking(past, current);
};

// erase buttons
pastErase.addEventListener("click", (event) => eraseText(event, past));
currentErase.addEventListener("click", (event) => eraseText(event, current));

// paste divs
past.addEventListener("paste", pasteText);
current.addEventListener("paste", pasteText);

// copy button
generatedCopy.addEventListener("click", (event) => copyText(event, generated));

// generate button
generatedOk.addEventListener("click", generateRanking);

// warning
past.addEventListener("change", (event) => {
  if (past.childNodes[3].nodeName !== "BR") {
    pastWarning.classList = "block";
  } else {
    pastWarning.classList = "none";
  }
});
