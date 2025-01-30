import { Schema } from "../schema.js";
import type { JsonSchema, ObjectSchema } from "../types/json-schema/index.js";
import { encodeJsonPointer } from "./encode-json-pointer.js";

export function resolveSubSchema<
  T extends ObjectSchema,
  P extends Exclude<keyof T, symbol>,
>(
  schema: Schema<T>,
  ...[keyword, propertyName]: NonNullable<T[P]> extends Record<infer K, unknown>
    ? [P, Exclude<K, symbol>]
    : NonNullable<T[P]> extends unknown[]
      ? [P, number]
      : [P]
): Schema<JsonSchema> {
  if (typeof schema.definition !== "object") {
    throw new Error("Cannot resolve sub-schema for non-object schema");
  }

  let subSchema = schema.definition[keyword] as
    | ObjectSchema
    | Record<PropertyKey, JsonSchema>
    | Schema;

  let path = `${schema.path}/${keyword}`;

  if (propertyName !== undefined) {
    path += `/${encodeJsonPointer(propertyName)}`;
    subSchema = subSchema[propertyName as keyof typeof subSchema];
  }

  if (subSchema instanceof Schema) {
    schema.refMap.set(path, subSchema);

    return subSchema as Schema<JsonSchema>;
  }

  return new Schema(subSchema, schema, path);
}
