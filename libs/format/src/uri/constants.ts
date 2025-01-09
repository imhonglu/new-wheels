import {
	alpha,
	characterSet,
	concat,
	digit,
	hexDigit,
	oneOf,
} from "@imhonglu/pattern-builder";

export const pctEncoded = concat("%", hexDigit.clone().exact(2));
export const subDelims = characterSet(/[!$&'()*+,;=]/);

export const unreserved = characterSet(alpha, digit, /[\-._~]/);
export const pchar = oneOf(
	pctEncoded,
	characterSet(unreserved, subDelims, /[:@]/),
);

export const ucschar = characterSet(
	/[\u{A0}-\u{D7FF}]/u,
	/[\u{F900}-\u{FDCF}]/u,
	/[\u{FDF0}-\u{FFEF}]/u,
	/[\u{10000}-\u{1FFFD}]/u,
	/[\u{20000}-\u{2FFFD}]/u,
	/[\u{30000}-\u{3FFFD}]/u,
	/[\u{40000}-\u{4FFFD}]/u,
	/[\u{50000}-\u{5FFFD}]/u,
	/[\u{60000}-\u{6FFFD}]/u,
	/[\u{70000}-\u{7FFFD}]/u,
	/[\u{80000}-\u{8FFFD}]/u,
	/[\u{90000}-\u{9FFFD}]/u,
	/[\u{A0000}-\u{AFFFD}]/u,
	/[\u{B0000}-\u{BFFFD}]/u,
	/[\u{C0000}-\u{CFFFD}]/u,
	/[\u{D0000}-\u{DFFFD}]/u,
	/[\u{E1000}-\u{EFFFD}]/u,
);

export const iriPrivate = characterSet(
	/[\u{E000}-\u{F8FF}]/u,
	/[\u{F0000}-\u{FFFFD}]/u,
	/[\u{100000}-\u{10FFFD}]/u,
);

export const iriUnreserved = characterSet(alpha, digit, /[\-._~]/, ucschar);
export const iriPchar = oneOf(
	pctEncoded,
	characterSet(iriUnreserved, subDelims, /[:@]/),
);
