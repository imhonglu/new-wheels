import { alpha, characterSet, concat, digit } from "@imhonglu/pattern-builder";
import type { SafeExecutor } from "@imhonglu/toolkit";
import { Serializable } from "../utils/serializable/serializable.js";
import { Authority } from "./authority.js";
import { fragment } from "./constants.js";
import { InvalidURIError } from "./errors/invalid-uri-error.js";
import { Path } from "./path.js";
import { Query } from "./query.js";

const pattern = {
	/** @see {@link https://datatracker.ietf.org/doc/html/rfc3986#appendix-B | RFC 3986#appendix-B} */
	uri: /^(([^:/?#]+):)?(\/\/([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?/,
	scheme: concat(
		characterSet(alpha),
		characterSet(alpha, digit, "+\\-.").nonCapturingGroup().zeroOrMore(),
	)
		.anchor()
		.toRegExp(),
	fragment: fragment.toRegExp(),
};

/**
 * The URIReference formatter based on RFC 3986.
 *
 * @example
 * ```ts
 * URIReference.parse("//example.com/path?query#fragment");
 * // {
 * //   scheme: undefined,
 * //   authority: { userinfo: undefined, host: { string: "example.com", type: "idn-hostname" }, port: undefined },
 * //   path: { segments: ["path"], isAbsolute: false, hasTrailingSlash: false },
 * //   query: { pairs: Map([["query", "fragment"]]) },
 * //   fragment: "fragment",
 * // }
 * ```
 *
 * @see {@link https://datatracker.ietf.org/doc/html/rfc3986#section-4.1 | RFC 3986#section-4.1}
 * @see {@link https://datatracker.ietf.org/doc/html/rfc3986#section-3.1 | RFC 3986#section-3.1}
 */
@Serializable
export class URIReference {
	public readonly scheme?: string;
	public readonly authority?: Authority;
	public readonly path?: Path;
	public readonly query?: Query;
	public readonly fragment?: string;

	public constructor({
		scheme,
		authority,
		path,
		query,
		fragment,
	}: URIReference) {
		this.scheme = scheme;
		this.authority = authority;
		this.path = path;
		this.query = query;
		this.fragment = fragment;
	}

	public static safeParse: SafeExecutor<typeof URIReference.parse>;

	/**
	 * Converts a URIReference string to a {@link URIReference} object.
	 *
	 * @param text - A valid URIReference string. e.g. "//example.com/path?query#fragment"
	 * @throws - {@link InvalidURIError}
	 */
	public static parse(text: string): URIReference {
		const match = text.match(pattern.uri);
		if (!match) {
			throw new InvalidURIError(text);
		}

		/**
		 * scheme    = $2
		 * authority = $4
		 * path      = $5
		 * query     = $7
		 * fragment  = $9
		 */
		const [, , scheme, , authority, path, , query, , fragment] = match;

		if (fragment && !pattern.fragment.test(fragment)) {
			throw new InvalidURIError(text);
		}

		if (scheme && !pattern.scheme.test(scheme)) {
			throw new InvalidURIError(text);
		}

		return new URIReference({
			scheme,
			authority: authority ? Authority.parse(authority) : undefined,
			path: path ? Path.parse(path) : undefined,
			query: query ? Query.parse(query) : undefined,
			fragment,
		});
	}

	/**
	 * Converts an {@link URIReference} object to a URIReference string.
	 *
	 * @param value - An {@link URIReference} object.
	 */
	public static stringify(value: URIReference): string {
		let result = "";

		if (value.scheme) result += `${value.scheme}:`;
		if (value.authority) result += `//${value.authority}`;
		if (value.path) result += Path.stringify(value.path);
		if (value.query) result += `?${Query.stringify(value.query)}`;
		if (value.fragment) result += `#${value.fragment}`;

		return result;
	}
}
