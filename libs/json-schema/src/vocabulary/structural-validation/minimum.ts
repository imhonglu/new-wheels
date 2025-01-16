import { is } from "../../utils/is.js";
import { keywordHandler } from "../keyword-handler.js";

keywordHandler.register(
  "minimum",
  (schema) => (data) => (is.number(data) ? schema.minimum <= data : true),
);
