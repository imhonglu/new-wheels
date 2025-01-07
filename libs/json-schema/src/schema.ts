import { type SafeExecutor, createSafeExecutor } from "@imhonglu/toolkit";
import type {
	ApplyingSubSchema,
	BasicMetaData,
	BooleanSchema,
	Core,
	Format,
	JsonSchema,
	StringEncodedData,
	StructuralValidation,
} from "./types/json-schema/index.js";
import { buildParser } from "./utils/build-parser.js";
import { buildValidator } from "./utils/build-validator.js";

/**
 * JSON Schema validator and parser implementation that provides type-safe validation
 * and parsing of JSON data according to a schema definition.
 *
 * @typeParam T - Schema definition type that extends SchemaDefinition.Type
 *
 * @example Basic usage with primitive types
 * ```ts
 * const Name = new Schema({
 *   type: "string",
 *   minLength: 1,
 * });
 *
 * const Age = new Schema({
 *   type: "number",
 *   minimum: 0,
 * });
 * ```
 *
 * @example Complex object schema with nested properties
 * ```ts
 * const Person = new Schema({
 *   type: "object",
 *   properties: {
 *     name: Name,
 *     age: Age,
 *     address: {
 *       type: "object",
 *       properties: {
 *         street: { type: "string" },
 *         city: { type: "string" }
 *       }
 *     }
 *   },
 *   required: ["name", "age"]
 * });
 * ```
 *
 * @example Validation and parsing
 * ```ts
 * // Validation
 * if (Person.validate(data)) {
 *   // data is type-safe here
 * }
 *
 * // Safe parsing with error handling
 * const result = Person.safeParse(data);
 * if (result.success) {
 *   // result.data is type-safe
 * } else {
 *   console.error(result.error);
 * }
 * ```
 */
export class Schema<T extends SchemaDefinition.Type = SchemaDefinition.Type> {
	public readonly root: Schema;
	public readonly refMap: Map<string, Schema>;
	public readonly validate: (
		data: unknown,
	) => data is SchemaDefinition.Instance<T>;

	constructor(
		public readonly schema: Exclude<
			SchemaDefinition.InferRequiredProperty<T>,
			Schema
		>,
		public readonly parent?: Schema,
	) {
		this.refMap = parent?.refMap ?? new Map();
		this.root = parent?.root ?? this;
		this.validate = buildValidator(this.schema as JsonSchema, this);
		this.parse = buildParser(this.schema as JsonSchema, this.validate);
		this.safeParse = createSafeExecutor(this.parse);
		this.stringify = JSON.stringify;
	}

	public parse: (data: unknown) => SchemaDefinition.Instance<T>;
	public safeParse: SafeExecutor<typeof this.parse>;
	public stringify: (data: unknown) => string;

	/**
	 * Creates a new Schema instance with type assertion to JsonSchema.
	 * This utility function breaks type inference chain to prevent TypeScript errors.
	 *
	 * @param schema - Source schema (Schema instance or JsonSchema object)
	 * @param parent - Optional parent Schema for inheritance
	 * @returns Schema instance with explicit JsonSchema type
	 *
	 * @example
	 * ```ts
	 * const rawSchema = { type: "string", pattern: "^[A-Z]+$" };
	 * const schema = Schema.from(rawSchema);
	 * ```
	 */
	public static from(
		schema: Schema | JsonSchema,
		parent?: Schema,
	): Schema<JsonSchema> {
		if (schema instanceof Schema) {
			return schema as Schema<JsonSchema>;
		}

		return new Schema(schema, parent);
	}
}

export namespace SchemaDefinition {
	export interface ConstType
		extends Core<Type>,
			BasicMetaData,
			Pick<StructuralValidation.Any, "const"> {}

	export interface EnumType
		extends Core<Type>,
			BasicMetaData,
			Pick<StructuralValidation.Any, "enum"> {}

	export interface NullType
		extends Core<Type>,
			BasicMetaData,
			Pick<StructuralValidation.Any, "type"> {
		type: "null";
	}

	export interface BooleanType
		extends Core<Type>,
			BasicMetaData,
			Pick<StructuralValidation.Any, "type"> {
		type: "boolean";
	}

	export interface ObjectType
		extends Core<Type>,
			BasicMetaData,
			Pick<StructuralValidation.Any, "type">,
			StructuralValidation.Object,
			ApplyingSubSchema.Object<Type> {
		type: "object";
	}

	export interface ArrayType
		extends Core<Type>,
			BasicMetaData,
			Pick<StructuralValidation.Any, "type">,
			StructuralValidation.Array,
			ApplyingSubSchema.Array<Type> {
		type: "array";
	}

	export interface StringType
		extends Core<Type>,
			BasicMetaData,
			Pick<StructuralValidation.Any, "type">,
			StructuralValidation.String,
			StringEncodedData<Type>,
			Format {
		type: "string";
	}

	export interface NumericType
		extends Core<Type>,
			BasicMetaData,
			Pick<StructuralValidation.Any, "type">,
			StructuralValidation.Numeric {
		type: "number" | "integer";
	}

	export type Type =
		| BooleanSchema
		| ConstType
		| EnumType
		| NullType
		| BooleanType
		| ObjectType
		| ArrayType
		| StringType
		| NumericType
		| Schema;

	export type InferRequiredProperty<T> = T extends SchemaDefinition.ObjectType
		? T & {
				required?: (keyof T["properties"])[];
				dependentRequired?: {
					[key in keyof T["properties"]]: (keyof T["properties"])[];
				};
			}
		: T;

	export type Instance<T> = T extends BooleanSchema
		? unknown
		: T extends ConstType
			? T["const"]
			: T extends EnumType
				? T["enum"]
				: T extends NullType
					? null
					: T extends BooleanType
						? boolean
						: T extends NumericType
							? number
							: T extends StringType
								? string
								: T extends ArrayType
									? Instance<T["items"]>[]
									: T extends ObjectType
										? T["required"] extends Array<infer U>
											? {
													[P in Extract<keyof T["properties"], U>]: Instance<
														T["properties"][P]
													>;
												} & {
													[P in Exclude<keyof T["properties"], U>]?: Instance<
														T["properties"][P]
													>;
												}
											: {
													[P in keyof T["properties"]]?: Instance<
														T["properties"][P]
													>;
												}
										: T extends Schema<infer U>
											? Instance<U>
											: never;
}
