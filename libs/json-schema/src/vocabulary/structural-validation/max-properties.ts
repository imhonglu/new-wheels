import { is } from "../../utils/is.js";
import { keywordHandler } from "../keyword-handler.js";

keywordHandler.register(
	"maxProperties",
	(schema) => (data) =>
		is.object(data) ? schema.maxProperties >= Object.keys(data).length : true,
);
