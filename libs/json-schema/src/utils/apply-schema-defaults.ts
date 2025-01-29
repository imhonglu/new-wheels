import { Schema } from "../schema.js";
import type { SchemaVariant } from "../types/schema-variant.js";
import { is } from "./is.js";

export function applySchemaDefaults<T>(
  data: T,
  schemaDefinition: SchemaVariant,
): T {
  if (schemaDefinition instanceof Schema) {
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

    if (
      !is.objectTypeSchema(schemaDefinition) ||
      !schemaDefinition.properties ||
      defaultValue === undefined ||
      defaultValue === null
    ) {
      return defaultValue as T;
    }

    for (const property in schemaDefinition.properties) {
      const subSchema = schemaDefinition.properties[property];
      const value = applySchemaDefaults(
        (defaultValue as Record<string, unknown>)[property],
        subSchema,
      );

      if (
        (defaultValue as Record<string, unknown>)[property] === undefined &&
        value !== undefined
      ) {
        (defaultValue as Record<string, unknown>)[property] = value;
      }
    }

    return defaultValue as T;
  }

  return data;
}
