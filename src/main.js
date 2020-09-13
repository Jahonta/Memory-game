import Modal from './view/modal.js'

const mainElement = document.querySelector('.game');
const ModalView = new Modal(mainElement);
ModalView.init('gameover', 28);
