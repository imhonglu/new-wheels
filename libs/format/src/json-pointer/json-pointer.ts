import { characterSet, concat, oneOf } from "@imhonglu/pattern-builder";
import type { SafeExecutor } from "@imhonglu/toolkit";
import { Serializable } from "../utils/serializable/serializable.js";
import { InvalidJsonPointerError } from "./errors/invalid-json-pointer-error.js";
import type { Escape } from "./types/escape.js";
import type { PointerPaths } from "./types/pointer-paths.js";
import type { ResolveJsonPointer } from "./types/resolve-json-pointer.js";
import type { Unescape } from "./types/unescape.js";

const unescaped = characterSet(
  "\\u{00}-\\u{2E}",
  "\\u{30}-\\u{7D}",
  "\\u{7F}-\\u{10FFFF}",
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
 * JsonPointer.parse("/foo/~1bar");
 * // => { segments: ["foo", "/bar"] }
 * ```
 *
 * @example
 * ```typescript
 * JsonPointer.parse("/foo/bar~1baz");
 * // => { segments: ["foo", "bar/baz"] }
 * ```
 *
 * @example
 * ```typescript
 * JsonPointer.escape("bar/baz");
 * // => "bar~1baz"
 * ```
 *
 * @example
 * ```typescript
 * JsonPointer.unescape("bar~1baz");
 * // => "bar/baz"
 * ```
 *
 * @see {@link https://datatracker.ietf.org/doc/html/rfc6901 | RFC 6901}
 */
@Serializable
export class JsonPointer {
  public segments: string[];

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
   * Retrieves a value from an object using a JSON Pointer.
   *
   * @typeParam T - The type of the source object
   * @typeParam P - The type of valid pointer paths for the object
   * @param object - The source object to get value from
   * @param pointer - JSON Pointer string (e.g., "/path/to/value")
   * @returns The value at the specified path or undefined if path doesn't exist
   *
   * @example
   * ```typescript
   * const obj = { foo: { bar: [1, 2, 3] } };
   * JsonPointer.get(obj, "/foo/bar/0"); // returns 1
   * JsonPointer.get(obj, "/foo/bar"); // returns [1, 2, 3]
   * JsonPointer.get(obj, ""); // returns the entire object
   * ```
   *
   * @see {@link https://datatracker.ietf.org/doc/html/rfc6901#section-4 | RFC 6901 - Evaluation}
   */
  public static get<T extends object, P extends PointerPaths<T>>(
    object: T,
    pointer: P = "" as P,
  ): ResolveJsonPointer<T, P> {
    if (pointer === "") {
      return object as ResolveJsonPointer<T, P>;
    }

    return pointer
      .split("/")
      .slice(1)
      .map((token) => JsonPointer.unescape(token))
      .reduce<unknown>(
        (acc, token) =>
          typeof acc === "object" && acc !== null
            ? (acc as Record<string, unknown>)[token]
            : undefined,
        object,
      ) as ResolveJsonPointer<T, P>;
  }

  /**
   * Unescapes a JSON Pointer token.
   *
   * @typeParam T - The type of the input string
   * @param text - The JSON Pointer string to unescape
   * @returns The unescaped JSON Pointer string
   *
   * @example
   * ```typescript
   * JsonPointer.unescape("foo~1bar"); // returns "foo/bar"
   * JsonPointer.unescape("foo~0bar"); // returns "foo~bar"
   * ```
   *
   * @see {@link https://datatracker.ietf.org/doc/html/rfc6901#section-3 | RFC 6901 - Syntax}
   */
  public static unescape<T extends string>(text: T): Unescape<T> {
    return text.replace(/~[01]/g, (match) => {
      switch (match) {
        case "~0":
          return "~";
        case "~1":
          return "/";
        default:
          return match;
      }
    }) as Unescape<T>;
  }

  /**
   * Escapes a string for use as a JSON Pointer token.
   *
   * @typeParam T - The type of the input string
   * @param text - The string to escape as a JSON Pointer token
   * @returns The escaped JSON Pointer string
   *
   * @example
   * ```typescript
   * JsonPointer.escape("foo/bar"); // returns "foo~1bar"
   * JsonPointer.escape("foo~bar"); // returns "foo~0bar"
   * ```
   *
   * @see {@link https://datatracker.ietf.org/doc/html/rfc6901#section-3 | RFC 6901 - Syntax}
   */
  public static escape<T extends string>(text: T): Escape<T> {
    return text.replace(/[~\/]/g, (match) => {
      switch (match) {
        case "~":
          return "~0";
        case "/":
          return "~1";
        default:
          return match;
      }
    }) as Escape<T>;
  }
}
