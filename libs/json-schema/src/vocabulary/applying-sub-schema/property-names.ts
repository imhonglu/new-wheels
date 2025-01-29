import { is } from "../../utils/is.js";
import { resolveSubSchema } from "../../utils/resolve-sub-schema.js";
import { keywordHandler } from "../keyword-handler.js";

keywordHandler.register("propertyNames", (schema, schemaContext) => {
  const subSchema = resolveSubSchema(schemaContext, "propertyNames");

  return (data) => {
    if (!is.object(data) || schema.propertyNames === true) {
      return true;
    }

    const propertyNames = Object.keys(data);

    return schema.propertyNames === false
      ? propertyNames.length === 0
      : !propertyNames.some(
          (propertyName) => !subSchema.validate(propertyName),
        );
  };
});
