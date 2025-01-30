import { is } from "../../utils/is.js";
import { resolveSubSchema } from "../../utils/resolve-sub-schema.js";
import { keywordHandler } from "../keyword-handler.js";

keywordHandler.register("unevaluatedItems", (schema, schemaContext) => {
  const subSchema = resolveSubSchema(schemaContext, "unevaluatedItems");

  return (data, context) => {
    if (!is.array(data) || schema.unevaluatedItems === true) {
      return true;
    }

    const unevaluatedItems = data.filter((_, index) => !context.has(index));

    return schema.unevaluatedItems === false
      ? unevaluatedItems.length === 0
      : !unevaluatedItems.some((item) => !subSchema.validate(item));
  };
});
