import type { Fn } from "../types/fn.js";
import { isAsyncFunction } from "./is-async-function.js";

/**
 * Represents a successful execution result with a data payload.
 *
 * @typeParam T - The type of the data payload
 */
export interface SuccessResult<T = unknown> {
  ok: true;
  data: T;
}

/**
 * Represents a failed execution result with an error payload.
 *
 * @typeParam E - The type of the error payload
 */
export interface FailureResult<E = unknown> {
  ok: false;
  error: E;
}

/**
 * Represents the result of a safe execution, either successful or failed.
 *
 * @typeParam T - The type of the data payload
 * @typeParam E - The type of the error payload
 */
export type SafeResult<T, E = unknown> = SuccessResult<T> | FailureResult<E>;

/**
 * Represents the result of a safe execution, either successful or failed.
 *
 * @typeParam T - The type of the data payload
 * @typeParam E - The type of the error payload
 */
export type SafeExecutorResult<T, E = unknown> = T extends Promise<infer U>
  ? Promise<SafeResult<U, E>>
  : SafeResult<T, E>;

/**
 * Represents a safe executor function that wraps the provided function.
 *
 * @typeParam T - The type of the function to be executed
 * @typeParam E - The type of the error payload
 */
export type SafeExecutor<T extends Fn.Callable, E = unknown> = (
  ...args: Parameters<T>
) => SafeExecutorResult<ReturnType<T>, E>;

/**
 * Creates a safe executor function that wraps the provided function.
 * The returned function will execute the provided function and return a result
 * indicating whether the execution was successful or if an error occurred.
 *
 * @param fn - The function to be executed safely.
 * @returns A function that executes the provided function safely.
 *
 * @example
 * ```ts
 * const safeParse = createSafeExecutor(JSON.parse);
 *
 * safeParse('{ "key": "value" }'); // { ok: true, data: { key: "value" } }
 * safeParse('invalid json'); // { ok: false, error: SyntaxError }
 * ```
 */
export function createSafeExecutor<T extends Fn.Callable, E = unknown>(fn: T) {
  return new Proxy(fn, {
    apply: isAsyncFunction(fn)
      ? async (target, thisArg, args) => {
          try {
            return {
              ok: true,
              data: await target.apply(thisArg, args),
            };
          } catch (error) {
            return {
              ok: false,
              error,
            };
          }
        }
      : (target, thisArg, args) => {
          try {
            return {
              ok: true,
              data: target.apply(thisArg, args),
            };
          } catch (error) {
            return {
              ok: false,
              error,
            };
          }
        },
  }) as SafeExecutor<T, E>;
}
