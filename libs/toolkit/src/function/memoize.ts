import type { Fn } from "../types/fn.js";

/** Configures how {@link memoize} creates keys and stores return values. */
export interface MemoizeOptions<T extends Fn.Callable> {
  /**
   * Stores return values by cache key.
   *
   * Returning `undefined` from a custom store signals a cache miss. The
   * built-in store can distinguish and cache an actual `undefined` return
   * value.
   */
  store?: {
    get(key: string): ReturnType<T> | undefined;
    set(key: string, value: ReturnType<T>): unknown;
  };

  /**
   * Creates a cache key from the function's positional arguments.
   * Defaults to `JSON.stringify(args)`.
   */
  resolver?: (...args: Parameters<T>) => string;
}

/**
 * Memoizes the provided function, caching its results based on the arguments.
 * The exact return value is cached before it is returned, so calls with the
 * same key share a pending or rejected `Promise`. Synchronously thrown errors
 * are not cached.
 *
 * @remarks
 * The default resolver serializes the argument array with `JSON.stringify`.
 * Supply a resolver when arguments are not JSON-serializable or when JSON
 * serialization does not provide the required key semantics. The default
 * store retains cached values for the lifetime of the memoized function.
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
  const defaultStore = new Map<string, ReturnType<T>>();
  const store = options?.store ?? defaultStore;
  const resolver =
    options?.resolver ??
    ((...args: Parameters<T>): string => JSON.stringify(args));

  return new Proxy(fn, {
    apply(target, thisArg, args) {
      const key = resolver(...(args as Parameters<T>));
      const cached = store.get(key);

      if (
        cached !== undefined ||
        (store === defaultStore && defaultStore.has(key))
      ) {
        return cached;
      }

      const result = Reflect.apply(target, thisArg, args) as ReturnType<T>;
      store.set(key, result);
      return result;
    },
  });
}
