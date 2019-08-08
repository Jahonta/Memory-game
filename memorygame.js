/* eslint-disable no-restricted-syntax */

/* Get the DOK and cards' backMatter */
const game = document.querySelector('.game');
const scoreBox = document.querySelector('.score');
const modal = document.querySelector('.modal');
const num = document.querySelector('#num');
const playBtn = document.querySelector('.modal__play');
const records = document.querySelector('.modal__reconds');
const tableScore = document.querySelector('.modal__table-box');
const forgetBtn = document.querySelector('.modal__clear');
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

/* On the page load set the variables */
let firstOpened = null;
let score = 0;
let openedPairs = 0;
let totalPairs = 0;
let memory = JSON.parse(localStorage.getItem('memory')) || { table: [] };

/* Show scores only if there are any */
if (memory.table.length > 0) {
  drawTable();
  records.style.display = 'block';
  num.value = memory.pairs;
}

/* Game functions */
function isOpened(card) {
  return card.dataset.opened === 'true';
}

function isFlipped(card) {
  return card.classList.contains('flipped');
}

function isOver() {
  return totalPairs <= openedPairs;
}

function flip(card) {
  if (isOpened(card)) return;
  card.classList.toggle('flipped');
}

function setScore(points) {
  if (points === 0) {
    score = 0;
  }
  score += points;
  scoreBox.textContent = `Your score: ${score}`;
}

function addPad(number) {
  return number >= 10 ? number : `0${number}`;
}

function drawTable() {
  memory.table.sort((a, b) => b.score - a.score);
  if (memory.table.length > 10) {
    memory.table.length = 10;
  }
  let table = '<table class="modal__table-score"><thead><tr><th>Score</th><th>Date</th></tr></thead><tbody>';
  for (const { score, date } of memory.table) {
    const liveDate = new Date(date);
    const day = addPad(liveDate.getDate());
    const month = addPad(liveDate.getMonth() + 1);
    const year = liveDate.getFullYear();
    const hour = addPad(liveDate.getHours());
    const minutes = addPad(liveDate.getMinutes());
    const formattedDate = `${day}.${month}.${year} at ${hour}:${minutes}`;
    table += `<tr><td>${score}</td><td>${formattedDate}</td></tr>`;
  }
  table += '</tbody></table>';
  tableScore.innerHTML = table;
  records.style.display = 'block';
}

function refresh() {
  setScore(0);
  game.innerHTML = '';
  firstOpened = null;
  score = 0;
  openedPairs = 0;
  totalPairs = 0;
  memory = JSON.parse(localStorage.getItem('memory')) || { table: [] };
}

function gameOver() {
  // Save new score
  memory.table.push({
    score,
    date: Date.now(),
  });
  localStorage.setItem('memory', JSON.stringify(memory));

  // Update modal
  drawTable();
  const welcome = modal.querySelector('.modal__welcome');
  const congrats = modal.querySelector('.modal__game-over');
  congrats.querySelector('.modal__score').textContent = score;
  welcome.style.display = 'none';
  congrats.style.display = 'block';
  modal.style.display = 'block';
}

function openCard(card) {
  // If the pair is already opened do nothing otherwise flip it
  if (isOpened(card)) return;
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
      openedPairs += 1;
      setScore(10);
      if (isOver()) {
        gameOver();
      }
    } else {
      flip(firstOpened);
    }
  }
  firstOpened = card;
}

function makeDeck(pairs) {
  const deck = document.createElement('div');
  deck.classList.add('card-box');

  // Create paired cards
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

  // Shuffle the deck
  [...deck.children]
    .sort(() => Math.random() - 0.5)
    .map((card) => {
      card.addEventListener('click', (e) => {
        const clickedCard = e.target.closest('.card-box__item');
        openCard(clickedCard);
      });
      deck.appendChild(card);
    });

  return deck;
}

function newGame(pairs) {
  refresh();
  totalPairs = pairs;
  memory.pairs = pairs;
  const newDeck = makeDeck(pairs);
  game.append(newDeck);
  setTimeout(() => {
    newDeck.querySelectorAll('.card-box__item').forEach((card) => {
      card.classList.remove('flipped');
    });
  }, 5000);
}

playBtn.addEventListener('click', (e) => {
  e.preventDefault();
  modal.style.display = 'none';
  const pairs = parseInt(num.value, 10);
  memory.pairs = pairs;
  newGame(pairs);
});

forgetBtn.addEventListener('click', () => {
  memory = { table: [] };
  localStorage.removeItem('memory');
  records.style.display = 'none';
  refresh();
});
