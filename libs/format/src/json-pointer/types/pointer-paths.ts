import type { Escape } from "./escape.js";

/**
 * Generates all possible JSON Pointer paths for a given type.
 * Supports nested objects, arrays, and special characters in property names.
 *
 * @typeParam T - The type to generate paths for
 *
 * @example
 * ```ts
 * interface Example {
 *   items: Array<{ id: number }>;
 *   meta: { count: number };
 * }
 *
 * type Paths = PointerPaths<Example>;
 * // "" | "/items" | "/items/0" | "/items/0/id" | "/meta" | "/meta/count"
 * ```
 *
 * @remarks
 * - Empty string ("") represents the root object
 * - Array indices are represented as numbers
 * - Special characters ("~" and "/") in property names are automatically escaped
 *
 * @see {@link https://datatracker.ietf.org/doc/html/rfc6901#section-3 | RFC 6901 - Syntax}
 * @see {@link https://datatracker.ietf.org/doc/html/rfc6901#section-4 | RFC 6901 - Evaluation}
 */
export type PointerPaths<T> = T extends Array<infer U>
  ? "" | `/${number}` | `/${number}${PointerPaths<U>}`
  : T extends object
    ?
        | ""
        | {
            [K in keyof T]: K extends string
              ? `/${Escape<K>}${PointerPaths<T[K]>}`
              : never;
          }[keyof T]
    : "";
