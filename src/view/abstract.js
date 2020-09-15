import {createElement} from "../common.js";

export default class Abstract {
  constructor() {
    this.element = null;
  }

  getTemplate() {
    throw new Error(`Abstract method not implemented: getTemplate`);
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate())
    }

    return this.element;
  }

  render(parent) {
    if (!parent) {
      return;
    }
    parent.append(this.element);
  }

  remove() {
    this.element.parentNode.removeChild(this.element);
    this._element = null;
  }

}
