import { keywordHandler } from "../keyword-handler.js";

keywordHandler.register("oneOf", (schema, schemaContext) => {
  const subSchemas = schema.oneOf.map((_, index) =>
    schemaContext.resolveSubSchema("oneOf", index),
  );

  return (data, context) =>
    subSchemas.filter((subSchema) => subSchema.validate(data, context))
      .length === 1;
});
