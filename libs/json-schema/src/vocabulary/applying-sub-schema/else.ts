import { keywordHandler } from "../keyword-handler.js";

keywordHandler.register("else", (schema, schemaContext) => {
  schemaContext.resolveSubSchema("else");
});
