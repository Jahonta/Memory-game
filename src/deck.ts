import { Status } from './types/status.js';
import Card from "./card.js";
import Pair from "./pair.js";

export default class Deck {
  private deck: Pair[];
  private deckElement: HTMLUListElement;
  private openedCard?: Card;

  constructor(pairs: number, private clickHandler: (status: Status) => void) {
    this.deck = Array.from({length: pairs},
      (_, index) => new Pair(`./img/deck01/${index + 1}.svg`, this.onPairClick));

    this.deckElement = this.createDeck();

    document.querySelector('.game')?.append(this.deckElement);
  }

  closeCards = (): void => {
    this.deck.forEach((pair) => {
      if (!pair.isSet) {
        pair.closeCards();
      }
    });
  }

  destroy = (): void => {
    document.querySelector('.game')!.innerHTML = '';
  }

  private createDeck = (): HTMLUListElement => {
    const deckElement = document.createElement('ul');
    deckElement.classList.add('card-box');

    this.deck.forEach((pair) => {
      deckElement.append(...pair.getCardElements());
    });

    for (let i = deckElement.children.length; i >= 0; i--) {
      deckElement.append(deckElement.children[Math.random() * i | 0]);
    }

    return deckElement;
  }

  private onPairClick = (status: Status, card: Card): void => {
    if (!this.openedCard) {
      this.openedCard = card;
    } else {
      switch(status) {
        case Status.Hit:
          this.openedCard = undefined;
          break;
        case Status.Miss:
          this.openedCard.close();
          this.openedCard = card;
          break;
      }
    }

    this.clickHandler(status);
  }
}
