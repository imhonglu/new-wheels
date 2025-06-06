import { is } from "../../utils/is.js";
import { resolveSubSchema } from "../../utils/resolve-sub-schema.js";
import { keywordHandler } from "../keyword-handler.js";

keywordHandler.register("contains", (schema, schemaContext) => {
  const subSchema = resolveSubSchema(schemaContext, "contains");
  const maxContains = schema.maxContains ?? Number.POSITIVE_INFINITY;
  const minContains = schema.minContains ?? 1;

  return (data) => {
    if (!is.array(data)) {
      return true;
    }

    const items = data.filter((item) => subSchema.validate(item));

    return items.length >= minContains && items.length <= maxContains;
  };
});
