import type { SafeExecutor } from "@imhonglu/toolkit";
import { punycode } from "../utils/punycode/punycode.js";
import { Serializable } from "../utils/serializable/serializable.js";
import { InvalidIdnHostnameError } from "./errors/invalid-idn-hostname-error.js";
import { hasValidHostnameLength } from "./utils/has-valid-hostname-length.js";
import { isValidIdnLabel } from "./utils/is-valid-idn-label.js";
import { isValidLabel } from "./utils/is-valid-label.js";

/**
 * The IdnHostname formatter based on RFC 1034 and RFC 5890.
 *
 *  @example
 * ```ts
 * IdnHostname.parse("한국.com");
 * // {
 * //   unicode: { labels: ["한국", "com"], tld: ".com" },
 * //   ascii: { labels: ["xn--3e0b707e", "com"], tld: ".com" }
 * // }
 * ```
 *
 * @see {@link https://datatracker.ietf.org/doc/html/rfc1034#page-11 | RFC 1034#page-11}
 * @see {@link https://datatracker.ietf.org/doc/html/rfc5890#section-2.3 | RFC 5890#section-2.3}
 */
@Serializable
export class IdnHostname {
	public readonly unicode: {
		labels: string[];
		tld?: string;
	};
	public readonly ascii: {
		labels: string[];
		tld?: string;
	};

	constructor({ unicode, ascii }: IdnHostname) {
		this.unicode = unicode;
		this.ascii = ascii;
	}

	public static safeParse: SafeExecutor<typeof IdnHostname.parse>;

	/**
	 * Converts a IdnHostname string to a {@link IdnHostname} object.
	 *
	 * @param text - A valid IdnHostname string. e.g. "한국.com".
	 * @throws - {@link InvalidIdnHostnameError}
	 */
	public static parse(text: string): IdnHostname {
		if (!hasValidHostnameLength(text)) {
			throw new InvalidIdnHostnameError(text);
		}

		const labels = text.split(".");

		const unicode = [];
		const ascii = [];

		for (const label of labels) {
			if (!isValidIdnLabel(label)) {
				throw new InvalidIdnHostnameError(text);
			}

			const asciiLabel = punycode.toASCII(label);

			if (!isValidLabel(asciiLabel)) {
				throw new InvalidIdnHostnameError(text);
			}

			unicode.push(punycode.toUnicode(label));
			ascii.push(asciiLabel);
		}

		const tld = labels.length > 1 ? labels[labels.length - 1] : undefined;

		return new IdnHostname({
			unicode: {
				labels: unicode,
				tld: tld ? `.${punycode.toUnicode(tld)}` : undefined,
			},
			ascii: {
				labels: ascii,
				tld: tld ? `.${punycode.toASCII(tld)}` : undefined,
			},
		});
	}

	public static stringify({ ascii }: IdnHostname) {
		return ascii.labels.join(".");
	}
}
