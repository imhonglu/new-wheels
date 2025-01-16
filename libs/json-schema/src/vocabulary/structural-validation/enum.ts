import { keywordHandler } from "../keyword-handler.js";

keywordHandler.register("enum", (schema) => {
  const enumerations: Set<unknown> = new Set(
    schema.enum.map((item) => JSON.stringify(item)),
  );

  return (data) =>
    data !== undefined ? enumerations.has(JSON.stringify(data)) : true;
});
