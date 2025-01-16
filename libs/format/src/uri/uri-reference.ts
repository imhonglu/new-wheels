import type { SafeExecutor } from "@imhonglu/toolkit";
import { Serializable } from "../utils/serializable/serializable.js";
import { Authority } from "./authority.js";
import type { InvalidAuthorityError } from "./errors/invalid-authority-error.js";
import type { InvalidFragmentError } from "./errors/invalid-fragment-error.js";
import type { InvalidPathError } from "./errors/invalid-path-error.js";
import type { InvalidQueryError } from "./errors/invalid-query-error.js";
import type { InvalidSchemeError } from "./errors/invalid-scheme-error.js";
import { InvalidURIError } from "./errors/invalid-uri-error.js";
import { Fragment } from "./fragment.js";
import { Path } from "./path.js";
import { Query } from "./query.js";
import { Scheme } from "./scheme.js";
import type { URIParseOptions } from "./types/uri-parse-options.js";
import { parseURIComponents } from "./utils/parse-uri-components.js";

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
  public readonly scheme?: Scheme;
  public readonly authority?: Authority;
  public readonly path?: Path;
  public readonly query?: Query;
  public readonly fragment?: Fragment;
  public readonly options?: URIParseOptions;

  public constructor({
    scheme,
    authority,
    path,
    query,
    fragment,
    options,
  }: URIReference) {
    this.scheme = scheme;
    this.authority = authority;
    this.path = path;
    this.query = query;
    this.fragment = fragment;
    this.options = options;
  }

  public static safeParse: SafeExecutor<typeof URIReference.parse>;

  /**
   * Converts a URIReference string to a {@link URIReference} object.
   *
   * @param text - A valid URIReference string. e.g. "//example.com/path?query#fragment"
   * @throws
   * - {@link InvalidURIError}
   * - {@link InvalidSchemeError}
   * - {@link InvalidAuthorityError}
   * - {@link InvalidPathError}
   * - {@link InvalidQueryError}
   * - {@link InvalidFragmentError}
   */
  public static parse(text: string, options?: URIParseOptions): URIReference {
    const components = parseURIComponents(text);

    if (!components) {
      throw new InvalidURIError(text);
    }

    const { scheme, authority, path, query, fragment } = components;

    return new URIReference({
      scheme: scheme ? Scheme.parse(scheme) : undefined,
      authority: authority ? Authority.parse(authority, options) : undefined,
      path: path ? Path.parse(path, options) : undefined,
      query: query ? Query.parse(query, options) : undefined,
      fragment: fragment ? Fragment.parse(fragment, options) : undefined,
      options,
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
    if (value.path) result += value.path.toString();
    if (value.query) result += `?${value.query}`;
    if (value.fragment) result += `#${value.fragment}`;

    return result;
  }
}
