import { Schema } from "../../schema.js";
import { is } from "../../utils/is.js";
import { keywordHandler } from "../keyword-handler.js";

keywordHandler.register("prefixItems", (schema, context) => {
	const subSchemas = schema.prefixItems.map((item) =>
		Schema.from(item, context),
	);

	return (data) => {
		if (!is.array(data) || data.length < schema.prefixItems.length) {
			return true;
		}

		for (let i = 0; i < schema.prefixItems.length; i++) {
			if (!subSchemas[i].validate(data[i])) {
				return false;
			}
		}

		return true;
	};
});
