/** The eight teletext colours, matching the tokens and utilities in theme.css. */
export const COLORS = [
  "black",
  "red",
  "green",
  "yellow",
  "blue",
  "magenta",
  "cyan",
  "white",
] as const;

export type Color = (typeof COLORS)[number];
