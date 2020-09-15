import {render, createElement, OPTIONS} from "../common.js";

const getModalTemplate = () => {
  return (
    `<section class="modal"></section>`
  );
}

const getWelcomeTemplate = () => {
  return (
    `<section class="modal__welcome">
      <h2 class="modal__title">The Memory Game</h1>
      <p>Welcome to the Memory Game!</p>
      <p>The rules are simple: cards are shown for 5 seconds, you have to remember them and, when they are turned away, consequently click on the paired ones.<br>Each pair will give you <b>10</b> points and every wrong move will cost you 1 point.</p>
    </section>`
  );
}

const getGameoverTemplate = (score) => {
  return (
    `<section class="modal__game-over">
      <p>Great! You've made it!</p>
      <p>Your new score is <span class="modal__score">${score}</span>!</p>
      <p>And I'm sure you can do better...</p>
    </section>`
  );
}

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

const getRecordTemplate = (score, date) => {
  const liveDate = new Date(date);
  const day = addPad(liveDate.getDate());
  const month = addPad(liveDate.getMonth() + 1);
  const year = liveDate.getFullYear();
  const hour = addPad(liveDate.getHours());
  const minutes = addPad(liveDate.getMinutes());
  const formattedDate = `${day}.${month}.${year} at ${hour}:${minutes}`;

  return (
    `<tr><td>${score}</td><td>${formattedDate}</td></tr>`
  );
};

const getRecordsTemplate = (records = []) => {
  const recordsList = records.map((record) => {
    getRecordTemplate(record);
  });

  return (
    `<section class="modal__records">
      <h2 class="modal__title">The Game remembers!</h2>
      <div class="modal__table-box">
        <table class="modal__table-score">
          <thead>
            <tr>
              <th>Score</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>${recordsList}</tbody>
        </table>
      </div>
      <button class="btn modal__clear">Forget me!</button>
    </section>`
  );
}

export default class Modal {
  constructor(parent) {
    this.parent = parent;

    this.modalElement = null;
    this.welcomeElement = null;
    this.formElement = null;
    this.gameoverElement = null;
    this.recordsElement = null;
  }

  init(mode, records, score = 0, prevOption) {
    this.modalElement = createElement(getModalTemplate());
    this.welcomeElement = createElement(getWelcomeTemplate());
    this.formElement = createElement(getFormTemplate(prevOption));
    this.gameoverElement = createElement(getGameoverTemplate(score));

    if (records.length > 0) {
      this.recordsElement = createElement(getRecordsTemplate(records));
    }

    render(this.parent, this.modalElement);
    switch (mode) {
      case 'welcome':
        render(this.modalElement, this.welcomeElement);
        render(this.modalElement, this.formElement);
        render(this.modalElement, this.recordsElement);
        break;
      case 'gameover':
        render(this.modalElement, this.gameoverElement);
        render(this.modalElement, this.formElement);
        render(this.modalElement, this.recordsElement);
        break;
    }
  }

  setMode() {}


}
