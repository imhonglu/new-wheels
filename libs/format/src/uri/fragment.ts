import { characterSet, oneOf } from "@imhonglu/pattern-builder";
import type { SafeExecutor } from "@imhonglu/toolkit";
import { Serializable } from "../utils/serializable/serializable.js";
import { iriPchar, pchar } from "./constants.js";
import { InvalidFragmentError } from "./errors/invalid-fragment-error.js";
import type { URIParseOptions } from "./types/uri-parse-options.js";

const pattern = {
	iriFragment: oneOf(iriPchar, characterSet("/?"))
		.nonCapturingGroup()
		.zeroOrMore()
		.anchor()
		.toRegExp("u"),

	fragment: oneOf(pchar, characterSet("/?"))
		.nonCapturingGroup()
		.zeroOrMore()
		.anchor()
		.toRegExp(),
};

/**
 * The Fragment formatter based on RFC 3986.
 *
 * @example
 * ```ts
 * Fragment.parse("section1"); // { text: "section1" }
 * ```
 *
 * @see {@link https://datatracker.ietf.org/doc/html/rfc3986#section-3.5 | RFC 3986#section-3.5}
 */
@Serializable
export class Fragment {
	public readonly text: string;
	public readonly options?: URIParseOptions;

	public constructor({ text, options }: Fragment) {
		this.text = text;
		this.options = options;
	}

	public static safeParse: SafeExecutor<typeof Fragment.parse>;

	/**
	 * Converts a Fragment string to a {@link Fragment} object.
	 *
	 * @param text - A valid Fragment string.
	 * @throws {@link InvalidFragmentError}
	 */
	public static parse(text: string, options?: URIParseOptions): Fragment {
		const fragmentPattern = options?.isIri
			? pattern.iriFragment
			: pattern.fragment;

		if (!fragmentPattern.test(text)) {
			throw new InvalidFragmentError(text);
		}

		return new Fragment({ text, options });
	}

	/**
	 * Converts a {@link Fragment} object to a Fragment string.
	 *
	 * @param value - A {@link Fragment} object.
	 */
	public static stringify(value: Fragment): string {
		return value.text;
	}

	public toString(): string {
		return Fragment.stringify(this);
	}
}
