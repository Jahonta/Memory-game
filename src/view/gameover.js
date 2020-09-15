import Abstract from "./abstract.js";

const getGameoverTemplate = (score) => {
  return (
    `<section class="modal__game-over">
      <p>Great! You've made it!</p>
      <p>Your new score is <span class="modal__score">${score}</span>!</p>
      <p>And I'm sure you can do better...</p>
    </section>`
  );
}

export default class Gameover extends Abstract {
  constructor(score) {
    super();

    this.score = score;
  }

  getTemplate() {
    return getGameoverTemplate(this.score);
  }
}
