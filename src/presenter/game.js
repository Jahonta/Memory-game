class Game {
  constructor() {
    this.memory = JSON.parse(localStorage.getItem('memory')) || { table: [] };
    this.totalPairs = 0;
    this.backMatter = [
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

    this.gameElement = document.querySelector('.game');
    this.scoreBoxelement = document.querySelector('.score');
    this.modalElement = document.querySelector('.modal');
    this.numElement = modal.querySelector('#num');
    this.playBtnElement = modal.querySelector('.modal__play');
    this.recordsElement = modal.querySelector('.modal__records');
    this.tableScoreElement = modal.querySelector('.modal__table-box');
    this.forgetBtnElement = modal.querySelector('.modal__clear');
  }

  init(pairs) {
    this.refresh();
    this.totalPairs = pairs;
    this.memory.pairs = pairs;

    const newDeck = makeDeck(pairs);
    this.gameElement.append(newDeck);
    this.makeTimer(newDeck, 5);
  }

  refresh() {
    this.setScore(0);
    this.gameElement.innerHTML = '';
    this.firstOpened = null;
    this.score = 0;
    this.openedPairs = 0;
    this.totalPairs = 0;
    this.memory = JSON.parse(localStorage.getItem('memory')) || { table: [] };
  }

  setScore(points) {
    if (points === 0) {
      this.score = 0;
    }
    this.score += points;
    this.scoreBoxelement.textContent = `Your score: ${score}`;
  }

  makeTimer(deck, seconds) {
    this.scoreBoxelement.textContent = `Cards will flip over in ${seconds} seconds`;
    const timer = setTimeout(() => {
      if (seconds === 1) {
        this.scoreBoxelement.textContent = 'Go!';
        deck.querySelectorAll('.card-box__item').forEach((card) => {
          card.classList.remove('flipped');
        });
        clearTimeout(timer);
      } else {
        this.makeTimer(deck, seconds - 1);
      }
    }, 1000);
  }
}
