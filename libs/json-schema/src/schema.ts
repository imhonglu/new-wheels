import type { SafeResult } from "@imhonglu/toolkit";
import { ValidationFailedError } from "./errors/validation-failed-error.js";
import type { InferSchemaType } from "./types/infer-schema-type.js";
import type { BooleanSchema, ObjectSchema } from "./types/json-schema/index.js";
import type { SchemaVariant } from "./types/schema-variant.js";
import type {
  ValidationContext,
  ValidationFunction,
} from "./types/validation-function.js";
import { applySchemaDefaults } from "./utils/apply-schema-defaults.js";
import { buildValidationMap } from "./utils/build-validation-map.js";
import { initializeUri } from "./utils/initialize-uri.js";
import { tryParseJson } from "./utils/try-parse-json.js";

export const SchemaSymbol = Symbol("schema");

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
export class Schema<T extends SchemaVariant = SchemaVariant> {
  static [SchemaSymbol] = SchemaSymbol;

  public readonly uri?: string;
  public readonly root: Schema<SchemaVariant>;

  public readonly refMap: Map<string, Schema>;
  public readonly validates?: Map<keyof ObjectSchema, ValidationFunction>;

  constructor(
    public readonly definition: Exclude<T, Schema>,
    public readonly parent?: Schema,
    public readonly path = "#",
  ) {
    this.root = parent?.root ?? this;
    this.refMap = parent?.refMap ?? new Map();

    this.uri = initializeUri(this);
    this.refMap.set(this.path, this);

    this.validates = buildValidationMap(this);
  }

  public validate(
    data: unknown,
    context: ValidationContext = new Map(),
  ): data is InferSchemaType<T> {
    if (!this.validates) {
      return this.definition as BooleanSchema;
    }

    for (const [keyword, validate] of this.validates) {
      if (!validate(data, context)) {
        return false;
      }
    }

    return true;
  }

  public parse(data: unknown): InferSchemaType<T> {
    const parsed = applySchemaDefaults(tryParseJson(data), this.definition);

    if (!this.validate(parsed)) {
      throw new ValidationFailedError(data);
    }

    return parsed as InferSchemaType<T>;
  }

  public safeParse(
    ...args: Parameters<typeof this.parse>
  ): SafeResult<InferSchemaType<T>> {
    try {
      return { ok: true, data: this.parse(...args) as InferSchemaType<T> };
    } catch (error) {
      return { ok: false, error };
    }
  }

  public stringify(data: unknown): string {
    return JSON.stringify(data);
  }

  static [Symbol.hasInstance](obj: unknown) {
    const prototype = Object.getPrototypeOf(obj);

    return SchemaSymbol in prototype || SchemaSymbol in prototype.constructor;
  }
}
