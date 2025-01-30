import { resolveSubSchema } from "../../utils/resolve-sub-schema.js";
import { keywordHandler } from "../keyword-handler.js";

keywordHandler.register("then", (schema, schemaContext) => {
  resolveSubSchema(schemaContext, "then");
});
