import type { SafeExecutor } from "@imhonglu/toolkit";
import { Serializable } from "../utils/serializable/serializable.js";
import { query } from "./constants.js";
import { InvalidQueryError } from "./errors/invalid-query-error.js";

const pattern = query.toRegExp();

/**
 * The Query formatter based on RFC 3986.
 *
 * @example
 * ```ts
 * Query.parse("key1=value1&key2=value2&key2=value3");
 * // {
 * //   pairs: Map([
 * //     ["key1", "value1"],
 * //     ["key2", ["value2", "value3"]],
 * //   ]),
 * // }
 * ```
 *
 * @see {@link https://datatracker.ietf.org/doc/html/rfc3986#section-3.4 | RFC 3986#section-3.4}
 */
@Serializable
export class Query {
	public readonly pairs: Map<string, string | string[]>;

	public constructor({ pairs }: Query) {
		this.pairs = pairs;
	}

	public static safeParse: SafeExecutor<typeof Query.parse>;

	/**
	 * Converts a Query string to a {@link Query} object.
	 *
	 * @param text - A valid Query string. e.g. "key1=value1&key2=value2&key2=value3"
	 * @throws - {@link InvalidQueryError}
	 */
	public static parse(text: string): Query {
		if (!pattern.test(text)) {
			throw new InvalidQueryError(text);
		}

		return new Query({
			pairs: text.split("&").reduce((acc, pair) => {
				const equalPos = pair.indexOf("=");
				const key = equalPos === -1 ? pair : pair.slice(0, equalPos);

				if (!key) {
					return acc;
				}

				const value = equalPos === -1 ? "" : pair.slice(equalPos + 1);

				const prevValue = acc.get(key);
				if (!prevValue) {
					return acc.set(key, value);
				}

				if (typeof prevValue === "string") {
					return acc.set(key, [prevValue, value]);
				}

				return acc.set(key, [...prevValue, value]);
			}, new Map()),
		});
	}

	/**
	 * Converts an {@link Query} object to a Query string.
	 *
	 * @param value - An {@link Query} object.
	 */
	public static stringify({ pairs }: Query): string {
		let result = "";

		for (const [key, value] of pairs) {
			result += `&${key}=${value}`;
		}

		return result.slice(1);
	}
}
