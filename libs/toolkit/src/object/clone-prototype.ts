/**
 * Clones the prototype of the provided object.
 *
 * This function creates a new object with the same prototype chain as the provided object.
 * The properties of the original object are not copied, and the new object has the same prototype as the original object.
 *
 * @typeParam T - The type of the object to clone the prototype from.
 * @param source - The object to clone the prototype from.
 * @returns A new object with the same prototype chain as the provided object.
 *
 * @example
 * ```ts
 * class Person {}
 * const person = new Person();
 * const cloned = clonePrototype(person); // Person {}
 * ```
 */
export function clonePrototype<T>(source: T) {
  return Object.create(Object.getPrototypeOf(source));
}
