import { resolveSubSchema } from "../../utils/resolve-sub-schema.js";
import { keywordHandler } from "../keyword-handler.js";

keywordHandler.register("allOf", (schema, schemaContext) => {
  const subSchemas = schema.allOf.map((_, index) =>
    resolveSubSchema(schemaContext, "allOf", index),
  );

  return (data, context) =>
    subSchemas.every((subSchema) => subSchema.validate(data, context));
});
