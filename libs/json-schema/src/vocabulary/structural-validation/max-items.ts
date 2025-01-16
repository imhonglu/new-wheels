import { is } from "../../utils/is.js";
import { keywordHandler } from "../keyword-handler.js";

keywordHandler.register(
  "maxItems",
  (schema) => (data) =>
    is.array(data) ? schema.maxItems >= data.length : true,
);
