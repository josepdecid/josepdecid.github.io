import { navigate } from "astro:transitions/client";
import { PAGE_CODE, pageHref } from "../data/menu";

const PAGE_PATH = /^\/teletext\/(\d{3})\/?$/;

/** Digits typed so far (0–2 of them). */
let typed = "";
/** Code being loaded after the third digit, shown until the new page arrives. */
let pending: string | null = null;

function currentCode(): string {
  // The 404 page is served at the requested URL, so the path is the source of truth.
  return (
    location.pathname.match(PAGE_PATH)?.[1] ??
    document.getElementById("page-content")?.dataset.page ??
    "---"
  );
}

function render(): void {
  const code = currentCode();
  const input = document.getElementById("page-input");
  const current = document.getElementById("current-page");

  if (input) {
    input.textContent = `P${typed ? typed.padEnd(3, "-") : (pending ?? code)}`;
  }
  if (current) {
    current.textContent = code;
  }
}

function isEditable(target: EventTarget | null): boolean {
  return (
    target instanceof HTMLElement &&
    (target.isContentEditable ||
      ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName))
  );
}

function goTo(code: string): void {
  if (!PAGE_CODE.test(code)) return;
  pending = code;
  navigate(pageHref(code));
}

document.addEventListener("keydown", (event) => {
  // Leave browser shortcuts (Cmd/Ctrl+1…9 switches tabs) and form fields alone.
  if (
    event.ctrlKey ||
    event.metaKey ||
    event.altKey ||
    isEditable(event.target)
  ) {
    return;
  }

  if (/^[0-9]$/.test(event.key)) {
    typed += event.key;
    if (typed.length === 3) {
      const code = typed;
      typed = "";
      goTo(code);
    }
  } else if (event.key === "Backspace" && typed) {
    event.preventDefault();
    typed = typed.slice(0, -1);
  } else if (event.key === "Escape" && typed) {
    typed = "";
  } else {
    return;
  }

  render();
});

document.addEventListener("astro:page-load", () => {
  pending = null;
  render();
});
