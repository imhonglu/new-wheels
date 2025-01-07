import type { SafeExecutor } from "@imhonglu/toolkit";
import { Serializable } from "../utils/serializable/serializable.js";
import { InvalidURIError } from "./errors/invalid-uri-error.js";
import { URIReference } from "./uri-reference.js";

/**
 * The URI formatter based on RFC 3986.
 *
 * @example
 * ```ts
 * URI.parse("https://example.com/path?query#fragment");
 * // {
 * //   scheme: "https",
 * //   ... // same as URIReference
 * // }
 * ```
 *
 * @see {@link https://datatracker.ietf.org/doc/html/rfc3986#section-3.1 | RFC 3986#section-3.1}
 */
@Serializable
export class URI extends URIReference {
	public readonly scheme: string;

	public constructor(reference: URI) {
		super(reference);
		this.scheme = reference.scheme;
	}

	public static safeParse: SafeExecutor<typeof URI.parse>;

	/**
	 * Converts a URI string to a {@link URI} object.
	 *
	 * @param text - A valid URI string. e.g. "https://example.com/path?query#fragment"
	 * @throws - {@link InvalidURIError}
	 */
	public static parse(text: string) {
		const reference = URIReference.parse(text);
		if (!reference.scheme) {
			throw new InvalidURIError(text);
		}

		return reference as URI;
	}

	public static stringify(value: URI) {
		return URIReference.stringify(value);
	}
}
