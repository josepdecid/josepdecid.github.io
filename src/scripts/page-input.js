import { navigateToPage } from './page-navigation.js';

let currentInput = '';
const pageInputElement = document.getElementById('page-input');

export function listenPageInput() {
  document.addEventListener('keydown', (e) => {
    if (e.key >= '0' && e.key <= '9') {
      currentInput += e.key;
      _updatePageDisplay();
    }
  });
}

function _getPageInputText() {
  switch (currentInput.length) {
    case 1:
      return 'P' + currentInput + '--';
    case 2:
      return 'P' + currentInput + '-';
    case 3:
      return 'P' + currentInput;
    default:
      return 'P100';
  }
}

function _updatePageDisplay() {
  pageInputElement.textContent = _getPageInputText();
  if (currentInput.length === 3) {
    navigateToPage(currentInput);
    currentInput = '';
  }
}
