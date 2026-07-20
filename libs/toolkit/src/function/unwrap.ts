import { UnwrapError } from "./unwrap.error.js";

/**
 * Unwraps a value and ensures it is not null or undefined.
 *
 * Inspired by rust's `unwrap` function.
 *
 * @typeParam T - The type of the value to unwrap
 * @param value - The value to unwrap
 * @param args - The message and options passed to {@link UnwrapError}
 * @returns The input value if it exists, otherwise throws an error
 * @throws - {@link UnwrapError} When the input value is null or undefined
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
  value: T,
  ...args: ConstructorParameters<typeof Error>
): NonNullable<T> {
  if (value === null || value === undefined) {
    throw new UnwrapError(...args);
  }

  return value as NonNullable<T>;
}
