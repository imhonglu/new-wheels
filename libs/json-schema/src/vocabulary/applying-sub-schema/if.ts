import { keywordHandler } from "../keyword-handler.js";

keywordHandler.register("if", (schema, schemaContext) => {
  const ifSchema = schemaContext.resolveSubSchema("if");

  const thenSchema = schema.then
    ? schemaContext.resolveSubSchema("then")
    : undefined;

  const elseSchema = schema.else
    ? schemaContext.resolveSubSchema("else")
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
