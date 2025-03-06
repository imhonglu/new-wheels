import type { SafeExecutor } from "@imhonglu/toolkit";
import { Serializable } from "../utils/serializable/serializable.js";
import { InvalidURIError } from "./errors/invalid-uri-error.js";
import type { Scheme } from "./scheme.js";
import type { URIParseOptions } from "./types/uri-parse-options.js";
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
 * @example
 * ```ts
 * URI.parse("http://한국.com/path?query#fragment");
 * // {
 * //   scheme: "http",
 * //   authority: {
 * //     host: "xn--3e0b707e.com",
 * //     ... // same as Authority
 * //   },
 * //   ... // same as URIReference
 * // }
 * ```
 *
 * @example
 * ```ts
 * URI.parse("http://한국.com/경로?쿼리#프래그먼트", { isIri: true });
 * // {
 * //   scheme: "http",
 * //   authority: {
 * //     host: "한국.com",
 * //     ... // same as Authority
 * //   },
 * //   ... // same as URIReference
 * // }
 * ```
 *
 * @see {@link https://datatracker.ietf.org/doc/html/rfc3986#section-3.1 | RFC 3986#section-3.1}
 */
@Serializable
export class URI extends URIReference {
  public scheme: Scheme;

  public constructor(reference: URI) {
    super(reference);
    this.scheme = reference.scheme;
  }

  public static safeParse: SafeExecutor<typeof URI.parse>;

  /**
   * Converts a URI string to a {@link URI} object.
   *
   * @param text - A valid URI string. e.g. "https://example.com/path?query#fragment"
   * @throws
   * - {@link InvalidURIError}
   * - {@link InvalidSchemeError}
   * - {@link InvalidAuthorityError}
   * - {@link InvalidPathError}
   * - {@link InvalidQueryError}
   * - {@link InvalidFragmentError}
   */
  public static parse(text: string, options?: URIParseOptions): URI {
    const reference = URIReference.parse(text, options);

    if (!reference.scheme) {
      throw new InvalidURIError(text);
    }

    return new URI(reference as URI);
  }

  /**
   * Converts an {@link URI} object to a URI string.
   *
   * @param value - An {@link URI} object.
   */
  public static stringify(value: URI) {
    return URIReference.stringify(value);
  }
}
