import { execSync } from "node:child_process";

/**
 * Site version shown in the header, resolved once at build time from git.
 *
 * - CI tag build: the pushed tag (`v0.0.8` -> `0.0.8`).
 * - Anywhere else: `git describe`, e.g. `0.0.8-3-g1a2b3c4` for 3 commits after
 *   the last tag, or a bare commit hash when there are no tags yet.
 */
function resolveVersion(): string {
  if (process.env.GITHUB_REF_TYPE === "tag" && process.env.GITHUB_REF_NAME) {
    return process.env.GITHUB_REF_NAME;
  }
  try {
    return execSync("git describe --tags --always --dirty", {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    }).trim();
  } catch {
    return "dev";
  }
}

export const version = resolveVersion().replace(/^v/, "");
