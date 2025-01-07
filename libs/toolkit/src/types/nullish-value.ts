/**
 * Represents a nullish value in TypeScript.
 *
 * A nullish value is either `null` or `undefined`. This type is commonly used
 * when working with the nullish coalescing operator (??) or optional chaining (?.).
 *
 * @example
 * ```typescript
 * function processValue(value: string | NullishValue) {
 *   return value ?? 'default';
 * }
 * ```
 *
 * @see {@link https://developer.mozilla.org/ko/docs/Glossary/Nullish | MDN Nullish Documentation}
 */
export type NullishValue = null | undefined;
