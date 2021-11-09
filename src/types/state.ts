import { Mode } from '../const.js';

export type State = {
  openedPairs: number;
  isOpened: boolean;
  openedCard: Object | null;
  mode: Mode;
}
