import { Status } from './types/status.js';
import { PAIRS_DEFAULT } from './const.js';

import Deck from './deck.js';
export default class Game {
  private score = 0;
  private openedPairs = 0;
  private totalPairs = PAIRS_DEFAULT;
  private deck!: Deck;

  constructor(pairs: number, private gameOverHandler: (score: number) => void) {
    this.totalPairs = pairs;
    this.deck = new Deck(this.totalPairs, this.deckClickHandler);
    this.deck.closeCards();
  }

  private deckClickHandler = (status: Status) => {
    switch(status) {
      case Status.Hit:
        this.score += 10;
        this.openedPairs++;
        break;
      case Status.Miss:
        this.score -= 1;
    }

    if (this.totalPairs === this.openedPairs) {
      // this.deck.destroy();
      this.gameOverHandler(this.score);
    }
  }
}
