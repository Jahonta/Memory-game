import Modal from './view/modal.js'

const mainElement = document.querySelector('.game');

const records = JSON.parse(localStorage.getItem('memory')) || { table: [] };
const ModalView = new Modal('gameover', records, 28);
ModalView.render(mainElement);
