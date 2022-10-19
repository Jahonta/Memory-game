import Card from "./card.js";
import { Status } from './util.js';

export default class Pair {
  isSet = false;
  private pair: Card[];

  constructor(skin: string, private clickHandler: (status: Status, card: Card) => void) {
    this.pair = [new Card(skin, this.onCardClick), new Card(skin, this.onCardClick)]
  }

  getCardElements = (): HTMLLIElement[] => {
    return [this.pair[0].getCardElement(), this.pair[1].getCardElement()];
  }

  private onCardClick = (target: Card): void => {
    if (this.isSet) return;

    if (target.isOpened) {
      target.close();
      this.clickHandler(Status.Close, target);
      return;
    }

    target.open();

    if (this.pair.every(card => card.isOpened)) {
      this.isSet = true;
      this.clickHandler(Status.Hit, target);
    } else {
      this.clickHandler(Status.Miss, target);
    }
  }
}
