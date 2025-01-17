/**
 * Type utility that represents an object type created from an array of key-value pairs.
 * Used by the {@link fromEntries} function to provide type-safe object creation from entries.
 *
 * @typeParam T - The type of the source array
 * @returns An object type with the same keys and values as the source array
 *
 * @example
 * ```ts
 * type Entries = [['a', 1], ['b', 2]] as const;
 * type Result = ObjectFromEntries<Entries>; // { a: 1, b: 2 }
 * ```
 */
export type ObjectFromEntries<T> = T extends [unknown, unknown][]
  ? {
      [K in Extract<T[number][0], PropertyKey>]: Extract<
        T[number],
        [K, unknown]
      >[1];
    }
  : never;

/**
 * Type-safe wrapper around `Object.fromEntries()` that enhances TypeScript's type inference.
 *
 * @typeParam K - The key type (extends PropertyKey)
 * @typeParam V - The value type
 * @param entries - Array of [key, value] tuples
 * @returns Strongly-typed object created from entries
 *
 * @example
 * ```ts
 * const entries = [["name", "John"], ["age", 30]] as const;
 * const obj = fromEntries(entries); // { name: string; age: number }
 *
 * // With explicit typing
 * interface User {
 *   name: string;
 *   age: number;
 * }
 * const typedObj = fromEntries<keyof User, User[keyof User]>(entries);
 * ```
 */
export function fromEntries<const T extends [unknown, unknown][]>(source: T) {
  return Object.fromEntries(source) as ObjectFromEntries<T>;
}
