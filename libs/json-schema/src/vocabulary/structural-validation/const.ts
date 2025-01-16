import { is } from "../../utils/is.js";
import { keywordHandler } from "../keyword-handler.js";

keywordHandler.register("const", (schema) => {
  const replacer = is.object(schema.const)
    ? Object.keys(schema.const).sort()
    : undefined;

  const constant = JSON.stringify(schema.const, replacer);

  return (data) =>
    data !== undefined ? constant === JSON.stringify(data, replacer) : true;
});
