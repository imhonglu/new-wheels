import { punycode } from "../../utils/punycode/punycode.js";
import { hasRestrictedContextualRules } from "./has-restricted-contextual-rules.js";
import { isLeadingCombiningMark } from "./is-leading-combining-mark.js";

export function isValidIdnLabel(label: string): boolean {
	const isEncoded = punycode.isEncoded(label);
	/**
	 * @see {@link https://datatracker.ietf.org/doc/html/rfc5890#section-2.3.2.1 | RFC 5890#section-2.3.2.1}
	 * @see {@link https://datatracker.ietf.org/doc/html/rfc5891#section-4.2.3.1 | RFC 5891#section-4.2.3.1}
	 */
	if (isEncoded) {
		return label.slice(6, 8) !== "--";
	}

	return !(
		isLeadingCombiningMark(label) || hasRestrictedContextualRules(label)
	);
}
