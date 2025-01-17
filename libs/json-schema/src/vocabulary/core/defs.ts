import { keywordHandler } from "../keyword-handler.js";

keywordHandler.register("$defs", (schema, schemaContext) => {
  for (const propertyName in schema.$defs) {
    schemaContext.resolveSubSchema("$defs", propertyName);
  }
});
