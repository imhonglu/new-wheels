import { is } from "../../utils/is.js";
import { keywordHandler } from "../keyword-handler.js";

keywordHandler.register(
	"maximum",
	(schema) => (data) => (is.number(data) ? schema.maximum >= data : true),
);
