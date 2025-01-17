import { is } from "../../utils/is.js";
import { keywordHandler } from "../keyword-handler.js";

keywordHandler.register(
  "exclusiveMaximum",
  (schema) => (data) =>
    is.number(data) ? schema.exclusiveMaximum > data : true,
);
