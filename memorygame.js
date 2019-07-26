const game = document.querySelector('.game');
const scoreBox = document.querySelector('.score');
const backMatter = 'QWERTASDFGZXCVBYUIOPHJKLNM';
let firstOpened = null;
let score = 0;

function flip(card) {
  if (card.dataset.opened === 'true') return;
  card.classList.toggle('flipped');
}

function openCard(card) {
  if (card.dataset.opened === 'true') return;
  flip(card);
  score -= 1;
  if (firstOpened) {
    if (firstOpened.dataset.pair === card.dataset.pair) {
      card.dataset.opened = true;
      firstOpened.dataset.opened = true;
      firstOpened = null;
      score += 10;
    } else {
      flip(firstOpened);
    }
  }
  firstOpened = card;
  scoreBox.textContent = `Your score: ${score}`;
}

function makeDeck(pairs) {
  const deck = document.createElement('div');
  for (let i = 0; i < pairs; i += 1) {
    const card = document.createElement('div');
    card.dataset.opened = false;
    card.dataset.pair = i;
    card.classList.add('card-box__item', 'flipped');
    card.innerHTML = `<div class="card-box__item-front">Front</div>
          <div class="card-box__item-back">${backMatter[i]}</div>`;
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
  const newDeck = makeDeck(8);
  game.append(newDeck);
  setTimeout(() => {
    newDeck.querySelectorAll('.card-box__item').forEach((card) => {
      card.classList.remove('flipped');
    });
  }, 5000);
}

newGame();
