/**
 * Converts JSON Pointer escape sequences back to their original characters.
 * According to RFC 6901:
 * - "~0" is decoded as "~"
 * - "~1" is decoded as "/"
 *
 * @example
 * type T1 = Unescape<"a~1b">; // "a/b"
 * type T2 = Unescape<"a~0b">; // "a~b"
 * type T3 = Unescape<"~0~1test">; // "~/test"
 */
export type Unescape<S extends string> =
  S extends `${infer Prefix}~${infer Suffix}`
    ? Suffix extends `0${infer Rest}`
      ? `${Prefix}~${Unescape<Rest>}`
      : Suffix extends `1${infer Rest}`
        ? `${Prefix}/${Unescape<Rest>}`
        : `${Prefix}~${Unescape<Suffix>}`
    : S;
