import {
	type ArrayElement,
	type SafeExecutor,
	createSafeExecutor,
} from "@imhonglu/toolkit";
import { ValidationFailedError } from "./errors/validation-failed-error.js";
import type {
	ApplyingSubSchema,
	BasicMetaData,
	BooleanSchema,
	Core,
	Format,
	JsonSchema,
	ObjectSchema,
	StringEncodedData,
	StructuralValidation,
} from "./types/json-schema/index.js";
import type {
	ValidationContext,
	ValidationFunction,
} from "./types/validation-function.js";
import { buildValidationMap } from "./utils/build-validation-map.js";
import { encodeJsonPointer } from "./utils/encode-json-pointer.js";
import { initializeUri } from "./utils/initialize-uri.js";
import { tryParseJson } from "./utils/try-parse-json.js";

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
	public readonly uri?: string;
	public readonly root: Schema;
	public readonly refMap: Map<string, Schema>;
	public readonly validates?: Map<keyof ObjectSchema, ValidationFunction>;

	constructor(
		public readonly schema: Exclude<
			SchemaDefinition.InferRequiredProperty<T>,
			Schema
		>,
		public readonly parent?: Schema,
		public readonly path = "#",
	) {
		this.root = parent?.root ?? this;
		this.refMap = parent?.refMap ?? new Map();

		this.uri = initializeUri(this);
		this.refMap.set(this.path, this);

		this.validates = buildValidationMap(this);
		this.safeParse = createSafeExecutor(this.parse);
		this.stringify = JSON.stringify;
	}

	public validate(data: unknown): data is SchemaDefinition.Instance<T> {
		if (!this.validates) {
			return this.schema as BooleanSchema;
		}

		const context: ValidationContext = new Map();

		for (const [keyword, validate] of this.validates) {
			if (!validate(data, context)) {
				return false;
			}
		}

		return true;
	}

	public parse(data: unknown): SchemaDefinition.Instance<T> {
		const parsed = tryParseJson(data);

		if (!this.validate(parsed)) {
			throw new ValidationFailedError(data);
		}

		return parsed as SchemaDefinition.Instance<T>;
	}

	public safeParse: SafeExecutor<typeof this.parse>;
	public stringify: (data: unknown) => string;

	public resolveSubSchema<P extends keyof ObjectSchema>(
		...[keyword, propertyName]: Exclude<
			ObjectSchema[P],
			undefined
		> extends Record<infer K, unknown>
			? [P, Exclude<K, symbol>]
			: [P]
	): Schema<JsonSchema> {
		let schemaValue = this.schema[keyword as unknown as keyof T] as
			| Schema<JsonSchema>
			| JsonSchema;

		let path = `${this.path}/${keyword}`;

		if (propertyName !== undefined) {
			path += `/${encodeJsonPointer(propertyName)}`;
			schemaValue = schemaValue[propertyName as keyof typeof schemaValue];
		}

		if (schemaValue instanceof Schema) {
			this.refMap.set(path, schemaValue);

			return schemaValue;
		}

		const schema = new Schema(schemaValue, this, path);

		return schema;
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
				? ArrayElement<T["enum"]>
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
