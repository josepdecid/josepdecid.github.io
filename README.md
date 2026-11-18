# josepdecid.com

Teletext-style personal site, built with [Astro](https://astro.build) and deployed to GitHub Pages.

Every teletext page is a static HTML page at `/teletext/<code>/`. Type a 3-digit page number on the keyboard to jump to it (Backspace and Escape edit the input), or click a menu entry.

## Development

```sh
npm install
npm run dev       # http://localhost:4321
npm run build     # static site in dist/
npm run lint      # Biome
```

## Adding a page

Create `src/content/pages/<code>.md`:

```md
---
title: ABOUT ME
description: Who I am and what I work on.
background: red # title bar colour (optional, default blue)
foreground: white # title text colour (optional, default white)
---

Markdown content…
```

It's built to `/teletext/<code>/`. Menu entries live in `src/data/menu.ts`; entries without a page link to the "coming soon" 404 page.

## Structure

| Path                         | Purpose                                                              |
| ---------------------------- | -------------------------------------------------------------------- |
| `src/data/menu.ts`           | Site structure: page 100, footer links, 404 page                     |
| `src/content/pages/`         | One Markdown file per teletext page                                  |
| `src/layouts/Teletext.astro` | CRT frame, header bar, per-page metadata                             |
| `src/components/`            | Title bar, menu columns and items, footer                            |
| `src/scripts/`               | Keyboard page input and clock                                        |
| `src/pages/`                 | Routes: `/` (redirect), `/teletext/100/`, `/teletext/[code]/`, `404` |
