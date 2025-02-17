import '../styles/main.css';


const pageInput = document.getElementById('page-input');
const currentPage = document.getElementById('current-page');
const pageContent = document.getElementById('page-content');

const pageNumber = getCurrentPageNumber();
currentPage.textContent = pageNumber;
pageInput.textContent = `P${pageNumber}`;
pageContent.innerHTML = await getCurrentPage(pageNumber);

function getCurrentPageNumber() {
  const searchParams = new URLSearchParams(window.location.search);
  const pageNumber = searchParams.get('p');

  if (!pageNumber || pageNumber.length !== 3 || isNaN(parseInt(pageNumber))) {
    return 100;
  }

  return parseInt(pageNumber);
}

async function getCurrentPage(pageNumber) {
  const page = await fetch(`/pages/${pageNumber}.html`).then(res => res.text());

  // If the page does not exist it tries to render the main page again. Show 404 instead.
  if (page.toLowerCase().startsWith('<!doctype html>')) {
    return await fetch('/pages/_404.html').then(res => res.text());
  }

  return page;
}

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
  window.location.href = `?p=${pageNumber}`;
}
