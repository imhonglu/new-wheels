import { type ObjectKey, keys } from "@imhonglu/type-object";
import { pick } from "./pick.js";

/**
 * Omits the specified properties from the source object.
 *
 * @typeParam T - The type of the source object
 * @typeParam K - The type of the properties to omit
 * @param source - The source object from which properties will be omitted
 * @param args - The properties to omit
 * @returns A new object with the specified properties omitted
 *
 * @example
 * ```ts
 * omit({ a: 1, b: 2, c: 3 }, "a", "c") // { b: 2 }
 * ```
 */
export function omit<T extends object, const K extends ObjectKey<T>>(
  source: T,
  ...args: K[]
): Omit<T, K> {
  const set = new Set<ObjectKey<T>>(args);

  return pick(
    source,
    ...keys(source).filter((key) => !set.has(key)),
  ) as unknown as Omit<T, K>;
}
