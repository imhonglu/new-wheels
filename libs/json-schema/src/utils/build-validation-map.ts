import { keys } from "@imhonglu/type-object";
import type { Schema } from "../schema.js";
import type { JsonSchema, ObjectSchema } from "../types/json-schema/index.js";
import type { ValidationFunction } from "../types/validation-function.js";
import { keywordHandler } from "../vocabulary/index.js";
import { is } from "./is.js";

const ORDERED_KEYWORDS: ReadonlySet<keyof ObjectSchema> = new Set([
  "prefixItems",
  "items",
  "unevaluatedItems",
  "additionalProperties",
  "unevaluatedProperties",
]);

export function buildValidationMap(
  schema: Schema,
): Map<keyof ObjectSchema, ValidationFunction> | undefined {
  const { schema: schemaDefinition } = schema as unknown as Schema<JsonSchema>;

  if (is.boolean(schemaDefinition)) {
    return undefined;
  }

  const validationMap = new Map<keyof ObjectSchema, ValidationFunction>();
  const normalKeywords = keys(schemaDefinition).filter(
    (keyword) => !ORDERED_KEYWORDS.has(keyword),
  );

  for (const keyword of [...normalKeywords, ...ORDERED_KEYWORDS]) {
    if (schemaDefinition[keyword] === undefined) {
      continue;
    }

    const handler = keywordHandler.get(keyword);
    if (!handler) {
      continue;
    }

    const validationFunction = handler(schemaDefinition, schema);
    if (validationFunction) {
      validationMap.set(keyword, validationFunction);
    }
  }

  return validationMap;
}
