import { type NegateTypeGuards, negateGuards } from "./negate-guards.js";
import type { Guards } from "./types/guards.js";

export type ComposeTypeGuards<T extends Guards> = {
  [P in keyof T]: T[P];
} & {
  not: NegateTypeGuards<T>;
};

/**
 * Creates a composite type guard from multiple guard functions.
 *
 * {@label composeGuards}
 * @public
 * @remarks
 * This function combines multiple type guards into a single object with methods for type checking.
 * Each guard function is accessible as a method, and negated versions are available under the 'not' property.
 *
 * @typeParam T - Record of type guard functions
 * @param guards - Object containing type guard functions
 * @returns An object containing the original guards and their negated versions
 *
 * @example
 * ```ts
 * const is = composeGuards({
 *   string: (value: unknown): value is string => typeof value === "string",
 *   number: (value: unknown): value is number => typeof value === "number"
 * });
 * // {
 * //   string: [Function],
 * //   number: [Function]
 * //   not: {
 * //     string: [Function],
 * //     number: [Function]
 * //   }
 * // }
 *
 * is.string("hello"); // true
 * is.not.string(42);  // true
 *
 * let value: string | number | undefined;
 *
 * if (is.number(value)) {
 *   value.toFixed(2); // 'value' is number
 * }
 *
 * if (is.not.number(value)) {
 *   value.toFixed(2); // error: Property 'toFixed' does not exist on type 'undefined'.
 * }
 * ```
 *
 * @see {@link ComposeTypeGuards} - The type of the returned object
 */
export function composeGuards<T extends Guards>(guards: T) {
  const not = negateGuards(guards);

  return new Proxy(guards, {
    get(target, prop) {
      if (prop === "not") return not;
      return prop in target ? target[prop] : undefined;
    },
  }) as ComposeTypeGuards<T>;
}
