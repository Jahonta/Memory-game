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

const showModal = (type: ModalType,
  pairs: number,
  records: Record[],
  lastScore: number = 0) => {
  const modal = new Modal(type, pairs, records, lastScore);
  modal.render();
  modal.setPlayClickHandler(startGame);
}

const startGame = (modal: Modal) => {
  const pairs = modal.getPairs();
  modal.destroy();
  const game = new Game(pairs);
  game.setGameOverHandler(endGame);
}

const endGame = (score: number, pairs: number, game: Game) => {
  game.destroy();
  mockRecords.push({
          score,
          date: new Date()
        });
  showModal(ModalType.GameOver, pairs, mockRecords, score);
}

showModal(ModalType.Welcome, PAIRS_DEFAULT, mockRecords);
