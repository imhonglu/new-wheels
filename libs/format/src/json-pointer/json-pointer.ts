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
const escaped = concat("~", /[01]/).nonCapturingGroup();
const referenceToken = oneOf(unescaped, escaped)
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
		const match = pattern.exec(text);
		if (!match) {
			throw new InvalidJsonPointerError(text);
		}

		return new JsonPointer({
			segments: text === "/" ? [] : text.slice(1).split("/"),
		});
	}

	/**
	 * Converts an {@link JsonPointer} object to a JsonPointer string.
	 *
	 * @param jsonPointer - The JsonPointer object to convert.
	 * @returns The JsonPointer string.
	 */
	public static stringify({ segments }: JsonPointer) {
		return `/${segments.join("/")}`;
	}
}
