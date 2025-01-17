import { is } from "../../utils/is.js";
import { keywordHandler } from "../keyword-handler.js";

keywordHandler.register("items", (schema, schemaContext) => {
  const subSchema = schemaContext.resolveSubSchema("items");
  const startIndex = schema.prefixItems ? schema.prefixItems.length : 0;

  return (data, context) => {
    if (!is.array(data)) {
      return true;
    }

    for (let i = startIndex; i < data.length; i++) {
      context.set(i, true);

      if (!subSchema.validate(data[i])) {
        return false;
      }
    }

    return true;
  };
});
