/**
 * @see {@link https://github.com/nodejs/node/blob/60bd4fd2cc7d59440a8b55199dbc060f82655457/lib/punycode.js#L11 | NodeJS Punycode#L11}
 */
export const MAX_INT = 2147483647; // aka. 0x7FFFFFFF or 2^31-1

/**
 * @see {@link https://github.com/nodejs/node/blob/60bd4fd2cc7d59440a8b55199dbc060f82655457/lib/punycode.js#L13 | NodeJS Punycode#L13}
 * @see {@link https://datatracker.ietf.org/doc/html/rfc3492#section-5 | RFC 3492#5}
 */
export const PARAMETERS = {
	base: 36,
	tMin: 1,
	tMax: 26,
	skew: 38,
	damp: 700,
	initialBias: 72,
	initialN: 128, // 0x80
	delimiter: "-", // '\x2D'
};
