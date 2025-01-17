import { characterSet, oneOf } from "@imhonglu/pattern-builder";
import type { SafeExecutor } from "@imhonglu/toolkit";
import { Serializable } from "../utils/serializable/serializable.js";
import { iriPchar, iriPrivate, pchar } from "./constants.js";
import { InvalidQueryError } from "./errors/invalid-query-error.js";
import type { URIParseOptions } from "./types/uri-parse-options.js";

const pattern = {
  iriQuery: oneOf(iriPrivate, iriPchar, characterSet("/?"))
    .nonCapturingGroup()
    .zeroOrMore()
    .anchor()
    .toRegExp("u"),

  query: oneOf(pchar, characterSet("/?"))
    .nonCapturingGroup()
    .zeroOrMore()
    .anchor()
    .toRegExp(),
};

/**
 * The Query formatter based on RFC 3986.
 *
 * @example
 * ```ts
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
  public readonly options?: URIParseOptions;

  public constructor({ pairs, options }: Query) {
    this.pairs = pairs;
    this.options = options;
  }

  public static safeParse: SafeExecutor<typeof Query.parse>;

  /**
   * Converts a Query string to a {@link Query} object.
   *
   * @param text - A valid Query string. e.g. "key1=value1&key2=value2&key2=value3"
   * @throws - {@link InvalidQueryError}
   */
  public static parse(text: string, options?: URIParseOptions): Query {
    const queryPattern = options?.isIri ? pattern.iriQuery : pattern.query;

    if (!queryPattern.test(text)) {
      throw new InvalidQueryError(text);
    }

    const pairs: Query["pairs"] = new Map();

    for (const pair of text.split("&")) {
      const equalPos = pair.indexOf("=");
      const key = equalPos === -1 ? pair : pair.slice(0, equalPos);

      if (!key) {
        continue;
      }

      const value = equalPos === -1 ? "" : pair.slice(equalPos + 1);
      const prevValue = pairs.get(key);

      if (!prevValue) {
        pairs.set(key, value);
        continue;
      }

      if (typeof prevValue === "string") {
        pairs.set(key, [prevValue, value]);
        continue;
      }

      pairs.set(key, [...prevValue, value]);
    }

    return new Query({
      pairs,
      options,
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
      result += value ? `&${key}=${value}` : `&${key}`;
    }

    return result.slice(1);
  }
}
