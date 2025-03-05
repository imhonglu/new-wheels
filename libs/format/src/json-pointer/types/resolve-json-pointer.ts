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
