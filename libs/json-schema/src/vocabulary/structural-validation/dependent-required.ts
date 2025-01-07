import { is } from "../../utils/is.js";
import { keywordHandler } from "../keyword-handler.js";

keywordHandler.register(
	"dependentRequired",
	(schema) => (data) =>
		is.object(data)
			? Object.keys(data)
					.filter((key) => key in schema.dependentRequired)
					.every((key) =>
						schema.dependentRequired[key].every(
							(dependency) => dependency in data,
						),
					)
			: true,
);
