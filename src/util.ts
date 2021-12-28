export enum Mode {Waiting, On, Over};

export enum Status {Hit, Miss, Close};

export enum ModalType {Welcome = 'welcome', GameOver = 'game-over'};

export type Record = {
  score: number;
  date: Date;
};

export const PAIRS_DEFAULT = 4;

export const formatDate = (date: string | Date): string => new Intl.DateTimeFormat('ru',
  {
    'dateStyle':'long',
    'timeStyle':'short'
  })
  .format(new Date(date));

export const getElementFromTemplate = (selector: string): HTMLElement => {
  const template = document.querySelector(selector);
  if (template instanceof HTMLTemplateElement) {
    const element = template.content.firstElementChild;
    if (element) {
      return element.cloneNode(true) as HTMLElement;
    }
    throw new Error('Can\'t get an element from the template');
  }
  throw new Error(`${selector} is not a <template> element`);
}
