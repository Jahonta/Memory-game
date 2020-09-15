import Abstract from "./abstract.js";
import Form from "./form.js";
import Records from "./records.js";
import Gameover from "./records.js";
import Welcome from "./records.js";

const getModalTemplate = () => {
  return (
    `<section class="modal"></section>`
  );
}

export default class Modal extends Abstract {
  constructor(mode, records, prevOption, score = 0) {
    super();

    this.welcomeElement = new Welcome();
    this.formElement = new Form(prevOption);
    this.gameoverElement = new Gameover(score);

    if (records.length > 0) {
      this.recordsElement = new Records(records);
    }

    switch (mode) {
      case 'welcome':
        this.welcomeElement.render(this.getElement());
        this.formElement.render(this.getElement());
        this.recordsElement.render(this.getElement());
        break;
      case 'gameover':
        this.gameoverElement.render(this.getElement());
        this.formElement.render(this.getElement());
        // this.recordsElement.render(this.getElement());
        break;
    }
  }

  getTemplate() {
    return getModalTemplate();
  }
}
