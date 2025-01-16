import { PatternBuilder } from "../pattern-builder/pattern-builder.js";
import type { PatternInput } from "../types/pattern-input.js";
import { extractPatternSource } from "../utils/extract-pattern-source.js";

/**
 * Creates a pattern builder for the concat operator.
 *
 * @param patterns - The patterns to create the concat operator from.
 * @returns The pattern builder.
 *
 * @example only string
 * ```ts
 * concat("a", "b", "c");
 * // => /abc/
 * ```
 *
 * @example pre-defined pattern with pattern
 * ```ts
 * concat(alpha, digit);
 * // => /[a-zA-Z][\d]/
 * ```
 *
 * @example pre-defined pattern with string
 * ```ts
 * concat(alpha, "0");
 * // => /[a-zA-Z]0/
 * ```
 */
export function concat(...patterns: PatternInput[]) {
  return new PatternBuilder(patterns.map(extractPatternSource).join(""));
}
