import type { PatternInput } from "../types/pattern-input.js";

/**
 * Extracts the source of a pattern.
 *
 * @param pattern - The pattern to extract the source from.
 * @returns The source of the pattern.
 */
export function extractPatternSource(pattern: PatternInput): string {
  return typeof pattern === "string" ? pattern : pattern.source;
}
