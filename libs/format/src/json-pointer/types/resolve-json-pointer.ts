import type { PointerPaths } from "./pointer-paths.js";

export type UnescapeSegment<S extends string> =
  S extends `${infer Prefix}~1${infer Suffix}`
    ? UnescapeSegment<`${Prefix}/${Suffix}`>
    : S extends `${infer Prefix}~0${infer Suffix}`
      ? UnescapeSegment<`${Prefix}~${Suffix}`>
      : S;

export type SplitJsonPointer<S extends string> =
  S extends `${infer First}/${infer Rest}`
    ? [UnescapeSegment<First>, ...SplitJsonPointer<Rest>]
    : [UnescapeSegment<S>];

export type ResolvePointerSegments<T, P extends string[]> = P extends []
  ? T
  : P extends [infer First, ...infer Rest]
    ? First extends keyof T
      ? Rest extends string[]
        ? ResolvePointerSegments<T[First & keyof T], Rest>
        : never
      : First extends `${number}`
        ? T extends (infer U)[]
          ? Rest extends string[]
            ? ResolvePointerSegments<U, Rest>
            : never
          : never
        : never
    : never;

/**
 * Resolves the type of value at a given JSON Pointer path.
 *
 * @typeParam T - The source object type
 * @typeParam P - The JSON Pointer path type
 *
 * @example
 * ```ts
 * interface Example {
 *   items: Array<{ id: number }>;
 * }
 *
 * type T1 = ResolveJsonPointer<Example, "">; // Example
 * type T2 = ResolveJsonPointer<Example, "/items">; // Array<{ id: number }>
 * type T3 = ResolveJsonPointer<Example, "/items/0/id">; // number
 * ```
 *
 * @remarks
 * - Returns the source type for empty path ("")
 * - Returns the type at the specified path if it exists
 * - Handles array indices and nested object properties
 * - Automatically unescapes special characters in the path
 *
 * @see {@link https://datatracker.ietf.org/doc/html/rfc6901#section-4 | RFC 6901 - Evaluation}
 */
export type ResolveJsonPointer<
  T,
  // @ts-expect-error
  S extends PointerPaths<T> = "",
> = S extends ""
  ? T
  : ResolvePointerSegments<
      T,
      SplitJsonPointer<S extends `/${infer Rest}` ? Rest : S>
    >;
