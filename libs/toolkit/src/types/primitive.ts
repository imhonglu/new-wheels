import type { Fn } from "./fn.js";
import type { Mutable } from "./mutable.js";

/**
 * A collection of utility types for handling primitive types that are returned using the `typeof` operator in ECMAScript.
 */
export namespace Primitive {
	/**
	 * An interface for mapping the results of the `typeof` operator to their corresponding types.
	 * This map allows easy conversion from `typeof` operator results to actual types.
	 *
	 * @example
	 * ```ts
	 * const text = 'string';
	 * type Text = Primitive.Map[typeof text]; // string
	 * ```
	 */
	export interface Map {
		bigint: bigint;
		boolean: boolean;
		function: Fn.Callable;
		number: number;
		object: object;
		string: string;
		symbol: symbol;
		undefined: undefined;
	}

	/**
	 * The possible names of primitive types returned by the `typeof` operator.
	 *
	 * @example
	 * ```ts
	 * type A = Primitive.Name; // "bigint" | "boolean" | "function" | "number" | "object" | "string" | "symbol" | "undefined";
	 * ```
	 */
	export type Name = keyof Map;

	/**
	 * The actual types corresponding to the names of primitive types.
	 *
	 * @example
	 * ```ts
	 * type A = Primitive.Type; // bigint | boolean | Fn.Callable | number | object | string | symbol | undefined;
	 * ```
	 */
	export type Type = Map[Name];

	/**
	 * Converts type `T` to a `Primitive.Type`.
	 *
	 * @example
	 * ```ts
	 * type A = Primitive.Resolve<"string">; // string
	 * type B = Primitive.Resolve<string>; // string
	 * ```
	 */
	export type Resolve<T> = T extends Name
		? Resolve<Map[T]>
		: T extends Type
			? NonNullable<Mutable<T>>
			: never;

	/**
	 * A utility type that checks if `CompareA` is the same type as `CompareB`.
	 *
	 * @example
	 * ```ts
	 * type A = Primitive.Match<string, "string", string>; // string
	 * type B = Primitive.Match<string, string, "string">; // "string"
	 * type C = Primitive.Match<string, "number", number>; // never
	 * ```
	 */
	export type Match<A, B, Result> = Resolve<A> extends Resolve<B>
		? Result
		: never;
}
