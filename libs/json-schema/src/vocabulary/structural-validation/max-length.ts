import { is } from "../../utils/is.js";
import { keywordHandler } from "../keyword-handler.js";

keywordHandler.register(
	"maxLength",
	(schema) => (data) =>
		is.string(data) ? schema.maxLength >= [...data].length : true,
);
