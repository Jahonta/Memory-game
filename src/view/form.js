import {OPTIONS} from "../common.js";
import Abstract from "./abstract.js";

const getOptionTemplate = (number, isSelected) => {
  const setSelected = isSelected ? ' selected' : '';

  return (
    `<option value="${number}"${setSelected}>${number}</option>`
  );
};

const getFormTemplate = (prevOption = 4) => {
  const optionsList = OPTIONS.map((option) => {
    return getOptionTemplate(option, option === prevOption);
  }).join('');

  return (
    `<form class="modal__form">
      <label for="num">Now choose how many pairs there should be:</label>
      <select name="num" id="num">${optionsList}</select>
      <button class="btn modal__play" type="submit">And let's GO!</button>
    </form>`
  );
}

export default class Form extends Abstract {
  constructor(prevOption) {
    super();

    this.prevOption = prevOption;
  }

  getTemplate() {
    return getFormTemplate(this.prevOption);
  }
}
