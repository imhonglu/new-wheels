import type { Primitive } from "./primitive.js";

/**
 * Represents a union of a literal type and a base type.
 *
 * @typeParam LiteralType - The literal type to include in the union
 * @typeParam BaseType - The base type to include in the union
 *
 * @example
 * ```ts
 * type A = LiteralUnion<"a" | "b", string>; // "a" | "b" | string
 * ```
 *
 * @see {@link https://github.com/microsoft/TypeScript/issues/29729 | Literal Union}
 */
export type LiteralUnion<
	LiteralType,
	BaseType extends Primitive.Type = string,
> = LiteralType | (BaseType & Record<never, never>);
