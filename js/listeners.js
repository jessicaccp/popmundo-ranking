import Ranking from "./Ranking.js";

const ranking = new Ranking();
const alert = document.getElementById("alert");

// past ranking post elements
const past = document.getElementById("past-paste");
const pastOk = document.getElementById("past-ok");
const pastErase = document.getElementById("past-erase");

// current ranking post elements
const current = document.getElementById("current-paste");
const currentOk = document.getElementById("current-ok");
const currentErase = document.getElementById("current-erase");

// generated ranking post elements
const generated = document.getElementById("generated-paste");
const generatedOk = document.getElementById("generated-ok");
const generatedCopy = document.getElementById("generated-copy");

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

async function clickPaste(event) {
  event.preventDefault();

  try {
    const clipboardContents = await navigator.clipboard.read();
    for (const item of clipboardContents) {
      if (!item.types.includes("text/html")) {
        alert.innerText = "Tipo de conteúdo inválido.";
        setTimeout(() => {
          alert.style.opacity = 0;
        }, 1000);
        setTimeout(() => {
          alert.innerText = "";
          alert.style.opacity = 1;
        }, 1200);
        return;
      }
      const htmlBlob = await item.getType("text/html");
      const html = await htmlBlob.text();
      if (event.target === pastOk) past.innerHTML = html;
      if (event.target === currentOk) current.innerHTML = html;
      return;
    }
  } catch (error) {
    alert.innerText = "Erro ao colar conteúdo.";
    setTimeout(() => {
      alert.style.opacity = 0;
    }, 1000);
    setTimeout(() => {
      alert.innerText = "";
      alert.style.opacity = 1;
    }, 1200);
    return;
  }
}
pastOk.addEventListener("click", clickPaste);
currentOk.addEventListener("click", clickPaste);

// copy text from element (generated)
const copyText = (event) => {
  event.preventDefault();
  navigator.clipboard.writeText(generated.innerHTML);
  if (generated.innerText.length > 0) {
    alert.innerText = "Copiado!";
    setTimeout(() => {
      alert.style.opacity = 0;
    }, 1000);
    setTimeout(() => {
      alert.innerText = "";
      alert.style.opacity = 1;
    }, 1200);
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
const generateHandler = (event) => {
  if (past.innerText.length === 0 || current.innerText.length === 0) {
    alert.innerText = "Por favor, preencha os campos com ambos os rankings.";
    setTimeout(() => {
      alert.style.opacity = 0;
    }, 3000);
    setTimeout(() => {
      alert.innerText = "";
      alert.style.opacity = 1;
    }, 3200);
    return;
  }

  ranking.update();
};
generatedOk.addEventListener("click", generateHandler);
