import type { SchemaDef } from "./types/utils/schema-def.js";
import type { SchemaInferBase } from "./types/utils/schema-infer-base.js";

/**
 * A helper function for defining type-safe JSON Schema.
 *
 * @typeParam T - The type of JSON Schema
 * @param schema - The JSON Schema to define
 * @returns The input JSON Schema as is
 *
 * @example
 * ```ts
 * const schema = defineSchema({
 *   type: "object",
 *   properties: {
 *     name: { type: "string" },
 *     age: { type: "number" }
 *   },
 *   required: ["name"]
 * });
 * ```
 *
 * @remarks
 * This function validates the JSON Schema at compile time and
 * returns the input schema as is at runtime.
 */
export function defineSchema<const T extends SchemaInferBase>(
  schema: SchemaDef<T>,
) {
  return schema;
}
