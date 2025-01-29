import { resolveSubSchema } from "../../utils/resolve-sub-schema.js";
import { keywordHandler } from "../keyword-handler.js";

keywordHandler.register("else", (schema, schemaContext) => {
  resolveSubSchema(schemaContext, "else");
});
