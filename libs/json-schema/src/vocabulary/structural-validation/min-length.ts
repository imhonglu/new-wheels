import { is } from "../../utils/is.js";
import { keywordHandler } from "../keyword-handler.js";

keywordHandler.register(
  "minLength",
  (schema) => (data) =>
    is.string(data) ? schema.minLength <= [...data].length : true,
);
