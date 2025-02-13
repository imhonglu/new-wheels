import { type UnwrapResult, unwrapOr } from "./unwrap-or.js";

/**
 * Unwraps a value and ensures it is not null or undefined.
 *
 * Inspired by rust's `unwrap` function.
 *
 * @typeParam T - The type of the value to unwrap
 * @param maybe - The value to unwrap
 * @param error - The error to throw if input is null or undefined
 * @returns The input value if it exists, otherwise throws an error
 * @throws - When the input value is null or undefined
 *
 * @example
 * ```ts
 * function fetchUser(): Promise<User | null> { ... }
 *
 * const user = await fetchUser(); // Promise<User | null>
 * const safeUser = unwrap(user); // User
 * const name = unwrap(safeUser.name); // string
 * ```
 *
 * @example
 * ```ts
 * const details = unwrap(
 *   document.querySelector("details"),
 * ); // HTMLDetailsElement
 * ```
 */
export function unwrap<T>(
  maybe: T,
  error: string | Error = "Cannot unwrap null or undefined value",
): UnwrapResult<T, Error> {
  return unwrapOr(maybe, error instanceof Error ? error : new Error(error));
}
