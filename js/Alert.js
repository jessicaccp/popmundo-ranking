export default class Alert {
  constructor() {
    this.message = "Ocorreu um erro.";
    this.timeout = 3000;
    this.delay = 3200;
    this.element = document.getElementById("alert");
  }

  show(message = this.message, timeout = this.timeout, delay = this.delay) {
    this.element.innerText = message;
    setTimeout(() => {
      this.element.style.opacity = 0;
    }, timeout);
    setTimeout(() => {
      this.element.innerText = "";
      this.element.style.opacity = 1;
    }, delay);
  }
}
