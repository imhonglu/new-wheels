import {
	alpha,
	characterSet,
	concat,
	digit,
	hexDigit,
	oneOf,
} from "@imhonglu/pattern-builder";

// pct-encoded = "%" HEXDIG HEXDIG
export const pctEncoded = concat("%", hexDigit.clone().exact(2));

// unreserved = ALPHA / DIGIT / "-" / "." / "_" / "~"
export const unreserved = characterSet(alpha, digit, /[\-._~]/);

// sub-delims = "!" / "$" / "&" / "'" / "(" / ")"
//            / "*" / "+" / "," / ";" / "="
export const subDelims = characterSet(/[!$&'()*+,;=]/);

// pchar = unreserved / pct-encoded / sub-delims / ":" / "@"
export const pchar = oneOf(
	pctEncoded,
	characterSet(unreserved, subDelims, /[:@]/),
);

// query = *( pchar / "/" / "?" )
// fragment = *( pchar / "/" / "?" )
export const query = oneOf(pchar, characterSet("/?"))
	.nonCapturingGroup()
	.zeroOrMore()
	.anchor();
export const fragment = query;
