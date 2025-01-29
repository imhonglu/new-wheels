import { composeGuards } from "@imhonglu/type-guard";
import { Schema } from "../schema.js";
import type { ObjectSchema } from "../types/json-schema/index.js";

function nonNullableObject(value: unknown): value is Exclude<object, null> {
  return typeof value === "object" && value !== null;
}

export const is = composeGuards({
  nonNullableObject,

  null: (value): value is null => value === null,
  boolean: (value): value is boolean => typeof value === "boolean",
  object: (value): value is Exclude<object, Array<unknown> | null> =>
    nonNullableObject(value) && !Array.isArray(value),
  array: (value): value is unknown[] => Array.isArray(value),
  string: (value): value is string => typeof value === "string",
  number: (value): value is number => typeof value === "number",
  integer: (value): value is number => Number.isInteger(value),

  objectSchema(value: unknown): value is Schema<ObjectSchema> {
    return value instanceof Schema && typeof value.definition === "object";
  },

  objectTypeSchema: (value): value is ObjectSchema => {
    if (typeof value !== "object" || value === null) {
      return false;
    }

    if (!("type" in value)) {
      return false;
    }

    const types = Array.isArray(value.type) ? value.type : [value.type];

    return types.includes("object");
  },
});
