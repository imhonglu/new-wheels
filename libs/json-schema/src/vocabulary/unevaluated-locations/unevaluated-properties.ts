import { keys } from "@imhonglu/type-object";
import { is } from "../../utils/is.js";
import { resolveSubSchema } from "../../utils/resolve-sub-schema.js";
import { keywordHandler } from "../keyword-handler.js";

keywordHandler.register("unevaluatedProperties", (schema, schemaContext) => {
  const subSchema = resolveSubSchema(schemaContext, "unevaluatedProperties");

  return (data, context) => {
    if (!is.object(data) || schema.unevaluatedProperties === true) {
      return true;
    }

    const unevaluatedPropertyNames = keys(data).filter(
      (key) => !context.has(key),
    );

    return schema.unevaluatedProperties === false
      ? unevaluatedPropertyNames.length === 0
      : !unevaluatedPropertyNames.some((key) => !subSchema.validate(data[key]));
  };
});
