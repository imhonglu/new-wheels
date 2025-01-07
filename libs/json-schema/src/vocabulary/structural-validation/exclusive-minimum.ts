import { is } from "../../utils/is.js";
import { keywordHandler } from "../keyword-handler.js";

keywordHandler.register(
	"exclusiveMinimum",
	(schema) => (data) =>
		is.number(data) ? schema.exclusiveMinimum < data : true,
);
