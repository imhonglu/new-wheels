/**
 * Extracts the element type from an array type using type inference.
 *
 * @typeParam T - The array type to extract the element type from
 * @returns A union type of all possible element types in the array
 *
 * @example
 * ```ts
 * type Numbers = ArrayElement<number[]>; // number
 * type Mixed = ArrayElement<[string, number, boolean]>; // string | number | boolean
 * type Empty = ArrayElement<[]>; // never
 * ```
 *
 * @remarks
 * This type utility uses TypeScript's `infer` keyword to extract the element type
 * from any array-like type. It works with both regular arrays and tuples.
 */
export type ArrayElement<T> = T extends Array<infer U> ? U : never;
