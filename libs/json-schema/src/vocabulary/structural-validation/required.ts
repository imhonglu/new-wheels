import { is } from "../../utils/is.js";
import { keywordHandler } from "../keyword-handler.js";

keywordHandler.register(
	"required",
	(schema) => (data) =>
		is.object(data)
			? schema.required.every((key) => Object.hasOwn(data, key))
			: true,
);
