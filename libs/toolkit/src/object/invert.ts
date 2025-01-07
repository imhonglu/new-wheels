import type { Mutable } from "../types/mutable.js";
import { is } from "../utils/is.js";
import { clonePrototype } from "./clone-prototype.js";

/**
 * Type utility that represents the inverted object.
 * Used by the {@link invert} function to provide type-safe inversion.
 *
 * @typeParam T - The type of the source object
 * @returns The inverted object
 *
 * @example
 * ```ts
 * type InvertObject<{ a: 1, b: 2, c: 3 }> = { 1: "a", 2: "b", 3: "c" }
 * ```
 */
export type InvertObject<T> = {
	[P in keyof T as T[P] & PropertyKey]: P;
};

/**
 * Inverts the keys and values of the provided object.
 * Values must be valid property keys (string, number, or symbol).
 * If a value is not a valid property key, it will be skipped.
 *
 * @typeParam T - The type of the source object
 * @param source - The object whose keys and values should be inverted
 * @returns A new object where the original values are keys and original keys are values
 *
 * @example
 * ```ts
 * invert({ a: 1, b: 2, c: 3 }) // { 1: "a", 2: "b", 3: "c" }
 * invert({ x: "foo", y: "bar" }) // { foo: "x", bar: "y" }
 * invert({ a: 1, b: null }) // { 1: "a" } // null is not a valid property key
 * ```
 */
export function invert<const T extends object>(source: T) {
	return Object.entries(source).reduce((acc, [key, value]) => {
		if (is.propertyKey(value)) {
			acc[value] = key;
		}
		return acc;
	}, clonePrototype(source)) as Mutable<InvertObject<T>>;
}
