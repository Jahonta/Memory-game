import Record from "./interface/record.js";
import {Modal, ModalType} from "./modal.js";

const PAIRS_DEFAULT = 4;

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

const modal = new Modal(ModalType.GameOver, PAIRS_DEFAULT, mockRecords, 15);
modal.render();
