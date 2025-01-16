import { keys } from "@imhonglu/type-object";
import { is } from "../../utils/is.js";
import { keywordHandler } from "../keyword-handler.js";

keywordHandler.register("patternProperties", (schema, schemaContext) => {
  const patternProperties = Object.keys(schema.patternProperties).map(
    (propertyName) => ({
      pattern: new RegExp(propertyName),
      subSchema: schemaContext.resolveSubSchema(
        "patternProperties",
        propertyName,
      ),
    }),
  );

  return (data, context) => {
    if (!is.object(data)) {
      return true;
    }

    for (const propertyName of keys(data)) {
      for (const { pattern, subSchema } of patternProperties) {
        if (!pattern.test(propertyName)) {
          continue;
        }

        context.set(propertyName, true);

        if (!subSchema.validate(data[propertyName])) {
          return false;
        }
      }
    }

    return true;
  };
});
