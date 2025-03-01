import type { Fn } from "@imhonglu/toolkit";
import type { ValidationFailedError } from "../../errors/validation-failed-error.js";
import { Schema, SchemaSymbol } from "../../schema.js";
import type { InferSchemaInputType } from "../../types/infer-schema-input-type.js";
import type { InferSchemaType } from "../../types/infer-schema-type.js";
import type { InferSchema } from "../../types/infer-schema.js";
import type { SchemaClass } from "../../types/schema-class.js";
import type { SchemaConstructorParams } from "../../types/schema-constructor-params.js";
import type { SchemaInput } from "../../types/schema-input.js";
import { applySchemaDefaults } from "../../utils/apply-schema-defaults.js";

export const OriginalValueSymbol = Symbol("originalValue");

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

    [OriginalValueSymbol]!: InferSchemaType<T>;

    constructor(...[data]: SchemaConstructorParams<T>) {
      const originalValue = applySchemaDefaults(data, schemaDefinition);

      Object.defineProperty(this, OriginalValueSymbol, {
        enumerable: false,
        value: originalValue,
      });

      // Set up a proxy for object type schemas to enable direct property access
      // This allows accessing properties directly (e.g., instance.propertyName)
      // instead of going through the data object (instance.data.propertyName)
      if (typeof originalValue === "object" && originalValue !== null) {
        // biome-ignore lint/correctness/noConstructorReturn: <explanation>
        return new Proxy(this, {
          ownKeys: () => [...Object.keys(originalValue), OriginalValueSymbol],

          getOwnPropertyDescriptor: (target, prop) =>
            prop in target
              ? Object.getOwnPropertyDescriptor(target, prop)
              : Object.getOwnPropertyDescriptor(originalValue, prop),

          get: (target, prop) => {
            const value =
              prop in target
                ? target[prop as keyof typeof target]
                : originalValue[prop as keyof typeof originalValue];

            return typeof value === "function"
              ? (value as Fn.Callable).bind(this)
              : value;
          },

          set: () => {
            return true;
          },
        });
      }
    }

    // Parses schema data and returns a class instance.
    // Overrides Schema.parse() to return a class instance instead of a plain object.
    static parse(data: unknown) {
      // biome-ignore lint/complexity/noThisInStatic: <explanation>
      return new this(schemaContext.parse(data) as InferSchemaInputType<T>);
    }

    toJSON() {
      return this[OriginalValueSymbol];
    }

    [Symbol.iterator]() {
      return this[OriginalValueSymbol][Symbol.iterator]();
    }
  } as unknown as SchemaClass<T>;

  return new Proxy(SchemaBasedClass, {
    get(target, prop) {
      // if the property is in the target, return the target
      if (prop in target) {
        return target[prop as keyof typeof target];
      }

      // if the property is in the schema context, return the schema context
      if (prop in schemaContext) {
        return schemaContext[prop as keyof typeof schemaContext];
      }

      return undefined;
    },
  }) as typeof SchemaBasedClass & typeof schemaContext;
}
