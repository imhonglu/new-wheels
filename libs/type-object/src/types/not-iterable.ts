/**
 * Type utility that represents types that cannot be iterated over in `Object.keys`.
 * Used to exclude specific types from iteration operations.
 *
 * @example
 * ```ts
 * type NonIterableValue = NotIterable;
 * // null | undefined | number | boolean | symbol | Map<unknown, unknown> | Set<unknown>
 *
 * function processValue(value: NotIterable) {
 *   // Handle non-iterable values
 * }
 * ```
 *
 * @see {@link https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object/keys | MDN Object.keys}
 */
export type NotIterable =
	| null
	| undefined
	| Map<unknown, unknown>
	| Set<unknown>
	| number
	| symbol
	| boolean;
