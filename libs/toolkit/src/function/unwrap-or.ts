export type UnwrapResult<T, F> = F extends Error
  ? NonNullable<T>
  : NonNullable<T> | F;

/**
 * Unwraps a value and ensures it is not null or undefined.
 *
 * Inspired by rust's `unwrap_or` function.
 *
 * @typeParam T - The type of the value to unwrap
 * @typeParam F - The type of the fallback value
 * @param maybe - The value to unwrap
 * @param fallback - The default value to return if input is null or undefined
 * @returns The input value if it exists, otherwise the default value
 *
 * @example
 * ```ts
 * function fetchUser(): Promise<User | null> { ... }
 *
 * const user = await fetchUser(); // Promise<User | null>
 * const name = unwrapOr(user.name, "Unknown"); // string
 * ```
 *
 * @example
 * ```ts
 * const details = unwrapOr(
 *   document.querySelector("details"),
 *   new Error("Element not found")
 * ); // HTMLDetailsElement
 * ```
 */
export function unwrapOr<T, F>(maybe: T, fallback: F): UnwrapResult<T, F> {
  if (maybe === null || maybe === undefined) {
    if (fallback instanceof Error) {
      throw fallback;
    }
    return fallback as UnwrapResult<T, F>;
  }
  return maybe as UnwrapResult<T, F>;
}
