import { Record } from "./types/record.js";
import { ModalType, PAIRS_DEFAULT } from './const.js';
import Modal from "./modal.js";
import Game from './game.js';

const mockRecords: Record[] = [
  {
    score: 10,
    date: new Date()
  },
  {
    score: 20,
    date: new Date('1970-01-01')
  },
  {
    score: 30,
    date: new Date('2022-04-15')
  }
];

const modal = new Modal(ModalType.Welcome, PAIRS_DEFAULT, mockRecords);

modal.render();
modal.setPlayClickHandler((pairs: number) => {
  modal.destroy();
  new Game(pairs, (score: number): void => {
    mockRecords.push({
      score,
      date: new Date()
    });
    new Modal(ModalType.GameOver, pairs, mockRecords).render();
  });
});
