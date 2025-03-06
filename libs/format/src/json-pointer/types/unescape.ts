/**
 * Mapping for JSON Pointer unescape sequences.
 * Defines the reverse transformation rules for escape sequences.
 */
export interface UnescapeMapping {
  "0": "~";
  "1": "/";
}

/**
 * Type that converts JSON Pointer escape sequences back to their original characters.
 * According to RFC 6901, the following transformations are applied:
 * - "~0" is decoded as "~"
 * - "~1" is decoded as "/"
 *
 * @typeParam S - The input string type to be unescaped
 *
 * @example
 * ```ts
 * type T1 = Unescape<"a~1b">; // "a/b"
 * type T2 = Unescape<"a~0b">; // "a~b"
 * type T3 = Unescape<"~0~1test">; // "~/test"
 * ```
 *
 * @see {@link https://datatracker.ietf.org/doc/html/rfc6901#section-3 | RFC 6901 - Syntax}
 */
export type Unescape<S extends string> =
  S extends `${infer Prefix}~${infer Suffix}`
    ? Suffix extends `${infer First}${infer Rest}`
      ? First extends keyof UnescapeMapping
        ? `${Prefix}${UnescapeMapping[First]}${Unescape<Rest>}`
        : `${Prefix}~${First}${Unescape<Rest>}`
      : `${Prefix}~`
    : S;
