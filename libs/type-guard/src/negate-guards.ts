import { type NegateTypeGuard, negateGuard } from "./negate-guard.js";
import type { Guards } from "./types/guards.js";

export type NegateTypeGuards<T extends Guards> = {
	[P in keyof T]: NegateTypeGuard<T[P]>;
};

/**
 * Creates negated versions of multiple type guard functions.
 *
 * @remarks
 * This function takes an object containing type guard functions and returns a new object
 * with negated versions of all the guards while maintaining proper type inference.
 *
 * @typeParam T - Record of type guard functions
 * @param guards - Object containing type guard functions to negate
 * @returns An object containing negated versions of the original guards
 *
 * @example
 * ```ts
 * const guards = {
 *   string: (value: unknown): value is string => typeof value === "string",
 *   number: (value: unknown): value is number => typeof value === "number"
 * };
 *
 * const isNot = negateGuards(guards);
 *
 * let value: number | undefined;
 *
 * if (isNot.number(value)) {
 *   value.toFixed(2); // error: Property 'toFixed' does not exist on type 'undefined'.
 * }
 * ```
 *
 * @see {@link negateGuard} - For negating a single guard
 * @see {@link NegateTypeGuards} - The type of the returned object
 */
export function negateGuards<T extends Guards>(guards: T) {
	return new Proxy({} as NegateTypeGuards<T>, {
		get(target, prop: keyof T) {
			if (!(prop in guards)) {
				return undefined;
			}
			if (!target[prop]) {
				target[prop] = negateGuard(guards[prop]);
			}
			return target[prop];
		},
	});
}
