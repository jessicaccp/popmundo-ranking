import * as listeners from "./listeners.js";

export class Band {
  constructor(node, date) {
    this.last = {};
    this.current = {};
    this.relative = {};

    if (date === "last") {
      this.last.name = node.textContent;
      this.id = this?.id ? this.id : node.href.split("/")[6];
      this.last.global = Number(node.previousSibling.textContent.split("#")[1]);
      this.last.local = Number(
        node.previousSibling.previousSibling.textContent
      );
    }

    if (date === "current") {
      this.current.name = node.cells[2].textContent;
      this.id = this?.id
        ? this.id
        : node.cells[2].firstChild.href.split("/")[6];
      this.current.global = Number(node.cells[1].textContent);
      this.current.local = Number(node.cells[0].textContent);
    }
  }

  setLast(node) {
    this.last.name = node.textContent;
    this.last.id = node.href.split("/")[6];
    this.last.global = Number(node.previousSibling.textContent.split("#")[1]);
    this.last.local = Number(node.previousSibling.previousSibling.textContent);
  }

  setCurrent(node) {
    this.current.name = node.cells[2].textContent;
    this.current.id = node.cells[2].firstChild.href.split("/")[6];
    this.current.global = Number(node.cells[1].textContent);
    this.current.local = Number(node.cells[0].textContent);
  }

  setRelative() {
    if (
      this.last?.global &&
      this.current?.global &&
      this.last?.local &&
      this.current?.local
    ) {
      this.relative.global = this.last.global - this.current.global;
      this.relative.local = this.last.local - this.current.local;

      if (this.relative.global > 0) {
        this.relative.global = `+${this.relative.global}`;
      } else if (this.relative.global === 0) {
        this.relative.global = "=";
      }

      if (this.relative.local > 0) {
        this.relative.local = `+${this.relative.local}`;
      } else if (this.relative.local === 0) {
        this.relative.local = "=";
      }
    }
  }

  getNode() {
    console.dir(this);
  }
}

export const generateRanking = (last, current) => {
  if (last.innerHTML === "" || current.innerHTML === "") {
    return "Please paste both last and current ranking";
  }
  if (last.innerHTML === current.innerHTML) {
    return "No changes in ranking";
  }

  for (let node of last.childNodes)
    if (node.nodeName === "A") {
      const band = new Band(node, "last");
      //   band.getNode();
    }

  for (let node of current.childNodes) continue;
};
