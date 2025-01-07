import type { OrAny } from "./or.js";

/**
 * Utility types for function definitions and callable/newable interfaces
 */
export namespace Fn {
	/**
	 * Base interface for function definitions
	 */
	export interface Definition {
		args?: unknown[];
		return?: unknown;
	}

	/**
	 * Interface for callable functions with generic type support
	 *
	 * @typeParam T - Extends Definition interface
	 *
	 * @example
	 * ```ts
	 * type A = Callable<{ args: [number, string]; return: boolean }>;
	 * // (number, string) => boolean
	 *
	 * type B = Callable<{ args: [number, string]; }>;
	 * // (number, string) => any;
	 *
	 * type C = Callable<{ return: string }>;
	 * // (...args: any[]) => string;
	 * ```
	 */
	export interface Callable<T extends Definition = Definition>
		extends CallableFunction {
		(...args: OrAny<T["args"]>): OrAny<T["return"]>;
	}

	/**
	 * Interface for constructable (newable) functions with generic type support
	 *
	 * @typeParam T - Extends Definition interface
	 *
	 * @example
	 * ```ts
	 * type A = Newable<{ args: [number, string]; return: boolean }>;
	 * // new (number, string) => boolean
	 *
	 * type B = Newable<{ args: [number, string]; }>;
	 * // new (number, string) => any;
	 *
	 * type C = Newable<{ return: string }>;
	 * // new (...args: any[]) => string;
	 * ```
	 */
	export interface Newable<T extends Definition = Definition>
		extends NewableFunction {
		new (...args: OrAny<T["args"]>): OrAny<T["return"]>;
	}
}
