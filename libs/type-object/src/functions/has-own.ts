/**
 * Type utility that represents an object type with a guaranteed property.
 * Used by the {@link hasOwn} function to provide type-safe property existence checks.
 *
 * @typeParam T - The source object type
 * @typeParam K - The property key type to check
 * @returns An object type with the specified property
 *
 * @example
 * ```ts
 * interface User { name?: string }
 * type UserWithName = ObjectHasOwn<User, 'name'>; // User & { name: string | undefined }
 *
 * type UnknownObj = ObjectHasOwn<unknown, 'id'>; // unknown & { id: unknown }
 * ```
 */
export type ObjectHasOwn<T, K> = T & {
	[P in Extract<K, PropertyKey>]: P extends keyof T ? T[P] : unknown;
};

/**
 * Type-safe wrapper around `Object.hasOwn()` that enhances TypeScript's type inference.
 *
 * @typeParam T - The source object type
 * @typeParam K - The property key type to check (must be PropertyKey)
 * @param source - The object to check
 * @param key - The property key to verify
 * @returns `true` if the property exists on the object, with type narrowing
 *
 * @example
 * ```ts
 * const data: unknown = { name: 'John', age: 30 };
 *
 * if (hasOwn(data, 'name')) {
 *   data.name; // TypeScript knows this is safe
 *   // data is narrowed to: unknown & { name: unknown }
 * }
 *
 * interface User { name?: string }
 * const user: User = {};
 *
 * if (hasOwn(user, 'name')) {
 *   user.name; // TypeScript knows name exists
 *   // user is narrowed to: User & { name: string | undefined }
 * }
 * ```
 */
export function hasOwn<T, const K extends PropertyKey>(
	source: T,
	key: K,
): source is ObjectHasOwn<T, K> {
	return Object.hasOwn(source as object, key);
}
