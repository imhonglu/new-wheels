import { keywordHandler } from "../keyword-handler.js";

keywordHandler.register("$id", (schema, schemaContext) => {
  schemaContext.refMap.set(schemaContext.path, schemaContext);

  const id = schemaContext.uri
    ? schema.$id.replace(schemaContext.uri, "")
    : schema.$id;

  schemaContext.refMap.set(id, schemaContext);
});
