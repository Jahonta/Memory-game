import { Status } from './const.js';
import Deck from './deck.js';
export default class Game {
  private score = 0;
  private openedPairs = 0;
  private totalPairs: number;
  private deck!: Deck;
  private gameElement: HTMLDivElement;
  private scoreElement: HTMLDivElement;
  private gameOverHandler!: (score: number, pairs: number, game: Game) => void;

  constructor(pairs: number) {
    this.totalPairs = pairs;
    this.gameElement = document.querySelector('.game') as HTMLDivElement;
    this.scoreElement = document.querySelector('.score') as HTMLDivElement;
    this.scoreElement.textContent = 'Your score: 0';
    this.deck = new Deck(this.totalPairs, this.deckClickHandler);
    this.gameElement.append(this.deck.getElement());
  }

  setGameOverHandler = (callback: (score: number, pairs: number, game: Game) => void): void => {
    this.gameOverHandler = callback;
  }

  destroy = (): void => {
    this.deck.destroy();
    this.scoreElement.textContent = '';
  }

  private deckClickHandler = (status: Status): void => {
    switch(status) {
      case Status.Hit:
        this.score += 10;
        this.openedPairs++;
        break;
      case Status.Miss:
        this.score = this.score === 0 ? 0 : this.score - 1;
    }
    this.scoreElement.textContent = `Your score: ${this.score.toString()}`;

    if (this.totalPairs === this.openedPairs) {
      this.gameOverHandler(this.score, this.totalPairs, this);
    }
  }
}
