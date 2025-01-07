import { Characters } from "../pattern-builder/characters.js";
import type { PatternInput } from "../types/pattern-input.js";
import { extractPatternSource } from "../utils/extract-pattern-source.js";

function isCharacterSet(source: string) {
	return source.startsWith("[") && source.endsWith("]");
}

/**
 * Creates a pattern builder for the character set operator.
 *
 * @param patterns - The patterns to create the character set operator from.
 * @returns The pattern builder.
 *
 * @example pre-defined pattern with string
 * ```ts
 * characterSet(alpha, '#!');
 * // => /[a-zA-Z#!]/
 * ```
 *
 * @example pre-defined pattern with pattern
 * ```ts
 * characterSet(digit, /[a-fA-F]/);
 * // => /[\da-fA-F]/
 * ```
 *
 * @example only string
 * ```ts
 * characterSet("a", "b", "c");
 * // => /[abc]/
 * ```
 */
export function characterSet(...patterns: PatternInput[]) {
	const source = patterns
		.map((pattern) => {
			const source = extractPatternSource(pattern);

			if (isCharacterSet(source)) {
				return source.slice(1, -1);
			}

			return source;
		})
		.join("");

	return new Characters(`[${source}]`);
}

/** The pre-defined digit pattern. */
export const digit = characterSet(/\d/);

/** The pre-defined alpha pattern. */
export const alpha = characterSet(/a-z/, /A-Z/);

/** The pre-defined hex digit pattern. */
export const hexDigit = characterSet(digit, /a-f/, /A-F/);
