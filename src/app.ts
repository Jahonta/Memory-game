import { ModalType, PAIRS_DEFAULT } from './util.js';
import Modal from "./modal.js";
import Game from './game.js';
import Records from "./records.js";

const recordsDB = new Records();

const showModal = (type: ModalType, pairs: number, lastScore: number = 0): void => {
  const records = recordsDB.get();
  const modal = new Modal(type, pairs, records, lastScore);
  modal.render();
  modal.setPlayClickHandler(startGame);
  if (records.length > 0) {
    modal.setForgetMeHandler(recordsDB.clear);
  }
}

const startGame = (modal: Modal): void => {
  const pairs = modal.getPairs();
  modal.destroy();
  const game = new Game(pairs);
  game.setGameOverHandler(endGame);
}

const endGame = (score: number, pairs: number, game: Game): void => {
  game.destroy();
  recordsDB.add(score);
  showModal(ModalType.GameOver, pairs, score);
}

showModal(ModalType.Welcome, PAIRS_DEFAULT);
