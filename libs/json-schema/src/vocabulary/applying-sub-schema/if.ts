import { resolveSubSchema } from "../../utils/resolve-sub-schema.js";
import { keywordHandler } from "../keyword-handler.js";

keywordHandler.register("if", (schema, schemaContext) => {
  const ifSchema = resolveSubSchema(schemaContext, "if");

  const thenSchema = schema.then
    ? resolveSubSchema(schemaContext, "then")
    : undefined;

  const elseSchema = schema.else
    ? resolveSubSchema(schemaContext, "else")
    : undefined;

  return (data, context) => {
    const isValid = ifSchema.validate(data, context);

    if (isValid && thenSchema) {
      return thenSchema.validate(data, context);
    }

    if (!isValid && elseSchema) {
      return elseSchema.validate(data, context);
    }

    return true;
  };
});
