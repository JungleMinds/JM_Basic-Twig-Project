// @flow
class button {
  el: HTMLElement | null

  constructor() {
    this.el = document.querySelector('#button4')

    if (this.el instanceof HTMLElement) {
      // TODO Example, remove in production
      console.log(this.el.textContent.trim())
    }
  }

  doSomething() {
    // TODO Example, remove in production
    console.log('Something!')
  }
}

export default button
