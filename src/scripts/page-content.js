import { getCurrentPageNumber, getPageContent } from "./page-navigation.js";

const pageInputElement = document.getElementById("page-input");
const currentPageElement = document.getElementById("current-page");
const pageContentElement = document.getElementById("page-content");
const timeElement = document.getElementById("time");

export async function setupPageContent() {
  setInterval(_updateDateTime, 1000);
  _updateDateTime();

  const pageNumber = getCurrentPageNumber();
  const pageContent = await getPageContent(pageNumber);

  currentPageElement.textContent = pageNumber;
  pageInputElement.textContent = `P${pageNumber}`;
  pageContentElement.innerHTML = pageContent;
}

function _updateDateTime() {
  const now = new Date();
  const timeStr = now.toLocaleString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });

  timeElement.textContent = timeStr;
}
