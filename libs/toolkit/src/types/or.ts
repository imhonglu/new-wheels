/**
 * Utility type that handles optional types and provides default values.
 * If T is undefined or null, returns the default type D.
 *
 * @typeParam T - The source type that might be undefined/null
 * @typeParam D - The default type to use when T is undefined/null
 *
 * @example
 * ```ts
 * type User = {
 *   name?: string;
 * }
 *
 * // Without Or type
 * type Name = User["name"]; // string | undefined
 *
 * // With Or type
 * type NameWithDefault = Or<User["name"], string>; // string
 * ```
 */
export type Or<T, D> = T extends NonNullable<T> ? T : NonNullable<D>;

/**
 * Shorthand for Or\<T, any\>. Uses 'any' as the default type.
 * Useful when you want to ensure a non-undefined value but don't care about the type.
 *
 * @typeParam T - The source type that might be undefined/null
 */
export type OrAny<T> =
  // biome-ignore lint/suspicious/noExplicitAny: Intentionally using any as fallback
  Or<T, any>;
