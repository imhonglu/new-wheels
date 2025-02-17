import type { Fn } from "@imhonglu/toolkit";
import { Schema } from "../schema.js";
import type { JsonSchema } from "../types/json-schema/index.js";
import type { SchemaVariant } from "../types/schema-variant.js";
import { is } from "./is.js";

export function applySchemaDefaults<T>(
  data: T,
  schemaDefinition: SchemaVariant | Fn.Newable,
): NonNullable<T> {
  if (schemaDefinition instanceof Schema && "definition" in schemaDefinition) {
    // biome-ignore lint/style/noParameterAssign: <explanation>
    schemaDefinition = schemaDefinition.definition;
  }

  if (is.object(schemaDefinition)) {
    let defaultValue =
      data !== undefined
        ? data
        : "default" in schemaDefinition
          ? schemaDefinition.default
          : undefined;

    if (typeof defaultValue === "function") {
      defaultValue = defaultValue();
    }

    if (data === undefined && is.objectTypeSchema(schemaDefinition)) {
      defaultValue = {};
    }

    if (
      !is.objectTypeSchema(schemaDefinition) ||
      !schemaDefinition.properties ||
      defaultValue === undefined ||
      defaultValue === null
    ) {
      return defaultValue as NonNullable<T>;
    }

    for (const property in schemaDefinition.properties) {
      const subSchema = schemaDefinition.properties[property] as
        | JsonSchema
        | Fn.Newable;

      const value = applySchemaDefaults(
        (defaultValue as Record<string, unknown>)[property],
        subSchema,
      );

      if (typeof subSchema === "boolean") {
        continue;
      }

      if (
        (defaultValue as Record<string, unknown>)[property] === undefined &&
        value !== undefined
      ) {
        (defaultValue as Record<string, unknown>)[property] = value;
      }

      // if the subSchema is a class, we need to instantiate it
      if (Symbol.hasInstance in subSchema) {
        (defaultValue as Record<string, unknown>)[property] = new subSchema(
          value,
        );
      }
    }

    return defaultValue as NonNullable<T>;
  }

  return data as NonNullable<T>;
}
