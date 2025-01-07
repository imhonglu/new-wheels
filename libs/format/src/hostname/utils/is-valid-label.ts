import { alpha, characterSet, concat, digit } from "@imhonglu/pattern-builder";

/**
 * <label> ::= <letter> [ [ <ldh-str> ] <let-dig> ]
 * <ldh-str> ::= <let-dig-hyp> | <let-dig-hyp> <ldh-str>
 * <let-dig-hyp> ::= <let-dig> | "-"
 * <let-dig> ::= <letter> | <digit>
 * <letter> ::= any one of the 52 alphabetic characters A through Z in
 * upper case and a through z in lower case
 * <digit> ::= any one of the ten digits 0 through 9
 *  */
const alphaDigit = characterSet(alpha, digit);
const hyphen = characterSet("\\-");
const pattern = concat(
	/**
	 * leading digit is allowed by RFC 1123
	 * @see {@link https://datatracker.ietf.org/doc/html/rfc1123#page-13 | RFC 1123#page-13}
	 * @see {@link https://serverfault.com/a/638270 | ServerFault#a/638270}
	 */
	alphaDigit,
	characterSet(alphaDigit, hyphen).zeroOrMore(),
	hyphen.clone().negateLookbehind(),
)
	.anchor()
	.toRegExp();

export function isValidLabel(label: string): boolean {
	return label.length >= 1 && label.length <= 63 && pattern.test(label);
}
