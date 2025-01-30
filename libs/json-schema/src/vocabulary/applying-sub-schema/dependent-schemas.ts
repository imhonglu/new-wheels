import { is } from "../../utils/is.js";
import { resolveSubSchema } from "../../utils/resolve-sub-schema.js";
import { keywordHandler } from "../keyword-handler.js";

keywordHandler.register("dependentSchemas", (schema, schemaContext) => {
  const dependentSchemas = Object.keys(schema.dependentSchemas).map(
    (propertyName) => ({
      propertyName,
      subSchema: resolveSubSchema(
        schemaContext,
        "dependentSchemas",
        propertyName,
      ),
    }),
  );

  return (data) => {
    if (!is.object(data)) {
      return true;
    }

    return dependentSchemas.every(({ propertyName, subSchema }) =>
      Object.hasOwn(data, propertyName) ? subSchema.validate(data) : true,
    );
  };
});
