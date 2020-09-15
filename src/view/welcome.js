import Abstract from "./abstract.js";

const getWelcomeTemplate = () => {
  return (
    `<section class="modal__welcome">
      <h2 class="modal__title">The Memory Game</h1>
      <p>Welcome to the Memory Game!</p>
      <p>The rules are simple: cards are shown for 5 seconds, you have to remember them and, when they are turned away, consequently click on the paired ones.<br>Each pair will give you <b>10</b> points and every wrong move will cost you 1 point.</p>
    </section>`
  );
}

export default class Welcome extends Abstract {
  getTemplate() {
    return getWelcomeTemplate();
  }
}
