import { Schema } from "../../schema.js";
import { is } from "../../utils/is.js";
import { keywordHandler } from "../keyword-handler.js";

keywordHandler.register("items", (schema, context) => {
	const subSchema = Schema.from(schema.items, context);
	const startIndex = schema.prefixItems ? schema.prefixItems.length : 0;

	return (data) => {
		if (!is.array(data)) {
			return true;
		}

		for (let i = startIndex; i < data.length; i++) {
			if (!subSchema.validate(data[i])) {
				return false;
			}
		}

		return true;
	};
});
