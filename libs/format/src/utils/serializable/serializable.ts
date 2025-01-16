import {
  type Fn,
  type SafeResult,
  createSafeExecutor,
} from "@imhonglu/toolkit";

/**
 * A decorator that makes a class serializable by implementing toString() and toJSON() methods.
 * The target class must implement static `parse`, `safeParse`, and `stringify` methods.
 *
 * @typeParam T - The type of the class being decorated. Must extend Newable and include `parse`, `safeParse`, and `stringify` methods
 * @param targetClass - The class to make serializable
 * @returns A proxy of the decorated class with `toString()`, `toJSON()` instance methods and `safeParse` static method
 *
 * @remarks
 * The decorated class must implement:
 * - static parse(value: string): Instance - Converts a string to class instance
 * - static safeParse(value: string): SafeResult<Instance> - Converts a string to class instance with error handling
 * - static stringify(value: Instance): string - Converts class instance to string
 *
 * ** Note: **
 * The `safeParse` method is automatically created by the decorator.
 *
 * The decorator automatically:
 * - Adds toString() and toJSON() instance methods that use the stringify implementation
 * - Creates a safeParse static method that wraps the parse method with error handling
 *
 * @example
 * ```ts
 * @Serializable
 * class Example {
 *   constructor(public readonly text: string) {}
 *
 *   static parse(value: string): Example {
 *     return new Example(value);
 *   }
 *
 *   static stringify(value: Example): string {
 *     return value.text;
 *   }
 * }
 *
 * const example = Example.parse("example");
 * example.toString(); // "example"
 * JSON.stringify(example); // "example"
 *
 * const result = Example.safeParse("example"); // { success: true, data: Example }
 * if (result.success) {
 *   result.data.toString(); // "example"
 * } else {
 *   result.error; // Error
 * }
 * ```
 *
 * @see {@link https://imhonglu.github.io/toolkit/docs/utils/create-safe-executor/create-safe-executor.html | createSafeExecutor}
 */
export function Serializable<
  T extends Fn.Newable & {
    parse: Fn.Callable<{ return: InstanceType<T> }>;
    safeParse: Fn.Callable<{ return: SafeResult<InstanceType<T>> }>;
    stringify: Fn.Callable<{ args: [InstanceType<T>]; return: string }>;
  },
>(targetClass: T) {
  const serialize = function (this: InstanceType<T>) {
    return targetClass.stringify(this);
  };

  Object.defineProperties(targetClass.prototype, {
    toString: { value: serialize },
    toJSON: { value: serialize },
  });

  const safeParse = createSafeExecutor(targetClass.parse);

  return new Proxy(targetClass, {
    get: (target, prop) =>
      prop === "safeParse" ? safeParse : target[prop as keyof T],
  });
}
