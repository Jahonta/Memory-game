const backMatter = [
  './img/deck01/1.svg',
  './img/deck01/2.svg',
  './img/deck01/3.svg',
  './img/deck01/4.svg',
  './img/deck01/5.svg',
  './img/deck01/6.svg',
  './img/deck01/7.svg',
  './img/deck01/8.svg',
  './img/deck01/9.svg',
  './img/deck01/10.svg',
  './img/deck01/11.svg',
  './img/deck01/12.svg',
];

export default class Deck {
  constructor(pairs: number, clickHandler: (evt: Event) => void) {
    const deck = this.createDeck(pairs);
    deck.addEventListener('click', clickHandler);

    document.querySelector('.game')?.append(deck);
  }

  private createDeck(pairs: number): HTMLUListElement {
    const deck = document.createElement('ul');
    deck.classList.add('card-box');

    for (let i = 0; i < pairs; i += 1) {
      deck.append(...this.createCardPair(backMatter[i]))
    }

    return deck;
  }

  private createCardPair(skin: string): HTMLLIElement[] {
    const card = document.createElement('li');

    return [card, card];
  }
}
