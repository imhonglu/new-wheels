import type { Guard } from "./types/guard.js";

export type InferTypeGuard<T> = T extends Guard<infer R> ? R : never;

export type NegateTypeGuard<Guard> = <T>(
  value: T | InferTypeGuard<Guard>,
) => value is T;

/**
 * Creates a negated version of a type guard function.
 *
 * @remarks
 * This function returns a new guard function that returns the opposite boolean result
 * of the original guard function while maintaining proper type inference.
 *
 * @typeParam T - The type of the original guard function
 * @param guard - The original type guard function to negate
 * @returns A new guard function that negates the original guard's result
 *
 * @example
 * ```ts
 * const isNumber = (value: unknown): value is number => typeof value === "number";
 * const isNotNumber = negateGuard(isNumber);
 *
 * let value: number | undefined;
 *
 * if (isNotNumber(value)) {
 *   value.toFixed(2); // error: Property 'toFixed' does not exist on type 'undefined'.
 * }
 * ```
 *
 * @see {@link NegateTypeGuard} - The type of the returned function
 */
export function negateGuard<T extends Guard>(guard: T) {
  return new Proxy(guard, {
    apply(target, thisArg, args: Parameters<T>) {
      return !target.apply(thisArg, args);
    },
  }) as NegateTypeGuard<T>;
}
