enum Mode {Waiting, On, Over}

type State = {
  openedPairs: number;
  isOpened: boolean;
  openedCard: Object | null;
  mode: Mode;
}

type Config = {
  totalPairs: number;
}
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

  constructor(pairs: number) {
    this.config = {
      totalPairs: pairs
    };
    this._state = this.initialState;
  }

  init() {
    this.state = this.initialState;
  }

  start() {}

  finish() {}

  private isOver() {
    return this.config.totalPairs === this.state.openedPairs;
  }
}
