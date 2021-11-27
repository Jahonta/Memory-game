export enum Mode {Waiting, On, Over};

export enum Status {Hit, Miss, Close};

export enum ModalType {Welcome = 'welcome', GameOver = 'game-over'};

export type Record = {
  score: number;
  date: Date;
};

export const PAIRS_DEFAULT = 1;
