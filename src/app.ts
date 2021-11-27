import { ModalType, PAIRS_DEFAULT } from './const.js';
import Modal from "./modal.js";
import Game from './game.js';
import Records from "./records.js";

const records = new Records();

const showModal = (type: ModalType, pairs: number, lastScore: number = 0): void => {
  const modal = new Modal(type, pairs, records.getRecords(), lastScore);
  modal.render();
  modal.setPlayClickHandler(startGame);
  modal.setForgetMeHandler(records.clearRecords);
}

const startGame = (modal: Modal): void => {
  const pairs = modal.getPairs();
  modal.destroy();
  const game = new Game(pairs);
  game.setGameOverHandler(endGame);
}

const endGame = (score: number, pairs: number, game: Game): void => {
  game.destroy();
  records.addRecord(score);
  showModal(ModalType.GameOver, pairs, score);
}

showModal(ModalType.Welcome, PAIRS_DEFAULT);
