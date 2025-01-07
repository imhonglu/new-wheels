import { adapt } from "./adapt.js";
import { basicCodePoint } from "./basic-code-point.js";
import { MAX_INT, PARAMETERS } from "./constants.js";
import { InvalidInputError } from "./errors/invalid-input-error.js";
import { NotBasicCodePointError } from "./errors/not-basic-code-point-error.js";
import { OverflowError } from "./errors/overflow-error.js";

/**
 * @see {@link https://github.com/nodejs/node/blob/60bd4fd2cc7d59440a8b55199dbc060f82655457/lib/punycode.js#L203 | NodeJS Punycode#L203}
 * @see {@link https://datatracker.ietf.org/doc/html/rfc3492#appendix-C | RFC 3492#Appendix C}
 *
 * @param input The Punycode string of ASCII-only symbols.
 * @returns The resulting string of Unicode symbols.
 */
export function decode(input: string) {
	// Don't use UCS-2.
	const output = [];

	const inputLength = input.length;

	let i = 0;
	let n = PARAMETERS.initialN;
	let bias = PARAMETERS.initialBias;

	// Handle the basic code points: let `basic` be the number of input code
	// points before the last delimiter, or `0` if there is none, then copy
	// the first basic code points to the output.

	let basic = input.lastIndexOf(PARAMETERS.delimiter);
	if (basic < 0) {
		basic = 0;
	}

	for (let j = 0; j < basic; ++j) {
		// if it's not a basic code point
		if (input.charCodeAt(j) >= 0x80) {
			throw new NotBasicCodePointError();
		}
		output.push(input.charCodeAt(j));
	}

	// Main decoding loop: start just after the last delimiter if any basic code
	// points were copied; start at the beginning otherwise.

	for (
		let index = basic > 0 ? basic + 1 : 0;
		index < inputLength;
	) /* no final expression */ {
		// `index` is the index of the next character to be consumed.
		// Decode a generalized variable-length integer into `delta`,
		// which gets added to `i`. The overflow checking is easier
		// if we increase `i` as we go, then subtract off its starting
		// value at the end to obtain `delta`.
		const oldi = i;
		for (
			let w = 1, k = PARAMETERS.base;
			;
			/* no condition */ k += PARAMETERS.base
		) {
			if (index >= inputLength) {
				throw new InvalidInputError();
			}

			const digit = basicCodePoint.toDigit(input.charCodeAt(index++));

			if (digit >= PARAMETERS.base) {
				throw new InvalidInputError();
			}
			if (digit > Math.floor((MAX_INT - i) / w)) {
				throw new OverflowError();
			}

			i += digit * w;
			const t =
				k <= bias
					? PARAMETERS.tMin
					: k >= bias + PARAMETERS.tMax
						? PARAMETERS.tMax
						: k - bias;

			if (digit < t) {
				break;
			}

			const baseMinusT = PARAMETERS.base - t;
			if (w > Math.floor(MAX_INT / baseMinusT)) {
				throw new OverflowError();
			}

			w *= baseMinusT;
		}

		const out = output.length + 1;
		bias = adapt(i - oldi, out, oldi === 0);

		// `i` was supposed to wrap around from `out` to `0`,
		// incrementing `n` each time, so we'll fix that now:
		if (Math.floor(i / out) > MAX_INT - n) {
			throw new OverflowError();
		}

		n += Math.floor(i / out);
		i %= out;

		// Insert `n` at position `i` of the output.
		output.splice(i++, 0, n);
	}

	return String.fromCodePoint(...output);
}
