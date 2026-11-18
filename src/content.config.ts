import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";
import { COLORS } from "./data/colors";

/** One Markdown file per teletext page, named after its code: 110.md, 430.md… */
const pages = defineCollection({
  loader: glob({ pattern: "*.md", base: "./src/content/pages" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    background: z.enum(COLORS).default("blue"),
    foreground: z.enum(COLORS).default("white"),
  }),
});

export const collections = { pages };
