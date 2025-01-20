import { keywordHandler } from "../keyword-handler.js";

keywordHandler.register("then", (schema, schemaContext) => {
  schemaContext.resolveSubSchema("then");
});
