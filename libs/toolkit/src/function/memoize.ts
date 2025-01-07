import type { Fn } from "../types/fn.js";
import { isAsyncFunction } from "./is-async-function.js";

export interface MemoizeOptions<T extends Fn.Callable> {
	store?: {
		get(key: string): ReturnType<T> | undefined;
		set(key: string, value: ReturnType<T>): unknown;
	};
	resolver?: (...args: Parameters<T>) => string;
}

/**
 * Memoizes the provided function, caching its results based on the arguments.
 *
 * @typeParam T - The type of the function to memoize
 * @param fn - The function to memoize.
 * @param options - Optional memoization options.
 * @returns The memoized function.
 *
 * @example
 * ```ts
 * const sum = (a: number, b: number) => a + b;
 *
 * const memoizedSum = memoize(sum);
 *
 * memoizedSum(1, 2); // 3
 * memoizedSum(1, 2); // 3 (cached)
 * ```
 */
export function memoize<T extends Fn.Callable>(
	fn: T,
	options?: MemoizeOptions<T>,
): T {
	const store = options?.store ?? new Map<string, ReturnType<T>>();
	const resolver = options?.resolver ?? JSON.stringify;

	const set = (key: string, value: ReturnType<T>) => {
		store.set(key, value);
		return value;
	};

	return new Proxy(fn, {
		apply: isAsyncFunction(fn)
			? async (target, thisArg, args) => {
					const key = resolver(args);
					const cached = store.get(key);
					if (cached !== undefined) {
						return cached;
					}

					const result = await target.apply(thisArg, args);
					return set(key, result);
				}
			: (target, thisArg, args) => {
					const key = resolver(args);
					const cached = store.get(key);
					if (cached !== undefined) {
						return cached;
					}

					const result = target.apply(thisArg, args);
					return set(key, result);
				},
	});
}
