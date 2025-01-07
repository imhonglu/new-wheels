import { is } from "../../utils/is.js";
import { keywordHandler } from "../keyword-handler.js";

keywordHandler.register("pattern", (schema) => {
	const pattern = new RegExp(schema.pattern);

	return (data) => (is.string(data) ? pattern.test(data) : true);
});
