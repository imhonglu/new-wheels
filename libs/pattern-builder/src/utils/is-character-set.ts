import type { PatternInput } from "../types/pattern-input.js";
import { extractPatternSource } from "./extract-pattern-source.js";

/**
 * Checks if a pattern is a character set.
 *
 * @param pattern - The pattern to check.
 * @returns Whether the pattern is a character set.
 */
export function isCharacterSet(pattern: PatternInput): boolean {
	const source = extractPatternSource(pattern);

	return source.startsWith("[") && source.endsWith("]");
}
