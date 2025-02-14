import '../styles/main.css';

function updateDateTime() {
  const now = new Date();
  const dayDate = now.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });
  const timeStr = now.toLocaleString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  });
  document.getElementById('time').textContent =
    dayDate.toUpperCase() + ' ' + timeStr;
}

setInterval(updateDateTime, 1000);
updateDateTime();

const pageInput = document.getElementById('page-input');
pageInput.textContent = 'P100';

const currentPage = document.getElementById('current-page');
currentPage.textContent = '100';

let currentInput = '';

document.addEventListener('keydown', (e) => {
  if (e.key >= '0' && e.key <= '9') {
    currentInput += e.key;
    updatePageDisplay();
  }
});

function updatePageDisplay() {
  switch (currentInput.length) {
    case 1:
      pageInput.textContent = 'P' + currentInput + '--';
      break;
    case 2:
      pageInput.textContent = 'P' + currentInput + '-';
      break;
    case 3:
      pageInput.textContent = 'P' + currentInput;
      break;
    default:
      pageInput.textContent = 'P100';
  }

  if (currentInput.length === 3) {
    navigateToPage(currentInput);
  }
}

function navigateToPage(pageNumber) {
  // This function is kept for potential future use
  alert('Page navigation is not implemented in this version.');
  currentInput = '';
  setTimeout(() => {
    pageInput.textContent = 'P100';
  }, 1000);
}
