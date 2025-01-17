import { InvalidTypeError } from "../../errors/invalid-type-error.js";
import type { StructuralValidation } from "../../types/json-schema/structural-validation.js";
import { is } from "../../utils/is.js";
import { keywordHandler } from "../keyword-handler.js";

const set = new Set<StructuralValidation.PrimitiveType>([
  "null",
  "boolean",
  "object",
  "array",
  "string",
  "number",
  "integer",
]);

keywordHandler.register("type", (schema) => {
  const types: StructuralValidation.PrimitiveType[] = is.array(schema.type)
    ? schema.type
    : [schema.type];

  if (types.some((type) => !set.has(type))) {
    throw new InvalidTypeError(schema.type);
  }

  return (data) => types.some((type) => is[type](data));
});
