import type { Fn } from "../types/fn.js";

/**
 * Checks if the given function is declared as an async function.
 * Note that this only detects functions explicitly declared with the `async` keyword,
 * not functions that return Promises.
 *
 * @param fn - Function to check
 * @returns `true` if the function was declared with the `async` keyword
 *
 * @example
 * ```ts
 * // Functions declared with async keyword
 * isAsyncFunction(async () => {}); // true
 * isAsyncFunction(async function() {}); // true
 *
 * // Functions that return Promises but aren't async
 * isAsyncFunction(() => Promise.resolve()); // false
 * isAsyncFunction(function() { return new Promise(() => {}); }); // false
 *
 * // Regular functions
 * isAsyncFunction(() => {}); // false
 * isAsyncFunction(function() {}); // false
 * ```
 */
export function isAsyncFunction(fn: Fn.Callable) {
  return Symbol.toStringTag in fn && fn[Symbol.toStringTag] === "AsyncFunction";
}
