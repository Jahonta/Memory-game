import { ModalType, Record, formatDate, getElementFromTemplate } from './util.js';
export default class Modal {
  private modal: HTMLElement;

  constructor(type: string, pairs: number, records: Record[], lastScore: number) {
    this.modal = getElementFromTemplate('#modal');
    this.renderMessage(type, lastScore);
    this.renderForm(pairs);
    if (records.length > 0) {
      this.renderRecords(records);
    }
  }

  render = (): void => {
    document.body.append(this.modal);
  }

  destroy = (): void => {
    this.modal.remove();
  }

  setPlayClickHandler = (callback: (modal: Modal) => void): void => {
    const playButton = this.modal.querySelector('.modal__play');
    if (!playButton) {
      throw new Error('Can\'t find modal__play element');
    }

    playButton.addEventListener('click', () => {
      callback(this);
    });
  }

  setForgetMeHandler = (callback: () => void): void => {
    const clearButton = this.modal.querySelector('.modal__clear');
    if (!clearButton) {
      throw new Error('Can\'t find modal__clear element');
    }

    clearButton.addEventListener('click', () => {
      callback();
      const recordsElement = this.modal.querySelector('.modal__records');
      if (recordsElement) {
        recordsElement.remove();
      }
    });
  }

  getPairs = (): number => {
    const numSelector = this.modal.querySelector('#num');
    if (!(numSelector instanceof HTMLSelectElement)) {
      throw new Error('Can\'t find #num element or it\'s not a HTMLSelectElement');
    }

    return +numSelector.value;
  }

  private setPairs = (pairs: number): void => {
    const numSelector = this.modal.querySelector('#num');
    if (!(numSelector instanceof HTMLSelectElement)) {
      throw new Error('Can\'t find #num element or it\'s not a HTMLSelectElement');
    }

    numSelector.value = pairs.toString();
  }

  private showScore = (lastScore: number): void => {
    const scoreElement = this.modal.querySelector('.modal__score');
    if (!scoreElement) {
      throw new Error('Can\'t find modal__score element');
    }

    scoreElement.textContent = lastScore.toString();
 }

  private renderMessage = (type: string, lastScore: number): void => {
    const message = getElementFromTemplate(`#modal__${type}`);
    this.modal.append(message);

    if (type === ModalType.GameOver) {
      this.showScore(lastScore);
    }
  }

  private renderForm = (pairs: number): void => {
    const form = getElementFromTemplate('#modal__form');
    this.modal.append(form);
    this.setPairs(pairs);
  }

  private renderRecords = (records: Record[]): void => {
    const recordsElement = getElementFromTemplate('#modal__records');
    const tableElement = recordsElement.querySelector('.modal__table-score');
    if (!(tableElement instanceof HTMLTableElement)) {
      throw new Error('Can\'t find modal__table-score element or it\'s not a HTMLTableElement');
    }

    records.forEach(record => {
      const row = tableElement.insertRow(-1);
      row.insertCell(-1).textContent = `${record.score}`;
      row.insertCell(-1).textContent = formatDate(record.date);
    });

    this.modal.append(recordsElement);
  }
}
