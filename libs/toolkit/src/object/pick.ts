import type { ObjectKey } from "@imhonglu/type-object";
import { is } from "../utils/is.js";
import { clonePrototype } from "./clone-prototype.js";

/**
 * Picks the specified properties from the source object.
 *
 * @typeParam T - The type of the source object
 * @typeParam K - The type of the properties to pick
 * @param source - The source object from which properties will be picked
 * @param args - The properties to pick
 * @returns A new object with the specified properties picked
 *
 * @example
 * ```ts
 * pick({ a: 1, b: 2, c: 3 }, "a", "c") // { a: 1, c: 3 }
 * ```
 */
export function pick<T, K extends ObjectKey<T>>(
	source: T,
	...args: K[]
): Pick<T, K> {
	if (!is.nonNullableObject(source)) {
		return source;
	}

	if (source instanceof Map) {
		return args.reduce(
			(acc, key) => acc.set(key, source.get(key)),
			clonePrototype(source),
		);
	}

	if (source instanceof Set) {
		return args.reduce((acc, key) => acc.add(key), clonePrototype(source));
	}

	if (Array.isArray(source)) {
		return args.reduce(
			(acc, key) => acc.push(source[key]),
			clonePrototype(source),
		);
	}

	return args.reduce((acc, key) => {
		acc[key] = source[key];
		return acc;
	}, clonePrototype(source));
}
