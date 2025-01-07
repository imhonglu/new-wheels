import { PARAMETERS } from "./constants.js";

/**
 * Converts a basic code point into a digit/integer.
 *
 * @param codePoint The basic numeric code point value.
 * @returns The numeric value of a basic code point (for use in
 * representing integers) in the range `0` to `base - 1`, or `base` if
 * the code point does not represent a value.
 */
function toDigit(codePoint: number) {
	if (codePoint >= 0x30 && codePoint < 0x3a) {
		return 26 + (codePoint - 0x30);
	}
	if (codePoint >= 0x41 && codePoint < 0x5b) {
		return codePoint - 0x41;
	}
	if (codePoint >= 0x61 && codePoint < 0x7b) {
		return codePoint - 0x61;
	}
	return PARAMETERS.base;
}

/**
 * Converts a digit/integer into a basic code point.
 *
 * @param digit The numeric value of a basic code point.
 * @returns The basic code point whose value (when used for
 * representing integers) is `digit`, which needs to be in the range
 * `0` to `base - 1`. If `flag` is non-zero, the uppercase form is
 * used; else, the lowercase form is used. The behavior is undefined
 * if `flag` is non-zero and `digit` has no uppercase form.
 */
function fromDigit(digit: number, flag: number) {
	//  0..25 map to ASCII a..z or A..Z
	// 26..35 map to ASCII 0..9
	return digit + 22 + 75 * (digit < 26 ? 1 : 0) - (flag << 5);
}

export const basicCodePoint = {
	toDigit,
	fromDigit,
};
