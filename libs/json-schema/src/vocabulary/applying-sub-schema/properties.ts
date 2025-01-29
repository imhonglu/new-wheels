import { hasOwn } from "@imhonglu/type-object";
import { is } from "../../utils/is.js";
import { resolveSubSchema } from "../../utils/resolve-sub-schema.js";
import { keywordHandler } from "../keyword-handler.js";

keywordHandler.register("properties", (schema, schemaContext) => {
  const properties = Object.keys(schema.properties).map((propertyName) => ({
    propertyName,
    subSchema: resolveSubSchema(schemaContext, "properties", propertyName),
  }));

  return (data, context) => {
    if (!is.object(data)) {
      return true;
    }

    for (const { propertyName, subSchema } of properties) {
      if (!hasOwn(data, propertyName)) {
        continue;
      }

      context.set(propertyName, true);

      if (!subSchema.validate(data[propertyName])) {
        return false;
      }
    }

    return true;
  };
});
