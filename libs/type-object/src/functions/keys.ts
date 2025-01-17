import type { NotIterable } from "../types/not-iterable.js";

/**
 * Type utility that determines the key type for an object, array, or string.
 * Used by the {@link keys} function to provide type-safe key extraction.
 *
 * @typeParam T - The type of the object
 * @returns Union type of valid keys for the given type
 *
 * @example
 * ```ts
 * type Keys = ObjectKey<{ a: number; b: string }>; // 'a' | 'b'
 * ```
 */
export type ObjectKey<T> = T extends NotIterable
  ? never
  : // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    T extends string | Array<any>
    ? number & keyof T
    : keyof T;

/**
 * Type-safe wrapper around `Object.keys()` that enhances TypeScript's type inference.
 *
 * @typeParam T - The type of the source object
 * @param source - The object to extract keys from
 * @returns Array of typed keys
 *
 * @example
 * ```ts
 * const obj = { a: 1, b: "hello" };
 *
 * for (const key of keys(obj)) {
 *   obj[key] // key is "a" | "b"
 * }
 * ```
 *
 * @example
 * ```ts
 * const string = "hello";
 *
 * for (const key of keys(string)) {
 *   string[key] // key is number & keyof string
 * }
 * ```
 *
 * @example
 * ```ts
 * const array = [1, 2, 3];
 *
 * for (const key of keys(array)) {
 *   array[key] // key is number & keyof array
 * }
 * ```
 *
 * @see {@link ObjectKey} - Type helper for key extraction
 */
export function keys<T>(source: T): ObjectKey<T>[] {
  return (
    Array.isArray(source) || typeof source === "string"
      ? /**
         * `Object.keys` returns keys as strings for `array`, `string` types.
         * To maintain type consistency, we handle keys as numbers for these types.
         */
        Array.from({ length: source.length }, (_, i) => i)
      : Object.keys(source as object)
  ) as ObjectKey<T>[];
}
