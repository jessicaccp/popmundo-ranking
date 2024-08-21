const last = document.getElementById("last-paste");
const lastErase = document.getElementById("last-erase");

const current = document.getElementById("current-paste");
const currentErase = document.getElementById("current-erase");

const generated = document.getElementById("generated-paste");
const generatedOk = document.getElementById("new-generate");
const generatedCopy = document.getElementById("new-copy");

const eraseText = (event, element) => {
  event.preventDefault();
  element.innerHTML = "";
};

const pasteText = (event) => {
  event.preventDefault();
  event.target.innerHTML = event.clipboardData.getData("text/html");
};

const copyText = (event, element) => {
  event.preventDefault();
  event.clipboardData.setData("text/html", element.innerHTML);
};

const generateText = (event, element) => {
  event.preventDefault();
  const text = current.innerHTML;
  generated.innerHTML = text;
};

lastErase.addEventListener("click", (event) => eraseText(event, last));
currentErase.addEventListener("click", (event) => eraseText(event, current));

last.addEventListener("paste", pasteText);
current.addEventListener("paste", pasteText);

generatedCopy.addEventListener("click", (event) => copyText(event, generated));

generatedOk.addEventListener("click", (event) =>
  generateText(event, generated)
);
