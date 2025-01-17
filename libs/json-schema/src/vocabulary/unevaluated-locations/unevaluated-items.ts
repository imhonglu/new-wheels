import { is } from "../../utils/is.js";
import { keywordHandler } from "../keyword-handler.js";

keywordHandler.register("unevaluatedItems", (schema, schemaContext) => {
  const subSchema = schemaContext.resolveSubSchema("unevaluatedItems");

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
