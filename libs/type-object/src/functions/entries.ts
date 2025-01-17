import type { NotIterable } from "../types/not-iterable.js";

/**
 * Type utility that represents an entry of an object as a tuple of key and value.
 * Used by the {@link entries} function to provide type-safe entry extraction.
 *
 * @typeParam T - The type of the source object
 * @returns An entry tuple with the same key and value as the source object
 *
 * @example
 * ```ts
 * type Entry = ObjectEntry<{ a: number; b: string }>; // ['a', number] | ['b', string]
 * ```
 */
export type ObjectEntry<T> = T extends NotIterable
  ? never
  : {
      [K in keyof T]: [K, T[K]];
    }[keyof T];

/**
 * Type-safe wrapper around `Object.entries()` that enhances TypeScript's type inference.
 *
 * @typeParam T - The type of the source object
 * @param source - The object to extract entries from
 * @returns Array of typed [key, value] tuples
 *
 * @example
 * ```ts
 * const obj = { a: 1, b: "hello" };
 * const result = entries(obj); // [["a", number], ["b", string]]
 *
 * // Works with arrays too
 * const arr = [1, 2, 3];
 * entries(arr); // [[0, number], [1, number], [2, number]]
 * ```
 */
export function entries<const T extends object>(source: T) {
  return Object.entries(source).map(
    ([key, value]) => [key, value] as ObjectEntry<T>,
  );
}
