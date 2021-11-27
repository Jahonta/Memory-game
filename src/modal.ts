import { Record } from "./types/record.js";
import { formatDate } from "./utils/date.js";
import { getElementFromTemplate } from "./utils/get-element-from-template.js";
import { ModalType } from './const.js';

export default class Modal {
  private modal: HTMLDivElement;

  constructor(type: string, pairs: number, records: Record[], lastScore: number) {
    this.modal = getElementFromTemplate('#modal') as HTMLDivElement;
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
    this.modal.querySelector('.modal__play')?.addEventListener('click', () => {
      callback(this);
    });
  }

  setForgetMeHandler = (callback: () => void): void => {
    this.modal.querySelector('.modal__clear')?.addEventListener('click', () => {
      callback();
      this.modal.querySelector('.modal__records')?.remove();
    });
  }

  getPairs = (): number => {
    const pairs = (this.modal.querySelector('#num') as HTMLSelectElement).value;
    return +pairs;
  }

  private renderMessage = (type: string, lastScore: number): void => {
    const message = getElementFromTemplate(`#modal__${type}`);
    if (type === ModalType.GameOver) {
      const scoreElement = message.querySelector('.modal__score') as HTMLSpanElement;
      scoreElement.textContent = lastScore.toString();
    }
    this.modal.append(message);
  }

  private renderForm = (pairs: number): void => {
    const formElement = getElementFromTemplate('#modal__form') as HTMLFormElement;
    const pairsSelectElement = formElement.querySelector('#num')! as HTMLSelectElement;
    pairsSelectElement.value = pairs.toString();
    this.modal.append(formElement);
  }

  private renderRecords = (records: Record[]): void => {
      const recordsElement = getElementFromTemplate('#modal__records') as HTMLDivElement;
      const tbodyElement = recordsElement.querySelector('tbody')!;
      records.forEach(record => {
        const row = document.createElement('tr');
        row.innerHTML = `<td>${record.score}</td><td>${formatDate(record.date)}</td>`;
        tbodyElement.append(row);
      });
      this.modal.append(recordsElement);
    }
}
