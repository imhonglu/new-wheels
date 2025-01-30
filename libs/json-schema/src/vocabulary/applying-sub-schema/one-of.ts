import { resolveSubSchema } from "../../utils/resolve-sub-schema.js";
import { keywordHandler } from "../keyword-handler.js";

keywordHandler.register("oneOf", (schema, schemaContext) => {
  const subSchemas = schema.oneOf.map((_, index) =>
    resolveSubSchema(schemaContext, "oneOf", index),
  );

  return (data, context) =>
    subSchemas.filter((subSchema) => subSchema.validate(data, context))
      .length === 1;
});
