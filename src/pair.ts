import Card from "./card.js";
import { Status } from './types/status.js';

export default class Pair {
  isSet = false;
  private pair: Card[];

  constructor(skin: string, private clickHandler: (status: Status, card: Card) => void) {
    this.pair = [new Card(skin, this.onCardClick), new Card(skin, this.onCardClick)]
  }

  closeCards(): void {
    this.pair.forEach(card => card.close())
  }

  getCardElements(): HTMLLIElement[] {
    return [this.pair[0].getCardElement(), this.pair[1].getCardElement()];
  }

  private onCardClick = (target: Card): void => {
    if (this.isSet) return;

    if (target.isOpened) {
      target.close();
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
