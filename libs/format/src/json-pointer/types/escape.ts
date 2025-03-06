/**
 * Mapping for JSON Pointer escape sequences.
 * Defines the transformation rules for special characters.
 */
export interface EscapeMapping {
  "~": "~0";
  "/": "~1";
}

/**
 * Type that converts special characters in a string to JSON Pointer escape sequences.
 * According to RFC 6901, the following transformations are applied
 *
 * - "\~" is encoded as "\~0"
 * - "\/" is encoded as "\~1"
 *
 * @typeParam S - The input string type to be escaped
 *
 * @example
 * ```ts
 * type T1 = Escape<"a/b">; // "a~1b"
 * type T2 = Escape<"a~b">; // "a~0b"
 * type T3 = Escape<"~/test">; // "~0~1test"
 * ```
 *
 * @see {@link https://datatracker.ietf.org/doc/html/rfc6901#section-3 | RFC 6901 - Syntax}
 */
export type Escape<S extends string> = S extends `${infer First}${infer Rest}`
  ? First extends keyof EscapeMapping
    ? `${EscapeMapping[First]}${Escape<Rest>}`
    : `${First}${Escape<Rest>}`
  : S;
