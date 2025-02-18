export function getCurrentPageNumber() {
  const searchParams = new URLSearchParams(window.location.search);
  const rawPageNumber = searchParams.get('p');
  const pageNumber = parseInt(rawPageNumber);

  if (!rawPageNumber || rawPageNumber.length !== 3 || isNaN(pageNumber)) {
    return 100;
  }

  return pageNumber;
}

export async function getPageContent(pageNumber) {
  const res = await fetch(`/pages/${pageNumber}.html`);
  const contentText = await res.text();
  if (contentText.toLowerCase().startsWith('<!doctype html>')) {
    return getPageContent('_404');
  }

  return contentText;
}

export function navigateToPage(pageNumber) {
  window.location.href = `?p=${pageNumber}`;
}
