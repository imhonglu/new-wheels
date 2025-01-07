import { adapt } from "./adapt.js";
import { basicCodePoint } from "./basic-code-point.js";
import { MAX_INT, PARAMETERS } from "./constants.js";
import { OverflowError } from "./errors/overflow-error.js";
import { ucs2 } from "./ucs2.js";

/**
 * @see {@link https://github.com/nodejs/node/blob/60bd4fd2cc7d59440a8b55199dbc060f82655457/lib/punycode.js#L297 | NodeJS Punycode#L297}
 * @see {@link https://datatracker.ietf.org/doc/html/rfc3492#appendix-C | RFC 3492#Appendix C}
 *
 * @param input The string of Unicode symbols.
 * @returns The resulting Punycode string of ASCII-only symbols.
 */
export function encode(input: string) {
	const output = [];

	// Convert the input in UCS-2 to an array of Unicode code points.
	const decodedInput = ucs2.decode(input);

	// Cache the length.
	const inputLength = decodedInput.length;

	// Initialize the state.
	let n = PARAMETERS.initialN;
	let delta = 0;
	let bias = PARAMETERS.initialBias;

	// Handle the basic code points.
	for (const currentValue of decodedInput) {
		if (currentValue < 0x80) {
			output.push(String.fromCharCode(currentValue));
		}
	}

	const basicLength = output.length;
	let handledCPCount = basicLength;

	// `handledCPCount` is the number of code points that have been handled;
	// `basicLength` is the number of basic code points.

	// Finish the basic string with a delimiter unless it's empty.
	if (basicLength) {
		output.push(PARAMETERS.delimiter);
	}

	// Main encoding loop:
	while (handledCPCount < inputLength) {
		// All non-basic code points < n have been handled already. Find the next
		// larger one:
		let m = MAX_INT;
		for (const currentValue of decodedInput) {
			if (currentValue >= n && currentValue < m) {
				m = currentValue;
			}
		}

		// Increase `delta` enough to advance the decoder's <n,i> state to <m,0>,
		// but guard against overflow.
		const handledCPCountPlusOne = handledCPCount + 1;
		if (m - n > Math.floor((MAX_INT - delta) / handledCPCountPlusOne)) {
			throw new OverflowError();
		}

		delta += (m - n) * handledCPCountPlusOne;
		n = m;

		for (const currentValue of decodedInput) {
			if (currentValue < n && ++delta > MAX_INT) {
				throw new OverflowError();
			}
			if (currentValue === n) {
				// Represent delta as a generalized variable-length integer.
				let q = delta;
				for (
					let k = PARAMETERS.base;
					;
					/* no condition */ k += PARAMETERS.base
				) {
					const t =
						k <= bias
							? PARAMETERS.tMin
							: k >= bias + PARAMETERS.tMax
								? PARAMETERS.tMax
								: k - bias;
					if (q < t) {
						break;
					}
					const qMinusT = q - t;
					const baseMinusT = PARAMETERS.base - t;
					output.push(
						String.fromCharCode(
							basicCodePoint.fromDigit(t + (qMinusT % baseMinusT), 0),
						),
					);
					q = Math.floor(qMinusT / baseMinusT);
				}

				output.push(String.fromCharCode(basicCodePoint.fromDigit(q, 0)));
				bias = adapt(
					delta,
					handledCPCountPlusOne,
					handledCPCount === basicLength,
				);
				delta = 0;
				++handledCPCount;
			}
		}

		++delta;
		++n;
	}
	return output.join("");
}
