import { is } from "../../utils/is.js";
import { keywordHandler } from "../keyword-handler.js";

keywordHandler.register(
  "multipleOf",
  (schema) => (data) =>
    is.number(data) ? is.integer(Math.fround(data / schema.multipleOf)) : true,
);
