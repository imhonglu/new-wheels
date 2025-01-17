import { keywordHandler } from "../keyword-handler.js";

keywordHandler.register("anyOf", (schema, schemaContext) => {
  const subSchemas = schema.anyOf.map((_, index) =>
    schemaContext.resolveSubSchema("anyOf", index),
  );

  return (data) => subSchemas.some((subSchema) => subSchema.validate(data));
});
