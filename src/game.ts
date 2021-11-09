import { Config } from './types/config.js';
import { State } from './types/state.js';
import { Mode, PAIRS_DEFAULT } from './const.js';

import Deck from './deck.js';
export default class Game {
  private config: Config;
  private _state: State;
  private initialState: State = {
    openedPairs: 0,
    isOpened: false,
    openedCard: null,
    mode: Mode.Waiting
  };

  get state() {
    return this._state;
  }

  set state(update: Partial<State>) {
    this._state = {...this._state, ...update}
  }

  constructor() {
    this.config = {
      totalPairs: PAIRS_DEFAULT
    };
    this._state = this.initialState;
  }

  init(pairs: number) {
    this.config = {
      totalPairs: pairs
    };
    this.state = this.initialState;
  }

  start() {
    const deck = new Deck(this.config.totalPairs, this.deckClickHandler);
    this.state = {mode: Mode.On};
  }

  finish() {
    this.state = {mode: Mode.Over};
  }

  private deckClickHandler(evt: Event) {

  }

  private isOver() {
    return this.config.totalPairs === this.state.openedPairs;
  }
}
