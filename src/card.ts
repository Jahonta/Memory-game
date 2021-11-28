export default class Card {
  private cardElement: HTMLLIElement;
  isOpened = false;

  constructor(skin: string, private clickHandler: (card: Card) => void) {
    this.cardElement = document.createElement('li');
    this.cardElement.classList.add('card-box__item');
    this.cardElement.innerHTML = `<div class="card-box__item-front"></div>
          <div class="card-box__item-back"><img src="${skin}" alt="" class="card-box__back-img"></div>`;
    this.cardElement.addEventListener('click', this.onCardClick);
  }

  close = (): void => {
    this.isOpened = false;
    this.cardElement.classList.remove('flipped');
  };

  open = (): void => {
    this.isOpened = true;
    this.cardElement.classList.add('flipped');
  }

  getCardElement = (): HTMLLIElement => {
    return this.cardElement;
  }

  private onCardClick = (): void => {
    this.clickHandler(this);
  }
}
