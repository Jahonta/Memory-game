import { Mode } from '../const.js';

export type State = {
  score: number;
  openedPairs: number;
  isOpened: boolean;
  openedCard: Object | null;
  mode: Mode;
}
