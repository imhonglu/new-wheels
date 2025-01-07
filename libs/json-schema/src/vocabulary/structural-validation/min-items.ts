import { is } from "../../utils/is.js";
import { keywordHandler } from "../keyword-handler.js";

keywordHandler.register(
	"minItems",
	(schema) => (data) =>
		is.array(data) ? schema.minItems <= data.length : true,
);
