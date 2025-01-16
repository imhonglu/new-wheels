import { PatternBuilder } from "../pattern-builder/pattern-builder.js";
import type { PatternInput } from "../types/pattern-input.js";
import { extractPatternSource } from "../utils/extract-pattern-source.js";

/**
 * Creates a pattern builder for the one of operator.
 *
 * @param patterns - The patterns to create the one of operator from.
 * @returns The pattern builder.
 *
 * @example only string
 * ```ts
 * oneOf("a", "b", "c");
 * // => /a|b|c/
 * ```
 *
 * @example pre-defined pattern with pattern
 * ```ts
 * oneOf(alpha, digit);
 * // => /[a-zA-Z]|[\d]/
 * ```
 *
 * @example pre-defined pattern with string
 * ```ts
 * oneOf(alpha, "0");
 * // => /[a-zA-Z]|0/
 * ```
 */
export function oneOf(...patterns: PatternInput[]) {
  return new PatternBuilder(patterns.map(extractPatternSource).join("|"));
}
