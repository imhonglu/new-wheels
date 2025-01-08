import { characterSet, concat } from "@imhonglu/pattern-builder";
import type { SafeExecutor } from "@imhonglu/toolkit";
import { Serializable } from "../utils/serializable/serializable.js";
import { pchar } from "./constants.js";
import { InvalidPathError } from "./errors/invalid-path-error.js";

const slash = characterSet("/").optional();

const pattern = concat(
	concat(slash, pchar.clone().nonCapturingGroup().oneOrMore())
		.nonCapturingGroup()
		.zeroOrMore(),
	slash,
)
	.anchor()
	.toRegExp();

/**
 * The Path formatter based on RFC 3986.
 *
 * @example
 * ```ts
 * Path.parse("/path/to/resource"); // { segments: ["path", "to", "resource"], isAbsolute: true }
 * ```
 *
 * @example
 * ```ts
 * Path.parse("path/to/resource"); // { segments: ["path", "to", "resource"], isAbsolute: false }
 * ```
 *
 * @see {@link https://datatracker.ietf.org/doc/html/rfc3986#section-3.3 | RFC 3986#section-3.3}
 */
@Serializable
export class Path {
	public readonly isAbsolute: boolean;
	public readonly hasTrailingSlash: boolean;
	public readonly segments: string[];

	public constructor({ isAbsolute, hasTrailingSlash, segments }: Path) {
		this.isAbsolute = isAbsolute;
		this.hasTrailingSlash = hasTrailingSlash;
		this.segments = segments;
	}

	public static safeParse: SafeExecutor<typeof Path.parse>;

	/**
	 * Converts a Path string to a {@link Path} object.
	 *
	 * @param text - A valid Path string. e.g. "/path/to/resource"
	 * @throws - {@link InvalidPathError}
	 */
	public static parse(text: string): Path {
		const matches = text.match(pattern);

		if (!matches) {
			throw new InvalidPathError(text);
		}

		const segments = text.split("/");

		const isAbsolute = text.startsWith("/");
		if (isAbsolute) segments.splice(0, 1);

		const hasTrailingSlash = text.endsWith("/");
		if (hasTrailingSlash) segments.splice(-1);

		return new Path({
			segments,
			isAbsolute,
			hasTrailingSlash,
		});
	}

	/**
	 * Converts an {@link Path} object to a Path string.
	 *
	 * @param value - An {@link Path} object.
	 */
	public static stringify({
		segments,
		isAbsolute,
		hasTrailingSlash,
	}: Path): string {
		return (
			(isAbsolute ? "/" : "") +
			segments.join("/") +
			(hasTrailingSlash ? "/" : "")
		);
	}
}
