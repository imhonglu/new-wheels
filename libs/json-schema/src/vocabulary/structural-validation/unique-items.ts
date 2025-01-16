import { is } from "../../utils/is.js";
import { keywordHandler } from "../keyword-handler.js";

keywordHandler.register("uniqueItems", (schema) => {
  const stringify = (item: unknown) =>
    is.nonNullableObject(item)
      ? JSON.stringify(Object.entries(item).sort())
      : item;

  return (data) =>
    schema.uniqueItems === true && is.array(data)
      ? new Set(data.map(stringify)).size === data.length
      : true;
});
