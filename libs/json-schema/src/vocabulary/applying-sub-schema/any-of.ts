import { resolveSubSchema } from "../../utils/resolve-sub-schema.js";
import { keywordHandler } from "../keyword-handler.js";

keywordHandler.register("anyOf", (schema, schemaContext) => {
  const subSchemas = schema.anyOf
    // Boolean schemas should be evaluated last
    .sort((a) => (a === true ? 1 : -1))
    .map((_, index) => resolveSubSchema(schemaContext, "anyOf", index));

  return (data, context) =>
    subSchemas.some((subSchema) => subSchema.validate(data, context));
});
