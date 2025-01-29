import { resolveSubSchema } from "../../utils/resolve-sub-schema.js";
import { keywordHandler } from "../keyword-handler.js";

keywordHandler.register("$defs", (schema, schemaContext) => {
  for (const propertyName in schema.$defs) {
    resolveSubSchema(schemaContext, "$defs", propertyName);
  }
});
