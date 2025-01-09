import { alpha, characterSet, concat, digit } from "@imhonglu/pattern-builder";
import type { SafeExecutor } from "@imhonglu/toolkit";
import { Serializable } from "../utils/serializable/serializable.js";
import { InvalidLocalPartError } from "./errors/invalid-local-part-error.js";
import { hasValidLocalPartLength } from "./utils/has-valid-local-part-length.js";

const atom = characterSet(alpha, digit, /[!#$%&'*+\-/=?^_`{|}~]/).oneOrMore();
const dot = characterSet(".");

const pattern = {
	dotString: concat(atom, concat(dot, atom).nonCapturingGroup().zeroOrMore())
		.anchor()
		.toRegExp(),

	quotedString: concat(
		'"',
		characterSet(/[\x5c\x20-\x7E]/, /[\x20\x21\x23-\x5B\x5D-\x7E]/).oneOrMore(),
		'"',
	)
		.anchor()
		.toRegExp(),
};

/**
 * The LocalPart formatter based on RFC 5321 and RFC 5322.
 *
 * @example
 * ```ts
 * LocalPart.parse("john.doe"); // { text: "john.doe", type: "dotString" }
 * ```
 *
 * @example
 * ```ts
 * LocalPart.parse('"john.doe"'); // { text: '"john.doe"', type: "quotedString" }
 * ```
 *
 * @see {@link https://datatracker.ietf.org/doc/html/rfc5321#page-42 | RFC 5321#page-42}
 * @see {@link https://datatracker.ietf.org/doc/html/rfc5322#page-13 | RFC 5322#page-13}
 */
@Serializable
export class LocalPart {
	public readonly text: string;
	public readonly type: "dotString" | "quotedString";

	constructor({ text, type }: LocalPart) {
		this.text = text;
		this.type = type;
	}

	public static safeParse: SafeExecutor<typeof LocalPart.parse>;

	/**
	 * Converts a LocalPart string to a {@link LocalPart} object.
	 *
	 * @param text - A valid LocalPart string. e.g. "john.doe".
	 * @throws - {@link InvalidLocalPartError}
	 */
	public static parse(text: string): LocalPart {
		if (!hasValidLocalPartLength(text)) {
			throw new InvalidLocalPartError(text);
		}

		if (pattern.quotedString.test(text)) {
			return new LocalPart({
				text,
				type: "quotedString",
			});
		}

		if (!pattern.dotString.test(text)) {
			throw new InvalidLocalPartError(text);
		}

		return new LocalPart({
			text,
			type: "dotString",
		});
	}

	/**
	 * Converts an {@link LocalPart} object to a LocalPart string.
	 *
	 * @param value - An {@link LocalPart} object.
	 */
	public static stringify(value: LocalPart) {
		return value.text;
	}
}
