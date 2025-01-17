import { is } from "../../utils/is.js";
import { keywordHandler } from "../keyword-handler.js";

keywordHandler.register(
  "minProperties",
  (schema) => (data) =>
    is.object(data) ? schema.minProperties <= Object.keys(data).length : true,
);
