import { is } from "../../utils/is.js";
import { resolveSubSchema } from "../../utils/resolve-sub-schema.js";
import { keywordHandler } from "../keyword-handler.js";

keywordHandler.register("prefixItems", (schema, schemaContext) => {
  const subSchemas = schema.prefixItems.map((_, index) =>
    resolveSubSchema(schemaContext, "prefixItems", index),
  );

  return (data, context) => {
    if (!is.array(data) || data.length < schema.prefixItems.length) {
      return true;
    }

    for (let i = 0; i < schema.prefixItems.length; i++) {
      context.set(i, true);

      if (!subSchemas[i].validate(data[i])) {
        return false;
      }
    }

    return true;
  };
});
