import { resolveSubSchema } from "../../utils/resolve-sub-schema.js";
import { keywordHandler } from "../keyword-handler.js";

keywordHandler.register("not", (schema, schemaContext) => {
  const subSchema = resolveSubSchema(schemaContext, "not");

  return (data, context) => !subSchema.validate(data, context);
});
