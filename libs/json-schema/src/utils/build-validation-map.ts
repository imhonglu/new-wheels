import { keys } from "@imhonglu/type-object";
import type { Schema } from "../schema.js";
import type { JsonSchema, ObjectSchema } from "../types/json-schema/index.js";
import type { ValidationFunction } from "../types/validation-function.js";
import { keywordHandler } from "../vocabulary/index.js";
import { is } from "./is.js";

export function buildValidationMap(schema: Schema) {
  const { schema: schemaDefinition } = schema as unknown as Schema<JsonSchema>;

  if (is.boolean(schemaDefinition)) {
    return undefined;
  }

  const map = new Map<keyof ObjectSchema, ValidationFunction>();

  for (const keyword of keys(schemaDefinition)) {
    if (schemaDefinition[keyword] === undefined) {
      continue;
    }

    const handler = keywordHandler.get(keyword);
    if (!handler) {
      continue;
    }

    const validationFunction = handler(schemaDefinition, schema);
    if (validationFunction) {
      map.set(keyword, validationFunction);
    }
  }

  return map;
}
