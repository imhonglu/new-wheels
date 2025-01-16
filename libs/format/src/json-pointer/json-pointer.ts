import { characterSet, concat, oneOf } from "@imhonglu/pattern-builder";
import type { SafeExecutor } from "@imhonglu/toolkit";
import { Serializable } from "../utils/serializable/serializable.js";
import { InvalidJsonPointerError } from "./errors/invalid-json-pointer-error.js";

const unescaped = characterSet(
	// biome-ignore lint/suspicious/noControlCharactersInRegex: <explanation>
	/[\u{00}-\u{2E}]/u,
	/[\u{30}-\u{7D}]/u,
	/[\u{7F}-\u{10FFFF}]/u,
);
const escapeTilde = "~0";
const escapeSlash = "~1";
const referenceToken = oneOf(unescaped, escapeTilde, escapeSlash)
	.nonCapturingGroup()
	.zeroOrMore();

const pattern = concat("/", referenceToken)
	.nonCapturingGroup()
	.zeroOrMore()
	.anchor()
	.toRegExp("u");

/**
 * The JsonPointer formatter based on RFC 6901.
 *
 * @example
 * ```typescript
 * JsonPointer.parse("/foo/bar");
 * // => { segments: ["foo", "bar"] }
 * ```
 *
 * @see {@link https://datatracker.ietf.org/doc/html/rfc6901 | RFC 6901}
 */
@Serializable
export class JsonPointer {
	public readonly segments: string[];

	constructor({ segments }: JsonPointer) {
		this.segments = segments;
	}

	public static safeParse: SafeExecutor<typeof JsonPointer.parse>;

	/**
	 * Converts a JsonPointer string to an {@link JsonPointer} object.
	 *
	 * @param text - A valid JsonPointer string. e.g. "/foo/0".
	 * @throws - {@link InvalidJsonPointerError}
	 */
	public static parse(text: string) {
		if (text === "/") {
			return new JsonPointer({
				segments: [],
			});
		}

		const match = pattern.exec(text);
		if (!match) {
			throw new InvalidJsonPointerError(text);
		}

		const segments = [];

		for (const segment of text.slice(1).split("/")) {
			segments.push(JsonPointer.unescape(segment));
		}

		return new JsonPointer({
			segments,
		});
	}

	/**
	 * Converts an {@link JsonPointer} object to a JsonPointer string.
	 *
	 * @param value - The JsonPointer object to convert.
	 * @returns The JsonPointer string.
	 */
	public static stringify({ segments }: JsonPointer) {
		return `/${segments.join("/")}`;
	}

	/**
	 * Escapes the special characters in a JsonPointer string.
	 *
	 * @param text - The JsonPointer string to escape.
	 * @returns The escaped JsonPointer string.
	 */
	public static escape(text: string) {
		return text.replace("~", escapeTilde).replace("/", escapeSlash);
	}

	/**
	 * Unescapes the special characters in a JsonPointer string.
	 *
	 * @param text - The JsonPointer string to unescape.
	 * @returns The unescaped JsonPointer string.
	 */
	public static unescape(text: string) {
		return text.replace(escapeTilde, "~").replace(escapeSlash, "/");
	}
}
