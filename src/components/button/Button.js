class button {
  constructor() {
    this.el = document.querySelector("#button4");

    if (this.el) {
      this.init();
    }
  }

  init() {
    console.log(this.el.innerText);
  }
}

export default button;
