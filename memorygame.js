const game = document.querySelector('.game');
const scoreBox = document.querySelector('.score');
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
let firstOpened = null;
let score = 0;

function isOpened(card) {
  return card.dataset.opened === 'true';
}

function isFlipped(card) {
  return card.classList.contains('flipped');
}

function flip(card) {
  if (isOpened(card)) return;
  card.classList.toggle('flipped');
}

function setScore(num) {
  score += num;
  scoreBox.textContent = `Your score: ${score}`;
}

function openCard(card) {
  // If the pair is already opened do nothing
  if (isOpened(card)) return;

  // Score the move
  flip(card);
  setScore(-1);

  // If the card was already flipped the move is over
  if (!isFlipped(card)) {
    firstOpened = null;
    return;
  }

  // If there is another flipped card check if it is paired
  if (firstOpened) {
    if (firstOpened !== card && firstOpened.dataset.pair === card.dataset.pair) {
      card.dataset.opened = true;
      firstOpened.dataset.opened = true;
      firstOpened = null;
      setScore(10);
    } else {
      flip(firstOpened);
    }
  }
  firstOpened = card;
}

function makeDeck(pairs) {
  const deck = document.createElement('div');
  for (let i = 0; i < pairs; i += 1) {
    const card = document.createElement('div');
    card.dataset.opened = false;
    card.dataset.pair = i;
    card.classList.add('card-box__item', 'flipped');
    card.innerHTML = `<div class="card-box__item-front"></div>
          <div class="card-box__item-back"><img src="${
  backMatter[i]
}" alt="" class="card-box__back-img"></div>`;
    const pairedCard = card.cloneNode(card);
    deck.appendChild(card);
    deck.appendChild(pairedCard);
  }
  [...deck.children]
    .sort(() => Math.random() - 0.5)
    .map((card) => {
      card.addEventListener('click', (e) => {
        const clickedCard = e.target.closest('.card-box__item');
        openCard(clickedCard);
      });
      deck.appendChild(card);
    });
  deck.classList.add('card-box');
  return deck;
}

function newGame() {
  const newDeck = makeDeck(12);
  game.append(newDeck);
  setTimeout(() => {
    newDeck.querySelectorAll('.card-box__item').forEach((card) => {
      card.classList.remove('flipped');
    });
  }, 5000);
}

newGame();
