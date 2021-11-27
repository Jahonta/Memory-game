import { Status } from './types/status.js';
import Deck from './deck.js';
export default class Game {
  private score = 0;
  private openedPairs = 0;
  private totalPairs: number;
  private deck!: Deck;
  private gameOverHandler!: (score: number, pairs: number, game: Game) => void;

  constructor(pairs: number) {
    this.totalPairs = pairs;
    this.deck = new Deck(this.totalPairs, this.deckClickHandler);
    this.deck.closeCards();
  }

  setGameOverHandler = (callback: (score: number, pairs: number, game: Game) => void): void => {
    this.gameOverHandler = callback;
  }

  destroy = (): void => {
    this.deck.destroy();
  }

  private deckClickHandler = (status: Status): void => {
    switch(status) {
      case Status.Hit:
        this.score += 10;
        this.openedPairs++;
        break;
      case Status.Miss:
        this.score -= 1;
    }

    if (this.totalPairs === this.openedPairs) {
      this.gameOverHandler(this.score, this.totalPairs, this);
    }
  }
}
