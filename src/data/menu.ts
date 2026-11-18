import type { Color } from "./colors";

export interface MenuEntry {
  code: string;
  label: string;
}

export interface MenuSection {
  label: string;
  background: Color;
  foreground: Color;
  entries: MenuEntry[];
}

/**
 * Site structure: page 100, the footer "fastext" links and the 404 page are
 * all generated from here. Entries without a page in src/content/pages link
 * to the "coming soon" 404 page.
 */
export const sections = {
  profile: {
    label: "PROFILE",
    background: "red",
    foreground: "white",
    entries: [
      { code: "110", label: "ABOUT ME" },
      { code: "120", label: "SKILLS" },
      { code: "130", label: "EXPERIENCE" },
      { code: "140", label: "EDUCATION" },
      { code: "150", label: "ACHIEVEMENTS" },
    ],
  },
  projects: {
    label: "PROJECTS",
    background: "green",
    foreground: "blue",
    entries: [
      { code: "210", label: "PROJECTS" },
      { code: "220", label: "GITHUB REPOS" },
      { code: "230", label: "TECH STACK" },
      { code: "240", label: "CASE STUDIES" },
      { code: "250", label: "OPEN SOURCE" },
    ],
  },
  content: {
    label: "CONTENT",
    background: "yellow",
    foreground: "blue",
    entries: [
      { code: "310", label: "BLOG POSTS" },
      { code: "320", label: "ARTICLES" },
      { code: "330", label: "TUTORIALS" },
      { code: "340", label: "PODCASTS" },
      { code: "350", label: "PRESENTATIONS" },
    ],
  },
  connect: {
    label: "CONNECT",
    background: "cyan",
    foreground: "blue",
    entries: [
      { code: "410", label: "CONTACT" },
      { code: "420", label: "SOCIAL MEDIA" },
      { code: "430", label: "RESUME" },
      { code: "440", label: "TESTIMONIALS" },
      { code: "450", label: "HIRE ME" },
    ],
  },
} satisfies Record<string, MenuSection>;

export const home: MenuEntry = { code: "100", label: "HOME PAGE" };
export const contactInfo: MenuEntry = { code: "999", label: "CONTACT INFO" };

/** Coloured footer links, one per section, pointing at its first page. */
export const fastext = Object.values(sections).map((section) => ({
  label: section.label,
  color: section.background,
  code: section.entries[0].code,
}));

export const PAGE_CODE = /^\d{3}$/;

export function pageHref(code: string): string {
  return `/teletext/${code}/`;
}

for (const entry of [
  home,
  contactInfo,
  ...Object.values(sections).flatMap((s) => s.entries),
]) {
  if (!PAGE_CODE.test(entry.code)) {
    throw new Error(
      `Menu entry "${entry.label}" has invalid code "${entry.code}"`,
    );
  }
}
