import type { ValidationFailedError } from "../../errors/validation-failed-error.js";
import { Schema, SchemaSymbol } from "../../schema.js";
import type { InferSchemaType } from "../../types/infer-schema-type.js";
import type { InferSchema } from "../../types/infer-schema.js";
import type { SchemaInput } from "../../types/schema-input.js";
import { applySchemaDefaults } from "../../utils/apply-schema-defaults.js";

/**
 * Creates a class based on a JSON schema definition that provides type-safe instantiation and validation.
 *
 * @typeParam T - The schema input type constraint
 * @param schemaDefinition - The JSON schema definition that describes the structure and validation rules
 * @returns A class constructor with the following features:
 *  - Type-safe instantiation with schema validation
 *  - Static `parse()` method for validating unknown data
 *  - Proxy-based property access to the underlying data
 *  - Automatic schema validation and default value application
 *  - JSON serialization support via `toJSON()`
 *
 * @example
 * Simple schema
 * ```typescript
 * class Person extends createSchemaClass({
 *   type: "object",
 *   properties: {
 *     name: { type: "string" },
 *     deletedAt: {
 *       type: ["string", "null"],
 *       default: null,
 *     },
 *   },
 *   required: ["name"],
 * }) {}
 *
 * const person = new Person({ name: "John" }); // Person
 * const person2 = Person.parse('{ "name": "John" }'); // Person
 * const person3 = Person.safeParse('{ "name": "John" }'); // SafeResult<Person>
 * ```
 *
 * @example
 * Complex schema
 * ```typescript
 * class Person extends createSchemaClass({
 *   type: "object",
 *   properties: {
 *     name: { type: "string" },
 *     address: {
 *       type: "object",
 *       properties: {
 *         street: { type: "string" },
 *         city: { type: "string" },
 *         zip: { type: "string" },
 *       },
 *       required: ["street"],
 *     },
 *     deletedAt: {
 *       type: ["string", "null"],
 *       default: null,
 *     },
 *   },
 *   required: ["name"],
 * }) {}
 * ```
 *
 * @example
 * Nested schema
 * ```typescript
 * class Address extends createSchemaClass({
 *   type: "object",
 *   properties: {
 *     street: { type: "string" },
 *     city: { type: "string" },
 *     zip: { type: "string" },
 *   },
 *   required: ["street"],
 * }) {}
 *
 * class Person extends createSchemaClass({
 *   type: "object",
 *   properties: {
 *     name: { type: "string" },
 *     address: Address,
 *     deletedAt: {
 *       type: ["string", "null"],
 *       default: null,
 *     },
 *   },
 *   required: ["name"],
 * }) {}
 * ```
 *
 * @throws - {@link ValidationFailedError} When the provided data doesn't match the schema during instantiation or parsing
 */
export function createSchemaClass<const T extends SchemaInput>(
  schemaDefinition: InferSchema<T>,
) {
  // @ts-expect-error
  const schemaContext = new Schema(schemaDefinition as T);

  const SchemaBasedClass = class {
    static [SchemaSymbol] = Schema[SchemaSymbol];

    public data: InferSchemaType<T>;

    constructor(data: InferSchemaType<T>) {
      this.data = applySchemaDefaults(data, schemaDefinition);

      if (typeof data === "object" && data !== null) {
        // biome-ignore lint/correctness/noConstructorReturn: <explanation>
        return new Proxy(this, {
          get(target, prop) {
            if (prop in data) {
              const value = data[prop as keyof typeof data];

              return typeof value === "function" ? value.bind(data) : value;
            }

            return prop in target
              ? target[prop as keyof typeof target]
              : undefined;
          },
        });
      }
    }

    static parse(data: unknown) {
      // biome-ignore lint/complexity/noThisInStatic: <explanation>
      return new this(schemaContext.parse(data));
    }

    toJSON() {
      return this.data;
    }
  } as unknown as {
    new (
      data: InferSchemaType<T>,
    ): InferSchemaType<T> extends Exclude<object, null>
      ? T extends { type: unknown }
        ? InferSchemaType<T>
        : {
            data: InferSchemaType<T>;
          }
      : {
          data: InferSchemaType<T>;
        };

    parse: <T>(
      this: {
        new (data: InferSchemaType<T>): T;
      },
      data: unknown,
    ) => T;
  };

  return new Proxy(SchemaBasedClass, {
    get(target, prop) {
      return prop in target
        ? target[prop as keyof typeof target]
        : prop in schemaContext
          ? schemaContext[prop as keyof typeof schemaContext]
          : undefined;
    },
  }) as typeof SchemaBasedClass & typeof schemaContext;
}
