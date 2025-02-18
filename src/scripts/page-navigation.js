const pageInputElement = document.getElementById("page-input");
const currentPageElement = document.getElementById("current-page");
const pageContentElement = document.getElementById("page-content");

export function initPageNavigation() {
  const pageCode = _getCurrentPageCode();
  _replacePageContent(pageCode);
}

export function navigateToPage(pageCode) {
  history.pushState({ pageCode }, "", `?p=${pageCode}`);
  _replacePageContent(pageCode);
}

// #region Private helper functions

function _getCurrentPageCode() {
  const searchParams = new URLSearchParams(window.location.search);
  const rawPageCode = searchParams.get("p");
  const pageCode = Number.parseInt(rawPageCode, 10);

  if (!rawPageCode || rawPageCode.length !== 3 || Number.isNaN(pageCode)) {
    return 100;
  }

  return pageCode;
}

async function _getPageContent(pageCode) {
  const res = await fetch(`/pages/${pageCode}.html`);
  const contentText = await res.text();
  if (contentText.toLowerCase().startsWith("<!doctype html>")) {
    return _getPageContent("_404");
  }

  return contentText;
}

async function _replacePageContent(pageCode) {
  const pageContent = await _getPageContent(pageCode);

  currentPageElement.textContent = pageCode;
  pageInputElement.textContent = `P${pageCode}`;
  pageContentElement.innerHTML = pageContent;
}

// #endregion
