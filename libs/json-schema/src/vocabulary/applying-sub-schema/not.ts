import { keywordHandler } from "../keyword-handler.js";

keywordHandler.register("not", (schema, schemaContext) => {
  const subSchema = schemaContext.resolveSubSchema("not");

  return (data, context) => !subSchema.validate(data, context);
});
